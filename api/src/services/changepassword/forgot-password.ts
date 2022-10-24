import { randomBytes } from 'crypto';
import { ValidationError } from 'apollo-server-core';
import { LessThan } from 'typeorm';

import { Investor, Stos, ChangePassword } from 'entities';
import { isMarketSpace } from 'core/feature-flags-checkers';
import Email from 'services/email/index';

class ForgotPassword {
  sto: Stos;

  investor: Investor;

  today: string = new Date().toISOString().substring(0, 10);

  async fetchData(email: string, stoID: number): Promise<void> {
    const investor = await Investor.findOne({ email });
    const sto = await Stos.findOne(stoID);

    if (!investor || !sto) {
      throw new ValidationError('Invalid email address');
    }

    this.investor = investor;
    this.sto = sto;
  }

  async checkCount(): Promise<void> {
    const count = await ChangePassword.count({
      where: {
        date: this.today,
        userID: this.investor.ID,
      },
    });
    if (count >= 10) {
      throw new ValidationError('You already requested password 10 times today');
    }
  }

  async create(): Promise<void> {
    const securelink = randomBytes(30).toString('hex');
    const securecode = randomBytes(5).toString('hex');

    const change = ChangePassword.create({
      userID: this.investor.ID,
      date: this.today,
      securelink,
      securecode,
    });

    await change.save();

    const mail = new Email(this.sto);
    const isMS = await isMarketSpace();
    if (isMS) {
      await mail.marketSpacePasswordReset(this.investor, securelink);
    } else {
      await mail.resetEmail(this.investor, securelink);
    }
  }

  async removePrevious(): Promise<void> {
    const attempts = await ChangePassword.find({
      where: {
        date: LessThan(this.today),
        userID: this.investor.ID,
      },
    });
    await ChangePassword.remove(attempts);
  }

  async reset(email: string, stoID: number): Promise<boolean> {
    await this.fetchData(email, stoID);
    await this.removePrevious();
    await this.checkCount();
    await this.create();

    return true;
  }
}

export default ForgotPassword;
