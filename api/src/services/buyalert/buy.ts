import { ValidationError } from 'apollo-server-core';
import moment from 'moment';
import schedule from 'node-schedule';

import {
  Currency,
  InvestingEntity,
  Investor,
  InvestorBalancesInCompanyAccounts as Balances,
  InvestorBuyPropertyAlert as BuyAlert,
  InvestorBuyPropertyAlert,
  InvestorSto,
  Log,
  ShareTypes,
  Stos,
} from 'entities';
import { InvestorBuyAlertInput, InvestorBuyAlertOptions } from 'api/buy-alert/buy-alert.types';
import Pool, { execute } from 'core/mysql';
import {
  internalWalletMode,
  isMarketSpace,
  kycRequirementStep,
  sharePurchaseDocumentsModes,
} from 'core/feature-flags-checkers';
import Email from 'services/email';
import { InvestorBuyAlertMSInput } from 'api/market-space/market-space.types';
import * as math from 'mathjs';
import { LOG_ACTION } from 'entities/logs';
import { handleFees } from 'services/fee/handle-fees';
import { PURCHASE_STATUS_TYPE } from 'entities/investor-buy-property-alert';
import { In } from 'typeorm';
import { tArgs } from 'core/helpers';
import { findRequiredDocuments } from '../sharePurchaseDocuments/SharePurchaseService';
import { copyInvestorSto, postSignUpdates } from './buyAlertHelpers';

class InvestorBuy {
  investorID: number;

  shareType: ShareTypes;

  currency?: Currency;

  constructor(investorID: number) {
    this.investorID = investorID;
  }

  protected async _getShareType(data: InvestorBuyAlertInput): Promise<ShareTypes> {
    let shareType;
    if (!this.shareType) {
      shareType = await ShareTypes.findOneOrFail({ ID: data.shareTypeID, stoID: data.stoID });
      this.currency = await shareType?.currency;
      this.shareType = shareType;
    }
    return this.shareType;
  }

  async checkBalance(data: InvestorBuyAlertInput): Promise<void> {
    const modes = await internalWalletMode();
    if (modes.isDisabled()) return;

    const stoID = modes.isGlobal() ? 0 : data.stoID;
    const shareType = await this._getShareType(data);
    const accounts = await Balances.find({
      stoID,
      investorID: this.investorID,
      currencyID: shareType.currencyID,
    });
    const total = accounts.reduce((sum, acc) => sum + acc.amount, 0);
    if (total < data.shares) {
      throw new ValidationError(
        tArgs(`api-arg-insufficient-funds-in-specific-wallet`, {
          currency: (await shareType.currency).abbreviation,
        }),
      );
    }
  }

  async checkEntity(data: InvestorBuyAlertMSInput): Promise<void> {
    const entity = await InvestingEntity.findOne({
      investorID: this.investorID,
      ID: data.entityID,
    });
    if (!entity) {
      throw new Error('api-wrong-investing-entity-ID');
    }
  }

  async checkDB(
    data: InvestorBuyAlertInput | InvestorBuyAlertMSInput,
    options?: InvestorBuyAlertOptions,
  ): Promise<void> {
    const type = await this._getShareType(data);

    const investor = await Investor.findOne({ ID: this.investorID });
    if (!investor) {
      throw new Error(`api-missing-investor-ID`);
    }

    const kycMode = await kycRequirementStep();

    if (!kycMode.isIgnored() && !kycMode.isPrePayment()) {
      const investorSto = await InvestorSto.findOneOrFail({
        investorID: this.investorID,
        stoID: 0,
      });
      if (investorSto.isKYC === 0) {
        throw new Error('api-kyc-required');
      }
      // Needed for admin to review investor accreditation
      await copyInvestorSto(investorSto, data.stoID);
    }

    if (type.minimumSharesToBuyByInvestor > data.shares) {
      throw new Error('api-below-minimum-request');
    }

    if (type.availableShare() < data.shares) {
      throw new ValidationError(
        tArgs(`api-arg-exceeding-shares-available`, {
          shares: type.availableShare(),
        }),
      );
    }

    const alert = await BuyAlert.findOne({
      stoID: data.stoID,
      status: In([
        PURCHASE_STATUS_TYPE.Pending,
        PURCHASE_STATUS_TYPE.KycRequired,
        PURCHASE_STATUS_TYPE.AccreditationRequired,
        PURCHASE_STATUS_TYPE.PendingDocuments,
      ]),
      investorID: this.investorID,
      shareTypeID: data.shareTypeID,
      // Normally this wouldn't be true with manual approvals
      isHiddenForInvestor: false,
      isSellRequest: data.isSellBackRequest,
    });

    if (alert && !options?.ignoreAllPreviousRequests) {
      if (alert.status === PURCHASE_STATUS_TYPE.Pending || PURCHASE_STATUS_TYPE.PendingDocuments) {
        throw new Error(`api-purchase-request-already-open/purchaseId=${alert.ID}`);
      }
      throw new ValidationError(
        data.isSellBackRequest
          ? 'api-sell-request-already-open'
          : 'api-purchase-request-already-open',
      );
    }

    const isMS = await isMarketSpace();

    if (isMS && data instanceof InvestorBuyAlertMSInput && options?.ignoreEntity !== true) {
      await this.checkEntity(data);
    } else {
      if (options?.ignoreWalletBalance !== true) await this.checkBalance(data);
    }
  }

