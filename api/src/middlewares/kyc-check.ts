import { MiddlewareFn } from 'type-graphql';
import { ForbiddenError } from 'apollo-server-core';

import { InvestorSto } from 'entities';
import { KYC_REQUIREMENT_STEP } from 'entities/params';
import { Context, JWT_ROLE } from 'core/context';
import { kycRequirementStep } from 'core/feature-flags-checkers';

/**
    We use it like this whenever desired :
    @UseMiddleware(KYCCheckMiddleware(KYC_REQUIREMENT_STEP.OnPurchase))
 */

export function KYCCheckMiddleware(kycStep: KYC_REQUIREMENT_STEP): MiddlewareFn<Context> {
  return async ({ context }, next) => {
    if (context.user.role !== JWT_ROLE.investor) {
      return next();
    }
    const investorSto = await InvestorSto.findOneOrFail({
      investorID: context.user.ID,
      stoID: 0,
    });
    const kycMode = await kycRequirementStep();

    switch (kycStep) {
      case KYC_REQUIREMENT_STEP.Ignore: {
        if (kycMode.isIgnored()) {
          return next();
        }
        break;
      }
      case KYC_REQUIREMENT_STEP.OnPurchase: {
        if (!kycMode.isOnPurchase()) {
          return next();
        }
        break;
      }
      case KYC_REQUIREMENT_STEP.OnRegister: {
        if (!kycMode.isOnRegister()) {
          return next();
        }
        break;
      }
      case KYC_REQUIREMENT_STEP.PrePayment: {
        if (!kycMode.isPrePayment()) {
          return next();
        }
        break;
      }
      default: {
        throw new ForbiddenError('KYC-check-failed');
      }
    }
    if (investorSto.isKYC === 0) {
      throw new ForbiddenError('KYC-check-failed');
    }
    return next();
  };
}
