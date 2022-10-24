import { ValidationError } from 'apollo-server-core';
import { validateOrReject } from 'class-validator';

import Auth from 'services/investor/auth';
import { Investor } from 'entities';
import { ChangePasswordInput } from 'api/investor/investor.types';

const changePassword = async (investorID: number, data: ChangePasswordInput): Promise<boolean> => {
  const hashed = {
    oldPassword: Auth.getHash(data.oldPassword),
    newPassword: Auth.getHash(data.newPassword),
  };

  await validateOrReject(data);

  if (data.newPassword !== data.repeatPassword) {
    throw new ValidationError('Password and repeat do not match');
  }

  const investor = await Investor.findOne(investorID);

  if (investor?.password !== hashed.oldPassword) {
    throw new ValidationError('Old password is not correct');
  }

  investor.password = hashed.newPassword;
  await investor.save();

  return true;
};

export default changePassword;
