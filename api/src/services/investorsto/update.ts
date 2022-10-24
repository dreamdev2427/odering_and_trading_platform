import { ValidationError } from 'apollo-server-core';

import { InvestorSto } from 'entities';
import {
  InvestorBeneficialInput,
  InvestorUsufructuaryInput,
} from 'api/investor/investor-sto.types';
import { InvestorKycInput } from '../../api/admin/admin.types';

export const updateInvestorSto = async (
  investorID: number,
  data: InvestorUsufructuaryInput | InvestorBeneficialInput,
): Promise<boolean> => {
  const investorSto = await InvestorSto.findOne({ investorID, ID: data.ID });
  if (!investorSto) {
    throw new ValidationError('Access denied');
  }

  await InvestorSto.update(investorSto.ID, data);

  await investorSto.save();
  return true;
};

export const updateKycStatus = async (kycData: InvestorKycInput): Promise<void> => {
  const investorSto = await InvestorSto.findOneOrFail({ stoID: 0, investorID: kycData.investorID });
  await InvestorSto.update(investorSto.ID, {
    isKYC: +kycData.isKyc,
    status: kycData.status,
    applied: kycData.kycApplied,
    updateDate: new Date().toISOString().substring(0, 10),
  });
};

export default updateInvestorSto;
