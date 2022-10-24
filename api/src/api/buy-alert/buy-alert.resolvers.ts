import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';

import {
  InvestorBuyPropertyAlert,
  InvestorBuyPropertyAlert as BuyAlert,
  InvestorInvoices,
  Log,
} from 'entities';
import { Context, JWT_ROLE } from 'core/context';
import InvestorBuy from 'services/buyalert/buy';
import { ForbiddenError, ValidationError } from 'apollo-server-core';
import { PURCHASE_STATUS_TYPE } from 'entities/investor-buy-property-alert';
import { INVOICE_STATUS_TYPE } from 'entities/investor-invoices';
import { FindConditions, In } from 'typeorm';
import { LOG_ACTION } from 'entities/logs';
import ShareTransferService from 'services/shares/ShareTransferService';
import { AccreditationCheckMiddleware } from '../../middlewares/accreditation-check';
import { ACCREDITATION_REQUIREMENT_STEP_ENUM } from '../../core/envs';
import {
  InvestorBuyAlertInput,
  InvestorBuyAlertInputAdmin,
  InvestorBuyAlertOptions,
} from './buy-alert.types';

@Resolver()
class BuyAlertResolvers {
  @Authorized(JWT_ROLE.investor, JWT_ROLE.platformAdmin, JWT_ROLE.admin)
  @Query(() => [BuyAlert], {
    description: 'Get all investors buy alerts',
    nullable: true,
  })
  async investorBuyAlerts(
    @Ctx() { user }: Context,
    @Arg('status', () => [PURCHASE_STATUS_TYPE])
    status: (
      | PURCHASE_STATUS_TYPE.Pending
      | PURCHASE_STATUS_TYPE.Accepted
      | PURCHASE_STATUS_TYPE.KycRequired
      | PURCHASE_STATUS_TYPE.AccreditationRequired
      | PURCHASE_STATUS_TYPE.PendingDocuments
    )[],
  ): Promise<BuyAlert[] | []> {
    const alerts = await BuyAlert.find({
      investorID: user.ID,
      status: In(status),
      isHiddenForInvestor: false,
    });
    await BuyAlert.updateShareTypes(alerts);
    return alerts;
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.api, JWT_ROLE.admin)
  @Query(() => [BuyAlert], {
    description: 'Get all investors buy alerts',
    nullable: true,
  })
  async investorBuyAlertsAdmin(
    @Arg('investorID', () => Int, {
      nullable: true,
      description: 'Filter by investor ID optionally. "null" == all investors',
    })
    investorID?: number,
    @Arg('status', () => PURCHASE_STATUS_TYPE, {
      nullable: true,
      description:
        'Filter by status optionally. By default the status is "Pending". "null" filter == "Pending"',
    })
    status?: PURCHASE_STATUS_TYPE,
    @Arg('alertID', () => Int, {
      nullable: true,
      description:
        'Find this one alert ID specifically (in array) or return an empty array. Cancels out the other parameters.',
    })
    alertID?: number,
    @Arg('isSellRequest', () => Boolean, {
      nullable: true,
      description: 'Filter alerts by whether they are sell requests or not.',
    })
    isSellRequest?: boolean,
  ): Promise<BuyAlert[] | []> {
    const findConditions: FindConditions<BuyAlert> = {};
    if (alertID) {
      findConditions.ID = alertID;
    }
    if (investorID) {
      findConditions.investorID = investorID;
    }
    if (status) {
      findConditions.status = status;
    }
    if (isSellRequest) {
      findConditions.isSellRequest = isSellRequest;
    }
    const alerts: BuyAlert[] | [] = await BuyAlert.find(findConditions);
    await BuyAlert.updateShareTypes(alerts);

    return alerts;
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Int, {
    description: 'Create an investors buy alert',
  })
  @UseMiddleware(AccreditationCheckMiddleware(ACCREDITATION_REQUIREMENT_STEP_ENUM.OnPurchase))
  async investorBuyAlert(
    @Ctx() { user }: Context,
    @Arg('query') query: InvestorBuyAlertInput,
  ): Promise<number> {
    try {
      const buy = new InvestorBuy(user.ID);
      return await buy.insert(query);
    } catch (e) {
      const err = (e as Error).message;
      console.log(err);
      if (err.startsWith('api-')) {
        throw new ValidationError(err);
      } else {
        throw new Error('api-internal-server-error');
      }
    }
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Int, {
    description: 'Create an investors sell alert',
  })
  async investorSellAlert(
    @Ctx() { user }: Context,
    @Arg('data') data: InvestorBuyAlertInput,
  ): Promise<number> {
    const buy = new InvestorBuy(user.ID);
    return buy.insertSell(data);
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.api)
  @Mutation(() => Int, {
    description: 'Create an investors buy alert as admin or API',
  })
  investorBuyAlertAdmin(
    @Arg('data') data: InvestorBuyAlertInputAdmin,
    @Arg('options', {
      nullable: true,
      description: 'Custom flow options',
    })
    options?: InvestorBuyAlertOptions,
  ): Promise<number> {
    const buy = new InvestorBuy(data.investorID);
    return buy.insert(data, options);
  }

