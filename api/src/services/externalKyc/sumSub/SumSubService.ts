import { Investor, InvestorSto, Log, Stos } from 'entities';
import Email from '../../email';
import { SumSubResponse } from './sum-sub-declarations';
import { getInvestorData, getInvestorStoData } from './sum-sub-investor';
import SumSubApi from './sum-sub-api';

export default class SumSubService {
  api = new SumSubApi();

  async composeUpdateObject(
    data: SumSubResponse,
    investorID: number,
    stoID: number,
  ): Promise<{
    updatedInvestor: Partial<Investor>;
    updatedInvestorSto: Partial<InvestorSto>;
  }> {
    const updatedInvestor = getInvestorData(data);
    const updatedInvestorSto = getInvestorStoData(data);

    await Log.createLog({
      stoID,
      investorID,
      activityType: 33,
      description: `{
        SumSubKycDataResponse: ${JSON.stringify(data)}
      }`,
    });

    return { updatedInvestor, updatedInvestorSto };
  }

  async updateKYC(sumSubUserId: string): Promise<void> {
    try {
      const investorID = parseInt(sumSubUserId, 10);
      const stoID = 0;

      const dbInvestor = await Investor.findOneOrFail(investorID);
      const dbInvestorSto = await InvestorSto.findOneOrFail({ investorID, stoID });

      const data = await this.api.getInvestorData(sumSubUserId);
      const { updatedInvestor, updatedInvestorSto } = await this.composeUpdateObject(
        data,
        investorID,
        stoID,
      );

      Investor.merge(dbInvestor, updatedInvestor);
      await dbInvestor.save();

      const accountStatusChanged = dbInvestorSto.isActive !== updatedInvestorSto.isActive;
      InvestorSto.merge(dbInvestorSto, updatedInvestorSto);
      await dbInvestorSto.save();

      // sending account status email
      if (accountStatusChanged) {
        const sto = await Stos.findOneOrFail(stoID);
        const mail = new Email(sto);
        await mail.enableDisableInvestorAccount(dbInvestor, dbInvestorSto.isActive === 1);
      }
    } catch (error) {
      console.error(
        `${error} - Error occurred in updateKYCDataFromSumSub while trying to parse response body`,
      );
    }
  }
}
