import { ValidationError } from 'apollo-server-core';

import { Investor, Stos, InvestorSto } from 'entities';
import { InvestorMarketSpaceInput } from 'api/market-space/market-space.types';
import { isSsoModeEnabled } from '../../core/feature-flags-checkers';

const matchReferrer = async (data: InvestorMarketSpaceInput, investor: Investor): Promise<void> => {
  if (data.referredBy || data.referredByID) {
    const referEmail = await Investor.findOne({ email: data.referredBy });
    const referID = await Investor.findOne({ ID: data.referredByID });
    investor.referByInvestorID = referEmail?.ID ?? referID?.ID ?? 0;
  }
};

const checkExistingInvestor = async (data: InvestorMarketSpaceInput): Promise<void> => {
  const investor = await Investor.findOne({ email: data.email });
  if (investor) {
    throw new ValidationError('The email address has already been used');
  }
};

const create = async (data: InvestorMarketSpaceInput): Promise<number> => {
  const sto = await Stos.findOne(data.stoID);
  if (!sto) {
    throw new ValidationError('Wrong sto ID');
  }

  if (!sto.parsedSettings().investorCategories.find((c) => c.value === data.investorType)) {
    throw new ValidationError('Wrong investor type');
  }

  await checkExistingInvestor(data);

  const investor = Investor.create(data);
  await matchReferrer(data, investor);

  const savedInvestor = await investor.save();

  const isSSOEnabled = await isSsoModeEnabled();
  const hasKyc = Object.keys(data.kyc).length > 0;
  const kyc: false | Partial<InvestorSto> = hasKyc && {
    applied: isSSOEnabled,
    isActive: 1,
    status: 7,
    ...(data.options?.autoAcceptKyc === true && {
      status: 1,
      isKYC: 1,
    }),
  };

  const investorSto = InvestorSto.create({
    investorID: savedInvestor.ID,
    stoID: data.stoID,
    updateDate: new Date().toISOString().substring(0, 10),
    ...kyc,
  });
  await investorSto.save();

  return savedInvestor.ID;
};

export default create;
