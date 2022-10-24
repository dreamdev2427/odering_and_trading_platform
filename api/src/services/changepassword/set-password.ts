import { ValidationError } from 'apollo-server-core';

import { ChangePassword, Investor } from 'entities';
import Auth from 'services/investor/auth';

const setPassword = async (securelink: string, password: string): Promise<boolean> => {
  const reset = await ChangePassword.findOne({ securelink });
  if (!reset) {
    throw new ValidationError('Invalid link. Please check email');
  }

  const investor = await Investor.findOne(reset.userID);
  if (!investor) {
    throw new ValidationError('Invalid link. Please check email');
  }
  investor.password = Auth.getHash(password);
  await investor.save();
  const attempts = await ChangePassword.find({ userID: reset.userID });
  await ChangePassword.remove(attempts);
  return true;
};

export default setPassword;
