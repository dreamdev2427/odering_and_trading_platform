import { randomBytes } from 'crypto';

import { SignInSSOInput } from 'api/investor/investor.types';
import { JWT_ROLE } from 'core/context';
import { Investor, InvestorSto, Stos } from 'entities';
import Email from 'services/email';
import Auth from './auth';

class AuthSSO {
  private email: string;

  private firstName: string;

  private lastName: string;

  investor: Investor;

  sto: Stos;

  constructor(data: SignInSSOInput) {
    Object.assign(this, data);
  }

  // Check investor
  async checkInvestor(): Promise<void> {
    const investor = await Investor.findOne({ email: this.email });
    const sto = await Stos.findOneOrFail(0);
    this.sto = sto;

    if (investor) {
      this.investor = investor;
      return;
    }

    const secret = randomBytes(15).toString('hex');
    const password = Auth.getHash(secret);

    const newInvestor = Investor.create({
      email: this.email,
      password,
      firstName: this.firstName,
      lastName: this.lastName,
      kyc: {},
      isTwoFactorEnabled: false,
    });
    await newInvestor.save();

    const investorSto = InvestorSto.create({
      investorID: newInvestor.ID,
      stoID: 0,
      updateDate: new Date().toISOString().substring(0, 10),
    });
    await investorSto.save();

    this.investor = newInvestor;
  }

  getRole(): JWT_ROLE {
    if (this.investor.isTwoFactorEnabled) {
      this.sendSSoEmail();
      return JWT_ROLE.twoFA;
    }
    return JWT_ROLE.investor;
  }

  generateJWT(): string {
    return Auth.getToken(this.investor.ID, this.sto.ID, this.getRole());
  }

  async sendSSoEmail(): Promise<void> {
    this.investor.twoFactorCode = Math.floor(100000 + Math.random() * 900000);
    await this.investor.save();

    const mail = new Email(this.sto);
    await mail.send2FAEmail(this.investor);
  }
}

export default AuthSSO;
