import { Resolver, Query, Authorized, Ctx, Mutation, Arg } from 'type-graphql';
import { IsNull } from 'typeorm';
import { ValidationError } from 'apollo-server-core';
import { GraphQLJSON } from 'graphql-scalars';

import Email from 'services/email';
import updateProfile from 'services/investor/update-profile';
import { Investor, InvestorSto, KycPages, Stos } from 'entities';
import { JWT_ROLE, Context } from 'core/context';
import { InvestorCompanyProfileInput, InvestorProfileInput } from './kyc.types';

@Resolver()
class BuyAlertResolvers {
  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for update investor profile',
  })
  async investorProfile(
    @Ctx() { user }: Context,
    @Arg('data') data: InvestorProfileInput,
  ): Promise<boolean> {
    const investor = await Investor.findOne(user.ID);
    if (!investor) {
      return false;
    }

    if (investor.investorType === 1) {
      throw new ValidationError('Use the investorCompanyProfile mutation');
    }

    return updateProfile(investor, user.stoID, data);
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for update investor company profile',
  })
  async investorCompanyProfile(
    @Ctx() { user }: Context,
    @Arg('data') data: InvestorCompanyProfileInput,
  ): Promise<boolean> {
    const investor = await Investor.findOne(user.ID);
    if (!investor) {
      return false;
    }

    if (investor.investorType === 0) {
      throw new ValidationError('Use investorProfile mutation');
    }

    return updateProfile(investor, user.stoID, data);
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => GraphQLJSON, {
    description: 'Get investor kyc information',
  })
  async investorKyc(@Ctx() { user }: Context): Promise<Record<string, unknown>> {
    const investor = await Investor.findOne(user.ID);
    return investor?.kyc || {};
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for update investor kyc profile',
  })
  async fillKyc(
    @Ctx() { user }: Context,
    @Arg('data', () => GraphQLJSON) data: Record<string, string>,
  ): Promise<boolean> {
    const investor = await Investor.findOne(user.ID);
    if (!investor) {
      return false;
    }
    investor.kyc = { ...(investor.kyc || {}), ...data };
    await investor.save();

    return true;
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for apply investor kyc profile',
  })
  async applyKyc(
    @Ctx() { user }: Context,
    @Arg('applied', () => Boolean) applied: boolean,
  ): Promise<boolean> {
    const investor = await Investor.findOne(user.ID);
    const investorSto = await InvestorSto.findOne({ investorID: user.ID, stoID: user.stoID });
    const sto = await Stos.findOne(user.stoID);
    if (!investorSto || !sto || !investor) {
      return false;
    }
    await InvestorSto.update(investorSto.ID, { applied });

    const mail = new Email(sto);
    await mail.notifyNewSubmission(investor);
    return true;
  }

  @Authorized()
  @Query(() => [KycPages], {
    description: 'Get Kyc structure',
  })
  kyc(): Promise<KycPages[]> {
    return KycPages.find({ pageID: IsNull() });
  }
}

export default BuyAlertResolvers;
