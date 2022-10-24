import { Resolver, Arg, Authorized, Mutation, Ctx, Query, Int } from 'type-graphql';

import updateInvestorSto from 'services/investorsto/update';
import { Context, JWT_ROLE } from 'core/context';
import { InvestorSto } from 'entities';
import { FindConditions } from 'typeorm';
import { InvestorUsufructuaryInput, InvestorBeneficialInput } from './investor-sto.types';

@Resolver()
class InvestorStoResolvers {
  @Authorized(JWT_ROLE.investor, JWT_ROLE.twoFA, JWT_ROLE.admin, JWT_ROLE.platformAdmin)
  @Query(() => InvestorSto, {
    description: 'Get investor sto information',
  })
  investorSto(
    @Ctx() { user }: Context,
    @Arg('stoID', () => Int, { nullable: true }) stoID: number,
    @Arg('investorID', () => Int, { nullable: true }) investorID: number,
  ): Promise<InvestorSto | undefined> {
    const findConditions: FindConditions<InvestorSto> = {};
    if (stoID) {
      findConditions.stoID = stoID;
    }
    if (investorID) {
      findConditions.investorID = investorID;
    }
    if (!stoID && !investorID) {
      findConditions.investorID = user.ID;
    }
    return InvestorSto.findOne(findConditions);
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for update usufructuary',
  })
  investorUsufructuaryUpdate(
    @Ctx() { user }: Context,
    @Arg('data', () => InvestorUsufructuaryInput) data: InvestorUsufructuaryInput,
  ): Promise<boolean> {
    return updateInvestorSto(user.ID, data);
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for update beneficial',
  })
  investorBeneficialUpdate(
    @Ctx() { user }: Context,
    @Arg('data', () => InvestorBeneficialInput) data: InvestorBeneficialInput,
  ): Promise<boolean> {
    return updateInvestorSto(user.ID, data);
  }
}

export default InvestorStoResolvers;
