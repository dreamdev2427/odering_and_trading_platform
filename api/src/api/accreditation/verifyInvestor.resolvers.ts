import { Resolver, Query } from 'type-graphql';
import { Params } from 'entities';
import { PARAM } from 'core/envs';

@Resolver()
class VerifyInvestorResolvers {
  @Query(() => String, {
    description: 'Get the verifyInvestorCom url set in the database',
  })
  async getVerifyInvestorUrl(): Promise<string> {
    const verifyInvestorComUrl = await Params.getParam(PARAM.VERIFY_INVESTOR_COM_URL);
    if (!verifyInvestorComUrl?.stringValue) {
      throw new Error(
        'Missing verifyInvestorComUrl - Error occurred in VerifiyInvestorCom.resolvers getVerifyInvestorUrl',
      );
    }
    const json = JSON.parse(verifyInvestorComUrl.stringValue);
    return json.frontendURL;
  }
}

export default VerifyInvestorResolvers;
