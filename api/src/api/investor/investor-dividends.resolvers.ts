import { Resolver, Query, Authorized, Ctx } from 'type-graphql';
import { Context } from 'core/context';
import { DividendInvestorPayouts } from 'entities';

@Resolver()
class InvestorDividendsResolvers {
  @Authorized()
  @Query(() => [DividendInvestorPayouts], {
    description: 'Get investor dividend payouts',
  })
  findInvestorDividendPayouts(@Ctx() { user }: Context): Promise<DividendInvestorPayouts[]> {
    return DividendInvestorPayouts.find({ investorID: user.ID });
  }
}

export default InvestorDividendsResolvers;
