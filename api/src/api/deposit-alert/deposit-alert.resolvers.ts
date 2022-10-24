import { Resolver, Query, Arg, Int, Authorized, Ctx, Mutation } from 'type-graphql';
import { Not } from 'typeorm';

import { InvestorDepositReceivedAlert as DepositAlert } from 'entities';
import { JWT_ROLE, Context } from 'core/context';
import createInvestorDepositAlert from 'services/depositalert/create';
import { InvestorDepositWithdrawAlertInput } from './deposit-alert.types';
@Resolver()
class DepositAlertResolvers {
  @Authorized(JWT_ROLE.investor)
  @Query(() => [DepositAlert], {
    description: 'Get investors deposit history',
  })
  investorDepositHistory(
    @Ctx() { user }: Context,
    @Arg('stoID', () => Int) stoID: number,
  ): Promise<DepositAlert[]> {
    return DepositAlert.find({
      where: {
        stoID,
        investorID: user.ID,
        isApproved: Not(5),
      },
      order: {
        ID: 'DESC',
      },
    });
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Create an investors deposit or withdraw alert',
  })
  investorDepositWithdrawAlert(
    @Ctx() { user }: Context,
    @Arg('data') data: InvestorDepositWithdrawAlertInput
  ): Promise<boolean> {
    return createInvestorDepositAlert(user.ID, data);
  }
}

export default DepositAlertResolvers;
