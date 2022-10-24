import { NonKycInvestor } from 'api/admin/admin.types';
import { InvestorSto } from 'entities';
import { FindConditions } from 'typeorm';

const convertToObject = async (unfinishedKyc: InvestorSto[]): Promise<NonKycInvestor[]> => {
  const result: NonKycInvestor[] = [];
  await Promise.all(
    unfinishedKyc.map(async (u) => {
      const investor = await u.investor;
      const temp: NonKycInvestor = {
        ...investor,
        ...u,
        ID: investor?.ID,
      };
      result.push(temp);
    }),
  );
  return result;
};

export const getNonKycInvestors = async (
  stoID: number,
  name?: string,
): Promise<NonKycInvestor[]> => {
  const query: FindConditions<InvestorSto> = {
    isKYC: +false,
    stoID,
  };
  const firstNameQuery: FindConditions<InvestorSto> = {};
  const lastNameQuery: FindConditions<InvestorSto> = {};
  if (name && name !== '') {
    firstNameQuery.investor = { firstName: name };
    lastNameQuery.investor = { lastName: name };
  }

  const unfinishedKyc = await InvestorSto.find({
    relations: ['investor'],
    where: [
      {
        ...query,
        ...firstNameQuery,
      },
      {
        ...query,
        ...lastNameQuery,
      },
    ],
    order: {
      updateDate: 'ASC',
    },
  });
  return convertToObject(unfinishedKyc);
};
