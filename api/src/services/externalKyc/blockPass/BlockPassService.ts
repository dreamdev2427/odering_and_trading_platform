import { Investor, InvestorSto, Log, Stos } from 'entities';
import Email from '../../email';
import BlockPassApi from './block-pass-api';
import { BlockPassKycDataResponse } from './block-pass-declarations';
import { getInvestorData, getInvestorStoData } from './block-pass-investor';

const removeImages = (data: BlockPassKycDataResponse) =>{
  if (data.data.identities.selfie) {
    data.data.identities.selfie.value = '';
  }
  if (data.data.identities.national_id) {
    data.data.identities.national_id.value = '';
  }
  if (data.data.identities.driving_license) {
    data.data.identities.driving_license.value = '';
  }
  if (data.data.identities.passport) {
    data.data.identities.passport.value = '';
  }
  return data;
}

export default class BlockPassService {
  api = new BlockPassApi();

  async composeUpdateObject(
    data: BlockPassKycDataResponse,
    investorID: number,
    stoID: number,
  ): Promise<{
    updatedInvestor: Partial<Investor>;
    updatedInvestorSto: Partial<InvestorSto>;
  }> {
    data = removeImages(data);
    const updatedInvestor = getInvestorData(data);
    const updatedInvestorSto = getInvestorStoData(data);

    await Log.createLog({
      stoID,
      investorID,
      activityType: 35,
      description: `{
        BlockPassKycDataResponse: ${JSON.stringify(data)}
      }`,
    });

    return { updatedInvestor, updatedInvestorSto };
  }

  async updateKYC(blockPassInvestorID: number): Promise<void> {
    const stoID = 0;
    const dbInvestor = await Investor.findOneOrFail(blockPassInvestorID);
    const dbInvestorSto = await InvestorSto.findOneOrFail({ investorID: blockPassInvestorID, stoID });

    const data = await this.api.getInvestorData(blockPassInvestorID);
    const { updatedInvestor, updatedInvestorSto } = await this.composeUpdateObject(
      data,
      blockPassInvestorID,
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
  }
}