  async checkSellLimits(
    data: InvestorBuyAlertInput | InvestorBuyAlertMSInput,
    options?: InvestorBuyAlertOptions,
  ): Promise<void> {
    await this.checkDB(data, options);
  }

  async internalMode(alertID: number): Promise<void> {
    const modes = await sharePurchaseDocumentsModes();
    //insert already signed documents
    if (modes.isInternal()) {
      const sql = `
SELECT max(sharePurchaseDocuments.requireOnce) as requireOnce, min(du.ID) as ID FROM sharePurchaseDocuments 
  LEFT JOIN (
    SELECT * FROM documentuser 
    WHERE documentuser.DocumentStatus>1 and documentuser.investorID=?
    GROUP BY(documentuser.ID)
  ) du on du.documentid = sharePurchaseDocuments.ID 
group by (sharePurchaseDocuments.ID)
      `;
      type ShareDocument = { ID: number; requiredOnce: number };

      const sharePurchaseDocuments = await execute<ShareDocument>(sql, [this.investorID]);

      const alertAdminSQl =
        'update InvestorBuyPropertyAlert set isBuySharesFormSigned=1 where ID=?';

      if (
        sharePurchaseDocuments.length > 0 &&
        sharePurchaseDocuments.every((row) => row.requiredOnce === 1 && row.ID)
      )
        await Pool.execute(alertAdminSQl, [alertID]);

      const submittedSharePurchaseDocumentsSql = sharePurchaseDocuments
        .filter((row) => row.ID && row.requiredOnce === 1)
        .map(
          (row) =>
            `insert into submittedSharePurchaseDocuments(sharePurchaseRequestID, submittedDocumentID ) values(${alertID},${row.ID});`,
        )
        .join('');
      if (submittedSharePurchaseDocumentsSql.length > 0)
        await Pool.execute(submittedSharePurchaseDocumentsSql, []);
    }
  }

  async insertAlert(data: InvestorBuyAlertInput): Promise<BuyAlert> {
    const date = new Date().toISOString();
    const alert = BuyAlert.create(data);
    alert.date = `${date.substring(0, 10)} ${date.substring(11, 19)}`;
    alert.investorID = this.investorID;
    alert.status = data.status ?? 1;
    alert.publicKey = data.publicKey ?? '-';
    alert.isBlockchain = false;
    const shareType = await this._getShareType(data);

    const price = data.isSellBackRequest ? shareType.sellValue : shareType.premiumValue;
    alert.purchasePriceOffered = math.multiply(price, alert.shares);
    alert.fromCurrencyID = shareType.currencyID;
    alert.isSellRequest = data.isSellBackRequest;
    // no contracts to sign so always mark as done
    alert.isSubscriptionSigned = 1;
    alert.isBuySharesSigned = data.isSellBackRequest ? 1 : 0;
    await alert.save();
    const trueAlert = await InvestorBuyPropertyAlert.findOneOrFail({ ID: alert.ID });
    // reset shareTypeID after save to prevent null error
    trueAlert.shareTypeID = data.shareTypeID;

    await handleFees(trueAlert, shareType, data.isSellBackRequest);

    await Log.createLog({
      stoID: trueAlert.stoID,
      investorID: trueAlert.investorID,
      activityType: data.isSellBackRequest
        ? LOG_ACTION.SellBackAlertReceived
        : LOG_ACTION.SharePurchaseRequestReceived,
      recID: trueAlert.ID,
    });

    await this.internalMode(trueAlert.ID);

    const alertWithFees = await InvestorBuyPropertyAlert.findOneOrFail({ ID: alert.ID });
    const shareTypeName = (await alertWithFees.shareType).title;
    const sto = await Stos.findOneOrFail({ ID: trueAlert.stoID });
    const email = new Email(sto);
    await email.offerSubmittedEmail(
      trueAlert.investorID,
      Number(alertWithFees.purchasePriceOffered),
      shareTypeName,
    );

    return trueAlert;
  }

