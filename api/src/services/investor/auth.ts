import { createHash } from 'crypto';
import { AuthenticationError, ValidationError } from 'apollo-server-core';
import jwt from 'jws';

import { Investor, InvestorSto, Stos } from 'entities';
import { JWT_ROLE } from 'core/context';
import Email from 'services/email';
import { isMarketSpace } from 'core/feature-flags-checkers';

const invalid = new AuthenticationError('Invalid username or password');

class Auth {
  static getHash(str: string): string {
    return createHash('sha256')
      .update(process.env.PASSWORD_SALT + str)
      .digest('hex');
  }

  static getToken(ID: number, stoID: number, role: JWT_ROLE): string {
    if (!process.env.PRIVATE_JWT_KEY) {
      throw new Error('set PRIVATE_JWT_KEY in .env file');
    }
    const payload = { ID, stoID, role };
    return jwt.sign({
      header: { alg: 'HS256' },
      payload,
      secret: process.env.PRIVATE_JWT_KEY,
    });
  }

  email: string;

  password: string;

  hash: string;

  stoID: number;

  investor: Investor;

  sto: Stos;

  investorSTO: InvestorSto;

  constructor(email: string, password: string, stoID: number) {
    this.email = email;
    this.password = password;
    this.hash = Auth.getHash(password);
    this.stoID = stoID;

    this.checkFields();
  }

  async getInvestor(): Promise<void> {
    const investor = await Investor.findOne({ email: this.email });
    const sto = await Stos.findOne(this.stoID);

    if (!investor || !sto) {
      throw invalid;
    }

    const investorSTO = await InvestorSto.findOne({ investorID: investor.ID, stoID: this.stoID });

    if (!investorSTO) {
      throw invalid;
    }

    this.sto = sto;
    this.investor = investor;
    this.investorSTO = investorSTO;
  }

  checkFields(): void {
    if (this.email.length > 70 || this.password.length > 100) {
      throw new ValidationError('Email or Password is greater than the maximum allowed');
    }
  }

  validatePassword(): void {
    if (this.hash !== this.investor.password && this.password !== this.investor.password) {
      throw invalid;
    }
  }

  validateInvestor(): void {
    this.validatePassword();
    if (this.isBlocked()) {
      throw new ValidationError('Account blocked. Please contact admin');
    }
  }

  async generateJWT(): Promise<string> {
    const role = this.investor.isTwoFactorEnabled ? JWT_ROLE.twoFA : JWT_ROLE.investor;
    if (this.investor.isTwoFactorEnabled) {
      this.investor.twoFactorCode = Math.floor(100000 + Math.random() * 900000);
      await this.investor.save();

      const mail = new Email(this.sto);
      await mail.send2FAEmail(this.investor);
    }
    return Auth.getToken(this.investor.ID, this.stoID, role);
  }

  isBlocked(): boolean {
    return this.investorSTO.isActive === 0;
  }

  async firstLoginWelcome(): Promise<void> {
    const mail = new Email(this.sto);
    const userFullName = `${this.investor.firstName} ${this.investor.lastName}`;
    await mail.newUserSignUpEmailForAdmin(this.investor);
    const isMS = await isMarketSpace();
    if (isMS) {
      await mail.marketSpaceNewUserSignUpEmailForUser(
        this.investor.firstName,
        `https://marketspacecapital.as.me/schedule.php`,
        this.investor.email,
      );
    } else {
      await mail.newUserSignUpEmailForUser(userFullName, this.investor.email);
    }
  }
}

export default Auth;
