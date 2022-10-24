import { MiddlewareFn } from 'type-graphql';
import { ForbiddenError } from 'apollo-server-core';

import { Investor, InvestorSto, Params } from 'entities';
import { Context, JWT_ROLE } from 'core/context';
import { accreditationRequiringCountries } from 'core/feature-flags-checkers';
import { ACCREDITATION_REQUIREMENT_STEP_ENUM, PARAM } from '../core/envs';

/**
    We use it like this whenever desired :
    @UseMiddleware(AccreditationCheckMiddleware(ACCREDITATION_REQUIREMENT_STEP.OnPurchase))
 */

export function AccreditationCheckMiddleware(
  requiredStep: ACCREDITATION_REQUIREMENT_STEP_ENUM,
): MiddlewareFn<Context> {
  return async ({ context }, next) => {
    if (context.user.role !== JWT_ROLE.investor) {
      return next();
    }

    const isAccreditationEnabled = await Params.getParamCached(PARAM.IS_ACCREDITATION_ENABLED);
    if (!isAccreditationEnabled?.intValue) {
      return next();
    }

    const stepDb = await Params.getParamCached(PARAM.SHARE_PURCHASE_DOCUMENTS_MODE);
    if (stepDb && stepDb.intValue !== requiredStep) {
      return next();
    }

    const investor = await Investor.findOneOrFail({ ID: context.user.ID });
    const country = investor.taxCountry || investor.country || '';
    if (!accreditationRequiringCountries.includes(country)) {
      return next();
    }

    const investorSto = await InvestorSto.findOneOrFail({
      investorID: context.user.ID,
      stoID: 0,
    });
    if (investorSto.status === 3) {
      return next();
    }

    throw new ForbiddenError('Accreditation-check-failed');
  };
}
