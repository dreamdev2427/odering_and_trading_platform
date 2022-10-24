import { Investor, InvestorSto } from 'entities';

export const deleteInvestorStos = async (investorID: number, stoID: number): Promise<void> => {
  if (stoID === 0) {
    await InvestorSto.delete({ investorID });
    await Investor.delete({ ID: investorID });
  } else {
    await InvestorSto.delete({ investorID, stoID });
  }
};

export default deleteInvestorStos;
