import { Resolver, Query, Arg, Int, Authorized, Ctx } from 'type-graphql';

import { InvestorBalancesInCompanyAccounts as InvestorBalances } from 'entities';
import { Context, JWT_ROLE } from 'core/context';
import { FindConditions } from 'typeorm';
import { getPortfolioValue } from 'services/portfolio/getPortfolioValue';
import { internalWalletMode } from 'core/feature-flags-checkers';

@Resolver()
class InvestorBalancesResolvers {
  @Authorized(JWT_ROLE.investor)
  @Query(() => InvestorBalances, {
    description: 'Get an investors balance',
    nullable: true,
  })
  investorBalance(
    @Ctx() { user }: Context,
    @Arg('ID', () => Int, { nullable: true }) ID?: number,
    @Arg('currencyID', () => Int, { nullable: true }) currencyID?: number,
    @Arg('stoID', () => Int, { nullable: true }) stoID?: number,
  ): Promise<InvestorBalances | undefined> {
    const where: FindConditions<InvestorBalances> = { investorID: user.ID };
    if (ID) {
      where.ID = ID;
    }
    if (currencyID) {
      where.currencyID = currencyID;
    }
    if (stoID) {
      where.stoID = stoID;
    }

    return InvestorBalances.findOne(where);
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => [InvestorBalances], {
    description: `Get all investors balances at sto.
      Note: if Internal Wallet Mode is set to global, this endpoint will always return values for sto 0`,
  })
  async investorBalances(
    @Ctx() { user }: Context,
    @Arg('stoID', () => Int) stoID: number,
  ): Promise<InvestorBalances[]> {
    const modes = await internalWalletMode();
    if (modes.isStoSpecific()) {
      return InvestorBalances.find({ investorID: user.ID, stoID });
    }
    if (modes.isGlobal()) {
      return InvestorBalances.find({ investorID: user.ID, stoID: 0 });
    }
    return [];
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => Number, {
    description: `Get the investor's portfolio value`,
  })
  async portfolioValue(
    @Ctx() { user }: Context,
    @Arg('stoID', () => Int) stoID: number,
  ): Promise<number> {
    return getPortfolioValue(user.ID, stoID);
  }
}

export default InvestorBalancesResolvers;
