import { Authorized, Ctx, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql';

import { Context, JWT_ROLE } from 'core/context';
import SumSubApi from 'services/externalKyc/sumSub/sum-sub-api';
import { Params } from 'entities';
import { PARAM } from 'core/envs';
import { BlockPassParam } from 'services/externalKyc/blockPass/block-pass-declarations';
import SumSubService from 'services/externalKyc/sumSub/SumSubService';
import NetkiService from 'services/externalKyc/netki/NetkiService';
import { NetkiParamJson } from 'services/externalKyc/netki/netki-declarations';
import { kycProvider } from 'core/feature-flags-checkers';
import BlockPassService from 'services/externalKyc/blockPass/BlockPassService';
import { KycData, NetkiSignUpData } from '../external-kyc.types';

const refetchByProvider = async (investorID: number): Promise<void> => {
  const provider = await kycProvider();
  if (provider.isInternal()) {
    // do nothing
  }
  if (provider.isBlockPass()) {
    const service = new BlockPassService();
    await service.updateKYC(investorID);
  }
  if (provider.isSumSub()) {
    const service = new SumSubService();
    await service.updateKYC(investorID.toString());
  }
  if (provider.isNetki()) {
    const service = new NetkiService();
    await service.refetchData(investorID);
  }
};

@Resolver()
class ExternalKycResolvers {
  @Subscription(() => KycData, {
    topics: 'KYC',
    description: `Get the user's KYC data`,
    filter: ({ payload, context }) => payload.ID === context.user.ID,
  })
  @Authorized(JWT_ROLE.investor)
  async rootKyc(@Root() data: KycData): Promise<KycData> {
    return data;
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => String, {
    description: 'Get sum sub login token',
  })
  async getSumSubInvestorToken(@Ctx() { user }: Context): Promise<string> {
    const service = new SumSubApi();
    return service.getInvestorTokenForApi(user.ID);
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: `This mutation triggers a refresh process for the logged in investor. It will re-fetch the data from SumSub servers.
Mainly used in order to manually fetch the investor status, in case the webhook never reaches the api, 
yet the UI element reports the user has been verified`,
  })
  async refreshInvestorData(@Ctx() { user }: Context): Promise<boolean> {
    await refetchByProvider(user.ID);
    return true;
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => String, {
    description: 'Get Block Pass Client ID',
  })
  async getBlockPassClientID(): Promise<string> {
    const { stringValue: jsonString } = await Params.getParamOrFail(PARAM.BLOCK_PASS_API_JSON);
    const json: BlockPassParam = JSON.parse(jsonString);
    return json.ClientId;
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => NetkiSignUpData, {
    description: '',
  })
  async getNetkiSignUpData(@Ctx() { user }: Context): Promise<NetkiSignUpData> {
    const { stringValue: jsonString } = await Params.getParamOrFail(PARAM.NETKI_PARAM_JSON);
    const json: NetkiParamJson = JSON.parse(jsonString);

    const netkiService = new NetkiService();
    await netkiService.fetchNewAccessCodes(json);
    const accessCode = await netkiService.getAvailableAccessCode(user.ID, json);
    return { accessCode, mobileAppPanel: json.mobileAppPanel };
  }
}

export default ExternalKycResolvers;