  async requiresSignatures(
    alert: InvestorBuyPropertyAlert,
    options?: InvestorBuyAlertOptions,
  ): Promise<void> {
    if (options?.ignoreSignatures === true) {
      await BuyAlert.update(alert.ID, { isBuySharesSigned: 1, isSubscriptionSigned: 1 });
      await postSignUpdates(alert);
    } else {
      const allRequiredDocsSto = await findRequiredDocuments(alert, alert.investorID);
      const areAllSigned = allRequiredDocsSto?.every((d) => d.status === 3);
      if (areAllSigned || !allRequiredDocsSto.length) {
        await BuyAlert.update(alert.ID, {
          isBuySharesSigned: 1,
          isSubscriptionSigned: 1,
          status: 1,
        });
        await postSignUpdates(alert);
      } else {
        const firstScheduledDate = moment().add(2, 'days').toDate(); // After 48 Hours
        const secondScheduledDate = moment().add(5, 'days').toDate(); // After 120 Hours
        const sto = await Stos.findOneOrFail({ ID: alert.stoID });
        const investor = await Investor.findOneOrFail({ ID: alert.investorID });
        const email = new Email(sto);
        const isMS = await isMarketSpace();
        schedule.scheduleJob(firstScheduledDate, async () => {
          if (isMS) {
            await email.marketSpaceDocumentSubscriptionReminderEmail(
              investor.firstName,
              investor.email,
            );
          } else {
            await email.documentSubscriptionReminderEmail(investor);
          }
        });
        schedule.scheduleJob(secondScheduledDate, async () => {
          if (isMS) {
            await email.marketSpaceDocumentSubscriptionReminderEmail(
              investor.firstName,
              investor.email,
            );
          } else {
            await email.documentSubscriptionReminderEmail(investor);
          }
        });
      }
    }
  }

  async insert(data: InvestorBuyAlertInput, options?: InvestorBuyAlertOptions): Promise<number> {
    await this._getShareType(data); // Preload sharetype
    await this.checkLimit(data, this.investorID, options);
    await this.checkDB(data, options);

    const a = await this.insertAlert(data);
    await this.requiresSignatures(a, options);
    return a.ID;
  }

  async insertSell(data: InvestorBuyAlertInput): Promise<number> {
    try {
      data.isSellBackRequest = true;

      await this._getShareType(data); // Preload sharetype
      await this.checkSellLimits(data);

      const a = await this.insertAlert(data);

      return a.ID;
    } catch (e) {
      console.error(`Mutation investorSellAlert:\n${(e as Error).stack}`);
      throw new Error('Internal Server Error');
    }
  }

  async checkLimit(
    query: InvestorBuyAlertInput,
    investorID: number,
    options?: InvestorBuyAlertOptions,
  ): Promise<void> {
    if (options?.ignoreWalletBalance === true) {
      return;
    }

    const investor = await Investor.findOneOrFail({ ID: investorID });
    const dateNow = new Date();
    const dateExpiry = new Date(investor.investmentLimitUpdateDate);
    dateExpiry.setFullYear(dateExpiry.getFullYear() + 1);

    //[**For Review] We are resetting total and date
    if (dateNow.valueOf() > dateExpiry.valueOf()) {
      investor.yearlyTotalInvestment = 0;
      investor.investmentLimitUpdateDate = new Date().toLocaleDateString();
      await investor.save();
    }
    //[**For Review] We alreay set totalamount = 0 .in the below IF  we are
    // checking total > 0(alowedamount) which is always true so investor doesnt have chance to purchase till if None set max allowed amoun in admin panel
    const totalShares = math.add(investor.yearlyTotalInvestment, query.shares);

    if (
      investor.allowedTotalInvestment > 0 &&
      query.shares &&
      math.multiply(totalShares, this.shareType?.premiumValue ?? 0) >
        investor.allowedTotalInvestment
    ) {
      throw new ValidationError(
        tArgs(`api-arg-exceeding-investment-limit`, {
          currency: this.currency?.abbreviation ?? '',
          investment: investor.allowedTotalInvestment,
        }),
      );
    }
  }
}

export default InvestorBuy;
