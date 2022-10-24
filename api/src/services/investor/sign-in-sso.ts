import { ForbiddenError } from 'apollo-server-core';

import { Log, Params } from 'entities';
import { PARAM } from 'core/envs';
import { SignInSSOInput } from 'api/investor/investor.types';
import AuthSSO from './sso';

const signInSso = async (data: SignInSSOInput): Promise<string> => {
  const param = await Params.getParamOrFail(PARAM.SSO_MODE_ENABLED);
  if (!param.intValue) {
    throw new ForbiddenError('SSO is disabled');
  }

  const auth = new AuthSSO(data);
  await auth.checkInvestor();

  const token = auth.generateJWT();

  if (token) {
    await Log.createLog({
      stoID: 0,
      investorID: auth.investor.ID,
      activityType: 33,
    });
  }

  return token;
};

export default signInSso;