  @Authorized(JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for removing/hiding Investor Share Purchase Alert',
  })
  async investorBuyAlertRemove(
    @Ctx() { user }: Context,
    @Arg('alertID', () => Int) alertID: number,
  ): Promise<boolean> {
    const buyAlert = await InvestorBuyPropertyAlert.findOneOrFail({ ID: alertID });
    if (buyAlert.investorID !== user.ID)
      throw new ForbiddenError(`Payment request does not belong to this investor ID`);

    // Keeping the old behavior of removing pending alerts, but will make others hidden
    if (
      [
        PURCHASE_STATUS_TYPE.Unused,
        PURCHASE_STATUS_TYPE.Pending,
        PURCHASE_STATUS_TYPE.PaymentAwaiting,
        PURCHASE_STATUS_TYPE.KycRequired,
        PURCHASE_STATUS_TYPE.AccreditationRequired,
        PURCHASE_STATUS_TYPE.PendingDocuments,
      ].includes(buyAlert.status)
    ) {
      const invoice = await InvestorInvoices.findOne({
        buyAlertID: buyAlert.ID,
        status: INVOICE_STATUS_TYPE.Unpaid,
      });
      if (invoice) {
        await invoice.remove();
      }
      await buyAlert.remove();
    } else {
      await this.investorBuyAlertHide({ user }, alertID);
    }
    return true;
  }

  @Authorized(JWT_ROLE.api, JWT_ROLE.admin, JWT_ROLE.platformAdmin)
  @Mutation(() => Boolean, {
    description:
      'Approves and initiates a share transfer as if invoked from the administration panel',
  })
  async investorBuyAlertApprove(
    @Ctx() { user }: Context,
    @Arg('alertID', () => Int) alertID: number,
  ): Promise<boolean> {
    // Validate
    const alert = await InvestorBuyPropertyAlert.findOneOrFail(alertID);
    if (user.role === JWT_ROLE.admin && alert.stoID !== user.stoID) {
      throw new ValidationError(
        `Access denied for alert in stoID:${alert.stoID}. You are using stoID:${user.stoID}`,
      );
    }
    if ([PURCHASE_STATUS_TYPE.Accepted, PURCHASE_STATUS_TYPE.Declined].includes(alert.status)) {
      throw new ValidationError(`Can not approve buy alert with status:${alert.status}`);
    }
    // Transfer
    try {
      const transfer = new ShareTransferService(
        {
          adminID: user.ID,
          investorID: alert.investorID,
          shareTypeID: alert.shareTypeID,
          stoID: alert.stoID,
          tokensToTransfer: alert.shares,
        },
        alertID,
      );
      await transfer.transferSharesBetween('company', 'investor');
    } catch (e) {
      console.error((e as Error).stack);
      throw e;
    }

    return true;
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.api)
  @Mutation(() => Boolean, {
    description: 'Mutation for removing Investor Share Purchase Alert as admin or API',
  })
  async investorBuyAlertRemoveAdmin(@Arg('alertID', () => Int) alertID: number): Promise<boolean> {
    const buyAlert = await InvestorBuyPropertyAlert.findOne({ ID: alertID });
    if (!buyAlert) {
      throw new ValidationError('Investor Share Purchase Alert not found');
    }
    await buyAlert.remove();
    return true;
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.admin, JWT_ROLE.api)
  @Mutation(() => Boolean, {
    description: 'Mutation for declining Investor Share transaction as admin or API',
  })
  async investorBuyAlertDeclineAdmin(@Arg('alertID', () => Int) alertID: number): Promise<boolean> {
    const buyAlert = await InvestorBuyPropertyAlert.findOne({ ID: alertID });
    if (!buyAlert) {
      throw new ValidationError('Investor Share Purchase Alert not found');
    }
    await BuyAlert.update({ ID: alertID }, { status: PURCHASE_STATUS_TYPE.Declined });
    await InvestorInvoices.update(
      { buyAlertID: alertID },
      { status: INVOICE_STATUS_TYPE.Declined },
    );
    return true;
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.api)
  @Mutation(() => Boolean, {
    description:
      'Mutation for setting Investor Share Purchase Alert status (NOTE: Only updates status without any other actions)',
  })
  async investorBuyAlertSetStatus(
    @Arg('alertID', () => Int) alertID: number,
    @Arg('status', () => PURCHASE_STATUS_TYPE) status: PURCHASE_STATUS_TYPE,
  ): Promise<boolean> {
    const alert = await InvestorBuyPropertyAlert.findOne({ ID: alertID });
    if (!alert) {
      throw new ValidationError('Investor Share Purchase Alert not found');
    }
    alert.status = status;

    await Log.createLog({
      stoID: alert.stoID,
      investorID: alert.investorID,
      activityType: LOG_ACTION.SharePurchaseStatusUpdateApi,
      recID: alert.ID,
    });
    await BuyAlert.update(alert.ID, { status: alert.status });

    return true;
  }

  @Authorized(JWT_ROLE.platformAdmin, JWT_ROLE.api, JWT_ROLE.investor)
  @Mutation(() => Boolean, {
    description: 'Mutation for hiding Investor Share Purchase Alert when no longer needed',
  })
  async investorBuyAlertHide(
    @Ctx() { user }: Context,
    @Arg('alertID', () => Int) alertID: number,
  ): Promise<boolean> {
    const buyAlert = await InvestorBuyPropertyAlert.findOne({
      where: {
        ID: alertID,
        ...(user.role === JWT_ROLE.investor && { investorID: user.ID }),
      },
    });
    if (!buyAlert) {
      throw new ValidationError('Investor Share Purchase Alert not found');
    }
    if (
      ![
        PURCHASE_STATUS_TYPE.Pending,
        PURCHASE_STATUS_TYPE.Unused,
        PURCHASE_STATUS_TYPE.PaymentAwaiting,
        PURCHASE_STATUS_TYPE.PaymentOngoing,
      ].includes(buyAlert.status)
    ) {
      await buyAlert.hide();
      return true;
    }
    if ([JWT_ROLE.platformAdmin, JWT_ROLE.api].includes(user.role)) {
      await buyAlert.hide();
      return true;
    }
    throw new ValidationError(`Can't hide this type of alert. It must be in an end state.`);
  }
}

export default BuyAlertResolvers;
