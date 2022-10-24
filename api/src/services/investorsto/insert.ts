import { ValidationError } from 'apollo-server-core';
import { InvestorSto } from 'entities';
import { In } from 'typeorm';

export const copyInvestorStos = async (
  investorIDs: number[],
  copyStoID: number,
  pasteStoID: number,
): Promise<void> => {
  const existingInvestors = await InvestorSto.find({
    investorID: In(investorIDs),
    stoID: pasteStoID,
  });

  const existingInvestorsIDs = existingInvestors.map((i) => {
    return i.investorID;
  });
  const uniqueIDs = investorIDs.filter((i) => {
    return !existingInvestorsIDs.includes(i);
  });
  const investors = await InvestorSto.find({
    investorID: In(uniqueIDs),
    stoID: copyStoID,
  });

  if (investors.length === 0) {
    throw new ValidationError('api-no-investors-found-in-this-sto');
  }

  const investorCopies: Partial<InvestorSto>[] = investors.map((investor) => {
    return {
      ...investor,
      ID: undefined,
      stoID: pasteStoID,
    };
  });

  await InvestorSto.insert(investorCopies);
};

export default copyInvestorStos;
