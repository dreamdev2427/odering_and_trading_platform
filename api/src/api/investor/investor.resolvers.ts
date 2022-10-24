import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';

import { Investor, InvestorSto, Log, Register, Stos } from 'entities';
import { Context, JWT_ROLE } from 'core/context';
import Auth from 'services/investor/auth';
import RegisterSvc from 'services/investor/register';
import changePassword from 'services/investor/change-password';
import ForgotPassword from 'services/changepassword/forgot-password';
import twoFactorVerify from 'services/investor/two-factor-verify';
import setPassword from 'services/changepassword/set-password';
import signInSso from 'services/investor/sign-in-sso';
import { generateInvitationLink } from 'services/fee/tell-friend';
import {
  ChangePasswordInput,
  SetPasswordInput,
  SignInSSOInput,
  SignUpInput,
  User,
} from './investor.types';

@Resolver()
class InvestorResolvers {
  @Authorized(JWT_ROLE.investor, JWT_ROLE.twoFA)
  @Query(() => User, {
    description: 'Get all users data',
    nullable: true,
  })
  async investorUser(@Ctx() { user }: Context): Promise<User | null> {
    const investor = await Investor.findOne(user.ID);
    const sto = await Stos.findOne(user.stoID);
    const investorSto = await InvestorSto.findOne({ investorID: user.ID, stoID: user.stoID });

    if (!investor || !sto || !investorSto) {
      return null;
    }
    return {
      investor,
      sto,
      investorSto,
    };
  }

  @Mutation(() => String, {
    description: 'Mutation for Investor authorization',
  })
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('stoID', () => Int) stoID: number,
  ): Promise<string> {
    const auth = new Auth(email, password, stoID);

    await auth.getInvestor();

    auth.validateInvestor();

    const token = await auth.generateJWT();

    if (token) {
      const logs = await Log.find({
        stoID,
        investorID: auth.investor.ID,
        activityType: 19,
      });
      if (logs.length <= 0) {
        await auth.firstLoginWelcome();
      }

      await Log.createLog({
        stoID,
        investorID: auth.investor.ID,
        activityType: 19,
      });
    }

    return token;
  }

  @Authorized(JWT_ROLE.api)
  @Mutation(() => String, {
    description: 'Mutation for Investor SSO authorization',
  })
  async signInSSO(@Arg('data') data: SignInSSOInput): Promise<string> {
    return signInSso(data);
  }

  @Authorized(JWT_ROLE.twoFA)
  @Mutation(() => String, {
    description: 'Mutation for Investor 2FA confirmation',
  })
  async investor2FAConfirm(
    @Ctx() { user }: Context,
    @Arg('code', () => Int) code: number,
  ): Promise<string> {
    const token = await twoFactorVerify(user, code);

    if (token) {
      await Log.createLog({
        stoID: user.stoID,
        investorID: user.ID,
        activityType: 19,
        description: 'Investor 2FA verified',
      });
    }

    return token;
  }

  @Mutation(() => Int, {
    description: 'Mutation for Investor register',
  })
  signUp(@Arg('data') data: SignUpInput): Promise<number> {
    const register = new RegisterSvc();
    return register.create(data);
  }

  @Authorized(JWT_ROLE.platformAdmin)
  @Query(() => [Register], {
    description:
      'Query for new, unverified registrations, which will become investor records once verified by email. Only when email verification is required to access the dashbaord. Optionally, can be searched by exact ID, email, or secret',
  })
  async unverifiedRegistrations(
    @Arg('ID', () => Int, { nullable: true }) ID?: number,
    @Arg('email', () => String, { nullable: true }) email?: string,
    @Arg('secret', () => String, { nullable: true }) secret?: string,
  ): Promise<Register[]> {
    try {
      if (ID) return await Register.find({ ID });
      if (email) return await Register.find({ email });
      if (secret) return await Register.find({ secret });
      return await Register.find();
    } catch (e) {
      console.error(`${e}`);
      throw e;
    }
  }

  @Mutation(() => Int, {
    description: 'Mutation for verify account',
  })
  investorVerify(@Arg('secret') secret: string): Promise<number> {
    const register = new RegisterSvc();
    return register.verify(secret);
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for change password',
  })
  investorChangePassword(
    @Ctx() { user }: Context,
    @Arg('data', () => ChangePasswordInput) data: ChangePasswordInput,
  ): Promise<boolean> {
    return changePassword(user.ID, data);
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for toggle 2FA authorization',
  })
  async investorToggleTwoFA(@Ctx() { user }: Context): Promise<boolean> {
    const investor = await Investor.findOneOrFail(user.ID);
    investor.isTwoFactorEnabled = !investor.isTwoFactorEnabled;
    await investor.save();

    return true;
  }

  @Mutation(() => Boolean, {
    description: 'Mutation for reset password',
  })
  investorReset(
    @Arg('email') email: string,
    @Arg('stoID', () => Int) stoID: number,
  ): Promise<boolean> {
    const forgot = new ForgotPassword();
    return forgot.reset(email, stoID);
  }

  @Mutation(() => Boolean, {
    description: 'Mutation for set new password',
  })
  investorSetPassword(
    @Arg('data', () => SetPasswordInput) data: SetPasswordInput,
  ): Promise<boolean> {
    return setPassword(data.token, data.password);
  }

  @Authorized(JWT_ROLE.investor)
  @Query(() => String, {
    description: 'Query For Fetching Invitation Link',
  })
  getInvitationLink(@Ctx() { user }: Context): Promise<string> {
    return generateInvitationLink(user.ID);
  }
}

export default InvestorResolvers;
