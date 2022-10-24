import { RequestHandler } from 'express';
import { validate } from 'class-validator';

import { JWT_ROLE, User } from 'core/context';
import { SignInSSOInput } from 'api/investor/investor.types';
import signInSso from 'services/investor/sign-in-sso';

const ssoPost: RequestHandler<any, any, SignInSSOInput> = async (req, res) => {
  if ((req.user as User)?.role !== JWT_ROLE.api) {
    return res.sendStatus(403);
  }

  const data = new SignInSSOInput();
  Object.assign(data, req.body);

  const errors = await validate(data);
  if (errors.length) {
    return res.status(400).json({ message: 'Invalid parameters' });
  }

  try {
    const token = await signInSso(data);
    res.json({ token });
  } catch (e) {
    res.sendStatus(403);
  }
};

export default ssoPost;
