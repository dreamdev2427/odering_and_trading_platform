import { Resolver, Arg, Mutation, UseMiddleware, Authorized, Int, Ctx } from 'type-graphql';

import { MarketSpaceMiddleware } from 'core/feature-flags-checkers';
import Register from 'services/investor/register';
import create from 'services/investor/create';
import { Context, JWT_ROLE } from 'core/context';
import InvestorBuy from 'services/buyalert/buy';
import {
  SignUpMarketSpaceInput,
  InvestorBuyAlertMSInput,
  InvestorMarketSpaceInput,
} from './market-space.types';

@Resolver()
class MarketSpaceResolvers {
  @Mutation(() => Int, { description: 'Mutation for sign up investor for market space' })
  @UseMiddleware(MarketSpaceMiddleware)
  async signUpMarketSpace(@Arg('data') data: SignUpMarketSpaceInput): Promise<number> {
    const register = new Register();
    return register.createMS(data);
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Int, {
    description: 'Create an investors buy alert for market space',
  })
  @UseMiddleware(MarketSpaceMiddleware)
  investorBuyAlertMarketSpace(
    @Ctx() { user }: Context,
    @Arg('data') data: InvestorBuyAlertMSInput,
  ): Promise<number> {
    const buy = new InvestorBuy(user.ID);
    return buy.insert(data);
  }

  @Authorized(JWT_ROLE.api)
  @Mutation(() => Int, { description: 'Mutation for creation an investor for market space' })
  @UseMiddleware(MarketSpaceMiddleware)
  createInvestorMarketSpace(@Arg('data') data: InvestorMarketSpaceInput): Promise<number> {
    return create(data);
  }
}

export default MarketSpaceResolvers;
