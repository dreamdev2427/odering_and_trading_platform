import { ValidationError } from 'apollo-server-core';

import { Investor } from 'entities';
import { Context, JWT_ROLE } from 'core/context';
import Auth from './auth';

const twoFactorVerify = async (user: Context['user'], code: number): Promise<string> => {

  const investor = await Investor.findOneOrFail(user.ID, { select: ['twoFactorCode'] });

  if (code !== investor.twoFactorCode) {
    throw new ValidationError('Wrong 2FA code');
  }

  return Auth.getToken(user.ID, user.stoID, JWT_ROLE.investor);
};

export default twoFactorVerify;
