import { Investor, InvestorSto, Params, Stos } from 'entities';
import NetkiAccessCode from 'entities/netki-access-codes';
import Email from 'services/email';
import { PARAM } from 'core/envs';
import { In, IsNull, Not } from 'typeorm';
import { ValidationError } from 'apollo-server-core';
import { NetkiParamJson, TransactionDetails } from './netki-declarations';
import { getInvestorData, getInvestorStoData } from './netki-investor';
import { NetkiApi } from './netki-api';

export default class NetkiService {
  private static async getNetkiInvestorData(accessCode: string): Promise<TransactionDetails> {
    const { stringValue: jsonString } = await Params.getParamOrFail(PARAM.NETKI_PARAM_JSON);
    const json: NetkiParamJson = JSON.parse(jsonString);
    const netkiApi = await NetkiApi.build(json);
    return netkiApi.getInvestorData(accessCode);
  }

  private async updateChildCodes(childFullAccessCodes: string[]): Promise<void> {
    const dbAccessCodes = await NetkiAccessCode.find({
      where: {
        accessCode: In(childFullAccessCodes),
      },
    });
    for (const parent of dbAccessCodes) {
      if (parent.childAccessCode) {
        const kid = dbAccessCodes.find((a) => a.accessCode === parent.childAccessCode);
        if (kid) {
          await NetkiAccessCode.upsert(
            {
              accessCode: kid.accessCode,
              investorID: parent.investorID,
            },
            {
              conflictPaths: ['accessCode'],
            },
          );
        }
      }
    }
  }

  private static async GetAccessCodeEntity(accessCode: string): Promise<NetkiAccessCode> {
    const dbAccessCodeEntity = await NetkiAccessCode.findOneOrFail({
      where: {
        accessCode,
        investorID: Not(IsNull()),
      },
    });
    if (!dbAccessCodeEntity.investorID) {
      throw new ValidationError(`No code with the ID: ${accessCode}`);
    }
    return dbAccessCodeEntity;
  }

  private static async SendEmail(stoID: number, investor: Investor, investorSto: InvestorSto) {
    const sto = await Stos.findOneOrFail(stoID);
    const mail = new Email(sto);
    await mail.enableDisableInvestorAccount(investor, investorSto.isActive === 1);
  }

  async refetchData(investorID: number, tryWithLatestParent = false): Promise<void> {
    const dbAccessCodeEntity = await NetkiAccessCode.findOneOrFail({
      where: {
        investorID,
        childAccessCode: null,
      },
    });
    // handles the case in which the process was restarted by netki and we were not notified of it yet
    if (tryWithLatestParent) {
      const { accessCode } = await NetkiAccessCode.findOneOrFail({
        where: {
          investorID,
          childAccessCode: dbAccessCodeEntity.accessCode,
        },
      });
      await this.updateKYC(accessCode, true);
    }
    await this.updateKYC(dbAccessCodeEntity.accessCode);
  }

  async updateKYC(accessCode: string, isReAttempt = false): Promise<void> {
    const stoID = 0;
    const dbAccessCodeEntity = await NetkiService.GetAccessCodeEntity(accessCode);
    const dbInvestor = await Investor.findOneOrFail({ ID: dbAccessCodeEntity.investorID });
    const dbInvestorSto = await InvestorSto.findOneOrFail({ investorID: dbInvestor.ID, stoID });
    const netkiInvestorData = await NetkiService.getNetkiInvestorData(accessCode);
    if (netkiInvestorData.count === 0) {
      if (!isReAttempt) {
        await this.refetchData(dbInvestor.ID, true);
      }
      return;
    }

    const updatedInvestor = getInvestorData(netkiInvestorData);
    const updatedInvestorSto = getInvestorStoData(netkiInvestorData);

    Investor.merge(dbInvestor, updatedInvestor);
    await dbInvestor.save();

    if (dbInvestorSto.isActive !== updatedInvestorSto.isActive) {
      await NetkiService.SendEmail(stoID, dbInvestor, dbInvestorSto);
    }

    InvestorSto.merge(dbInvestorSto, updatedInvestorSto);
    await dbInvestorSto.save();
  }

  async getAvailableAccessCode(investorID: number, netkiParam: NetkiParamJson): Promise<string> {
    const investor = await Investor.findOneOrFail({ ID: investorID });
    const accessCode = await NetkiAccessCode.findOneOrFail({
      where: [
        {
          investorID,
          childAccessCode: null,
        },
        {
          childAccessCode: null,
          investorID: null,
        },
      ],
    });

    // send an email to the investor
    if (netkiParam.sendEmail && !accessCode.investorID) {
      const sto = await Stos.findOneOrFail({ ID: 0 });
      const mail = new Email(sto);
      await mail.sendNetkiSignUpEmail(investor, netkiParam);
    }

    // reserve this access code to the investor
    accessCode.investorID = investorID;
    await accessCode.save();

    return accessCode.accessCode;
  }

  async fetchNewAccessCodes(netkiParam: NetkiParamJson): Promise<void> {
    const apiService = await NetkiApi.build(netkiParam);
    const accessCodesResponse = await apiService.getAccessCodes();
    const childFullAccessCodes: string[] = [];
    await Promise.all(
      accessCodesResponse.results.map(async (a) => {
        const childAccessCode = a.child_codes?.find((n) => n.is_active)?.code;
        if (childAccessCode) {
          childFullAccessCodes.push(a.code);
          childFullAccessCodes.push(childAccessCode);
        }
        await NetkiAccessCode.upsert(
          {
            accessCode: a.code,
            childAccessCode,
          },
          {
            conflictPaths: ['accessCode'],
          },
        );
      }),
    );

    if (childFullAccessCodes.length > 0) {
      await this.updateChildCodes(childFullAccessCodes);
    }
  }
}
