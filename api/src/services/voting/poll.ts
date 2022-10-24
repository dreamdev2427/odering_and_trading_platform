import { Int, Field, ObjectType } from 'type-graphql';
import { getManager } from 'typeorm';

import { InvestorSto, VotingUser } from 'entities';

@ObjectType()
export class Poll {
  @Field(() => Int)
  notVoted: number;

  @Field(() => Int)
  totalInvestors: number;

  @Field(() => Int)
  totalShares: number;

  @Field(() => Int)
  totalInvestment: number;
}

const getTotalShares = async (stoID: number): Promise<{ totalShares: number; totalInvestment: number }> => {
  const [result] = await getManager().query(`
      SELECT SUM(s.shares) AS shares, SUM(t.nominalValue * s.shares) as investment FROM shares s, sharetypes t where s.shareTypeID = t.id and stoID = ? and t.isVotingRightsApplicable = 1;
    `, [stoID]);
  return {
    totalShares: result.shares,
    totalInvestment: result.investment,
  };
};


const getExpectedShares = async (stoID: number): Promise<{ expectedShares: number; expectedInvestment: number }> => {
  const [result] = await getManager().query(`
    SELECT SUM(expectedShares) AS expectedShares,
    SUM(expectedInvestment) AS expectedInvestment FROM investorSto where t.stoid = ? and t.isKYC = 1
  `, [stoID]);

  return {
    expectedShares: result.expectedShares,
    expectedInvestment: result.expectedInvestment,
  };
};

export const poll = async (votingID: number, stoID: number): Promise<Poll> => {
  const voted = await VotingUser.count({ votingID });
  const totalInvestors = await InvestorSto.count({ stoID, isKYC: 1 });
  const { totalShares, totalInvestment } = await getTotalShares(stoID);
  const { expectedShares, expectedInvestment } = await getExpectedShares(stoID);
  const shares = (totalShares || 0) + (expectedShares || 0);
  const investment = (totalInvestment || 0) + (expectedInvestment || 0);

  return {
    notVoted: totalInvestors - voted,
    totalInvestors,
    totalShares: shares,
    totalInvestment: investment,
  };
};