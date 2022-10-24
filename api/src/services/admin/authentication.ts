import { createHash } from 'crypto';
import { AuthenticationError, ValidationError } from 'apollo-server-core';
import jwt from 'jws';
import { FindConditions } from 'typeorm';

import { JWT_ROLE } from 'core/context';
import { User } from 'entities';

const invalid = new AuthenticationError('Invalid username or password or stoID');

class Auth {
  username: string;

  password: string;

  hash: string;

  stoID?: number;

  user: User;

  platform: boolean;

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

  constructor(username: string, password: string, platform: boolean, stoID?: number) {
    this.username = username;
    this.password = password;
    this.platform = platform;
    this.hash = Auth.getHash(password);
    this.stoID = stoID;

    this.checkFields();
  }

  async getUser(): Promise<void> {
    const criteria: FindConditions<User> = {
      username: this.username,
      password: this.hash,
      isPlatformAdminLogin: this.platform,
    };
    // if ( && this?.stoID) {
    //   throw new AuthenticationError('Provide stoID argument');
    // }
    if (!this.platform) {
      criteria.stoID = this.stoID;
    }

    // console.log(criteria);

    const user = await User.findOne(criteria);

    if (!user) {
      throw invalid;
    }
    this.user = user;
    // this.investorSTO = await fetchInvestorStoByInvestorId(this.investor.ID, this.stoID);
    //
    // if (!this.investorSTO) {
    //     throw invalid;
    // }
  }

  checkFields(): void {
    if (this.username.length > 70 || this.password.length > 30) {
      throw new ValidationError('Something gone wrong');
    }
  }

  validateUser(): void {
    if (!this.user.isActive) {
      throw new ValidationError('Account blocked. Please contact admin');
    }
  }

  generateJWT(): string {
    return Auth.getToken(
      this.user.ID,
      this.user.stoID ?? 0,
      this.user.isPlatformAdminLogin ? JWT_ROLE.platformAdmin : JWT_ROLE.admin,
    );
  }
}

export default Auth;
