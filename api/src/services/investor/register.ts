import { randomBytes } from 'crypto';
import { ValidationError } from 'apollo-server-core';
import { v4 as uuidv4 } from 'uuid';

import { Investor, Stos, Register, InvestorSto, InvestorBrokers, Broker } from 'entities';
import { FEE_TYPE } from 'entities/fees';
import { SignUpInput } from 'api/investor/investor.types';
import { SignUpMarketSpaceInput } from 'api/market-space/market-space.types';
import Email from 'services/email';
import { applyFee } from 'services/fee/apply-fee';
import {
  isMarketSpace,
  is2FAEnabledByDefault,
  isSsoModeEnabled,
} from 'core/feature-flags-checkers';
import Auth from './auth';

class RegisterService {
  sto: Stos;

  protected ignoreEmail = false;

  async checkDB({ email, stoID, investorType }: SignUpInput): Promise<void> {
    const sto = await Stos.findOne(stoID);
    if (!sto) {
      throw new ValidationError('Wrong sto number');
    }
    this.sto = sto;

    if (!this.sto.parsedSettings().investorCategories.find((c) => c.value === investorType)) {
      throw new ValidationError('Wrong investor type');
    }

    const investor = await Investor.findOne({ email });

    if (investor) {
      throw new ValidationError('The email address has already been used');
    }

    const register = await Register.findOne({ email });

    if (register) {
      await register.remove();
    }
  }

  async reserveID(register: Register): Promise<number> {
    let tempInvestor = Investor.create({
      email: register.email,
      password: register.password,
    });
    tempInvestor = await tempInvestor.save();
    register.ID = tempInvestor.ID;
    await tempInvestor.remove();
    return register.ID;
  }

  async insertRegister(data: SignUpInput): Promise<number> {
    data.password = Auth.getHash(data.password);
    data.secret = randomBytes(15).toString('hex');

    const mail = new Email(this.sto);
    if (!this.ignoreEmail) {
      await mail.verifyEmail(data, data.secret);
    }

    const register = Register.create(data);
    register.date = new Date();

    await this.reserveID(register);

    const newRegister = await register.save();

    return newRegister.ID;
  }

  async create(data: SignUpInput): Promise<number> {
    await this.checkDB(data);

    return this.insertRegister(data);
  }

  async createMS(data: SignUpMarketSpaceInput): Promise<number> {
    const investorID = await this.create(data);

    const investor = Investor.create(data);
    investor.ID = investorID;
    investor.town = data.city;
    investor.kyc = {};
    if (data.referredBy) {
      const refer = await Investor.findOne({ email: data.referredBy });
      if (refer) {
        investor.referByInvestorID = refer.ID;
      }
    }

    const savedInvestor = await investor.save();

    return savedInvestor.ID;
  }

  async verifyMS(secret: string): Promise<boolean> {
    const register = await Register.findOne({ secret });

    if (!register) {
      throw new ValidationError('The account does not found');
    }

    await register.remove();

    return true;
  }

  async verify(secret: string): Promise<number> {
    const register = await Register.findOne({ secret });

    if (!register) {
      throw new ValidationError('This verification code is wrong');
    }

    const isMS = await isMarketSpace();
    const isDefault2FAEnabled = await is2FAEnabledByDefault();
    let investorID;

    const isSSOEnabled = await isSsoModeEnabled();
    if (isMS) {
      const investor = await Investor.findOne({ email: register.email });

      if (!investor) {
        throw new ValidationError('The account does not exist anymore');
      }

      investorID = investor.ID;

      investor.isTwoFactorEnabled = isDefault2FAEnabled;
      await investor.save();

      const investorSto = InvestorSto.create({
        investorID: investor.ID,
        isKYC: 1, // marketspace doesn't care about KYC so this is a quick fix for missing investors on the project admin side
        status: 7,
        applied: isSSOEnabled,
        isActive: 1,
        stoID: register.stoID,
        updateDate: new Date().toISOString().substring(0, 10),
      });
      await investorSto.save();
      await register.remove();
    } else {
      const investor = Investor.create(register);
      investor.brokerID = uuidv4();
      investor.isTwoFactorEnabled = isDefault2FAEnabled;
      investor.kyc = {};
      const savedInvestor = await investor.save();
      investorID = savedInvestor.ID;
      const investorSto = InvestorSto.create({
        investorID: investor.ID,
        isKYC: 0,
        status: 7,
        applied: isSSOEnabled,
        isActive: 1,
        stoID: register.stoID,
        updateDate: new Date().toISOString().substring(0, 10),
      });
      await investorSto.save();

      if (register.brokerID) {
        let broker: Broker | Investor | undefined;
        broker = await Broker.findOne({ brokerID: register.brokerID });
        if (!broker) {
          broker = await Investor.findOne({ brokerID: register.brokerID });
        }
        if (broker) {
          const investorBrokers = InvestorBrokers.create({
            investorID: investor.ID,
            brokerID: register.brokerID,
          });
          await investorBrokers.save();
          await applyFee(FEE_TYPE.Registration, investor.ID, register.stoID, 0, 0);
        }
      }

      await register.remove();
    }
    return investorID;
  }
}

export default RegisterService;
