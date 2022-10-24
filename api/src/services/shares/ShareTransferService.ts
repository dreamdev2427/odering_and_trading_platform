import { ValidationError } from 'apollo-server-core';
import * as math from 'mathjs';

import {
  Log,
  Shares,
  SharesWallet,
  ShareTypes,
  SharesHistory,
  InvestorBuyPropertyAlert as BuyAlert,
  InvestorBalancesInCompanyAccounts as InternalWallet,
  SharesTransferHistory,
  Investor,
  Investments,
  Stos,
  Params,
} from 'entities';
import { PURCHASE_STATUS_TYPE } from 'entities/investor-buy-property-alert';
import Email from 'services/email';
import { AppParameters } from 'entities/params';

interface ShareTransferOpts {
  printLog?: boolean;
}

interface ShareTransfer {
  investorID: number;
  stoID: number;
  shareTypeID: number;
  tokensToTransfer: number;
  adminID: number;
  certificateNos?: string;
  shareNos?: string;
  options?: ShareTransferOpts;
}

type Action = 'increase' | 'decrease';

export type Entity = 'company' | 'investor' | 'custodian';

export class ShareTransferService {
  static readonly entityTypes = ['company', 'investor', 'custodian']; // For validation

  private ID: number;

  private investorID: number;

  private stoID: number;

  private shareTypeID: number;

  private tokensToTransfer: number;

  private adminID: number;

  private remain: number = 0;

  private custodianRemain: number = 0;

  private investment: number;

  private investmentDescription: string;

  private certificateNos?: string;

  private shareNos?: string;

  private options?: ShareTransferOpts;

  private _params?: AppParameters;

  /**
   * idempotency token
   * @private
   */
  private token?: string;

  private entityActions: {
    // Entity can't be a regular enum in this situation
    [key in Entity]: (action: Action) => Promise<void>;
  } = {
    investor: async (action: Action): Promise<void> => {
      await this.updateInvestorShares(action);
      await this.updateShareWallet(action);
      await this.updateSharesHistory(action);
    },
    custodian: async (action: Action) => {
      await this.updateCustodianShares(action);
    },
    company: async (action: Action) => {
      await this.updateCompanyShares(action);
    },
  };

  constructor(data: ShareTransfer, ID?: number) {
    Object.assign(this, data);
    this.ID = Number(ID);
  }

  private async updateCompanyShares(action: Action): Promise<void> {
    const isDecrease = action === 'decrease';
    const { shareTypeID: ID, stoID, tokensToTransfer } = this;
    const shareType = await ShareTypes.findOneOrFail({ ID, stoID }, { relations: ['currency'] });

    if (isDecrease && +tokensToTransfer > (+shareType.companyShares || 0)) {
      throw new ValidationError(
        'Share Transfer Service - More shares are being transferred than company balance',
      );
    }
    if (!isDecrease && (!shareType.sellToCompany || !shareType.sellValue)) {
      throw new ValidationError(
        "Share Transfer Service - 'Sell To Company' for the Share is not applicable ",
      );
    }

    const shares = isDecrease
      ? (math.subtract(shareType.companyShares || 0, tokensToTransfer) as number)
      : (math.add(
          math.bignumber(shareType.companyShares || 0),
          math.bignumber(tokensToTransfer),
        ) as unknown as number);
    shareType.companyShares = math.number(shares) as number;
    await shareType.save();

    this.remain = shareType.companyShares;
  }

  private async updateCustodianShares(action: Action): Promise<void> {
    const isDecrease = action === 'decrease';
    const { shareTypeID: ID, stoID, tokensToTransfer } = this;
    const shareType = await ShareTypes.findOneOrFail({ ID, stoID }, { relations: ['currency'] });

    if (isDecrease && +tokensToTransfer > (+shareType.custodianShares || 0)) {
      throw new ValidationError(
        'Share Transfer Service - More shares are being transferred than custodian balance',
      );
    }

    const shares = isDecrease
      ? (math.subtract(shareType.custodianShares || 0, tokensToTransfer) as number)
      : (math.add(
          math.bignumber(shareType.custodianShares || 0),
          math.bignumber(tokensToTransfer),
        ) as unknown as number);
    shareType.custodianShares = math.number(shares) as number;
    await shareType.save();

    this.custodianRemain = shareType.custodianShares;
  }

  private async updateInvestorShares(action: Action): Promise<void> {
    const isDecrease = action === 'decrease';
    const { shareTypeID, investorID, stoID, tokensToTransfer, ID } = this;
    // Investor shares tracks the running balance of a share type ID and STO ID for the investor
    const investorShares = await Shares.findOne({ investorID, stoID, shareTypeID });
    const investor = await Investor.findOneOrFail({ ID: investorID });
    if (isDecrease && tokensToTransfer > (investorShares?.shares || 0)) {
      throw new ValidationError(
        'Share Transfer Service - More shares are being transferred than investor balance',
      );
    }
    const isSellRequest = isDecrease;
    const shareType = await ShareTypes.findOneOrFail(shareTypeID);
    const date = new Date().toISOString();

    const status = PURCHASE_STATUS_TYPE.Accepted;

    // Whether to create or update a buy alert related to this share transfer
    if (ID) {
      await BuyAlert.update(ID, {
        stoID,
        investorID,
        shares: tokensToTransfer,
        isBlockchain: shareType.isBlockchain,
        isSellRequest,
        shareTypeID,
        status,
        date: `${date.substring(0, 10)} ${date.substring(11, 19)}`,
        fromCurrencyID: shareType.currencyID,
      });
    } else {
      const buyAlert = BuyAlert.create({
        stoID,
        investorID,
        shares: tokensToTransfer,
        isBlockchain: shareType.isBlockchain,
        isSellRequest,
        shareTypeID,
        status,
        date: `${date.substring(0, 10)} ${date.substring(11, 19)}`,
        fromCurrencyID: shareType.currencyID,
      });
      await buyAlert.save();
    }

    // Update investor internal wallet only if applicable
    await this._updateInvestorWalletBalance({
      status,
      shareType,
      isSellRequest,
    });

    // Create or update share balance
    if (investorShares) {
      const shares = isDecrease
        ? (math.subtract(investorShares.shares || 0, tokensToTransfer) as number)
        : (math.add(
            math.bignumber(investorShares.shares || 0),
            math.bignumber(tokensToTransfer),
          ) as unknown as number);
      investorShares.shares = math.number(shares) as number;
      await Shares.update(investorShares.ID, { shares: investorShares.shares });
    } else {
      const newShares = Shares.create({
        shares: tokensToTransfer,
        investorID,
        stoID,
        shareTypeID,
        sharesHistoryID: 0,
      });

      await newShares.save();
    }

    // Update yearly total investment
    investor.yearlyTotalInvestment = math.add(
      investor.yearlyTotalInvestment,
      math.multiply(shareType.premiumValue, tokensToTransfer),
    ) as number;
    await Investor.update(investor.ID, { yearlyTotalInvestment: investor.yearlyTotalInvestment });

    // Notify via email
    await this.emailNotify(isSellRequest);
  }

  /**
   * If applicable, update the investor internal balance, otherwise do nothing.
   *
   * Sub-function of `updateInvestorShares()`
   *
   * # This whole class is in need of refactoring
   *
   * Whichever poor soul ends up doing it, at least read and understand the point of this acticle:
   * https://medium.com/swlh/stop-using-if-else-statements-f4d2323e6e4
   * It takes 5 minutes, seriously!
   */
  private async _updateInvestorWalletBalance(options: {
    status: PURCHASE_STATUS_TYPE;
    shareType: ShareTypes;
    isSellRequest: boolean;
  }): Promise<void> {
    const { _params, stoID, investorID, tokensToTransfer } = this;
    const { status, shareType, isSellRequest } = options;

    if (_params?.IsInternalWalletDisabled || status !== PURCHASE_STATUS_TYPE.Accepted) {
      return;
    }

    const currencyID = shareType.currencyID;
    const investorBalance = await InternalWallet.findOne({
      stoID,
      investorID,
      currencyID,
    });

    // transfer funds to investor wallet if the status is 2
    if (
      // I don't know WTF was this about, but it achieves nothing:
      // PLATFORM_CONFIGURATION.Internal_Wallets_Blockchain_Fiat_Combined &&
      // status === PURCHASE_STATUS_TYPE.Accepted &&
      isSellRequest
    ) {
      // the following needs to be generalized to handle all cases
      // trnsfer funds ** Only for sellBackToCompany Operations **

      // increasing investor balance in the company account

      const valueAdded = shareType.sellValue * tokensToTransfer;

      if (!investorBalance) {
        throw new ValidationError('Investor balance in this curreny does not exsist');
      } else {
        const amount = math.number(
          math.add(
            math.bignumber(investorBalance.amount || 0),
            math.bignumber(valueAdded),
          ) as unknown as number,
        ) as number;
        if (amount < 0) {
          throw new Error('You dont have enough funds in balance');
        }
        await InternalWallet.update(investorBalance.ID, { amount: investorBalance.amount });
      }
    } else {
      const valueAdded = math.multiply(
        math.number(shareType.premiumValue) as number,
        math.number(tokensToTransfer) as number,
      ) as number;

      if (!investorBalance) {
        const newBalance = InternalWallet.create({
          stoID,
          investorID,
          currencyID,
          amount: valueAdded,
        });
        await newBalance.save();
      } else {
        const newAmount = math.subtract(
          math.number(investorBalance.amount) || 0,
          math.number(valueAdded),
        ) as number;
        if (newAmount < 0) {
          throw Error('Investor does not have enough funds in balance');
        }
        await InternalWallet.update(investorBalance.ID, { amount: investorBalance.amount });
      }
    }
  }

  private async updateShareWallet(action: Action): Promise<void> {
    const isDecrease = action === 'decrease';
    const { shareTypeID, investorID, tokensToTransfer } = this;

    const sharesWallet = await SharesWallet.findOne({
      investorID,
      shareTypeID,
      publicKey: 'platform',
    });

    if (sharesWallet?.isBlocked) {
      throw new ValidationError(`Share Transfer Service - Share wallet is blocked`);
    }

    const currentShares = (await Shares.findOne({ investorID, shareTypeID }))?.shares ?? 0;

    if (!sharesWallet) {
      const newWallet = SharesWallet.create({
        investorID,
        shareTypeID,
        shares: currentShares,
        publicKey: 'platform',
        isBlocked: false,
      });
      await newWallet.save();
    } else {
      const shares = isDecrease
        ? (math.subtract(sharesWallet.shares || 0, tokensToTransfer) as number)
        : (math.add(
            math.bignumber(sharesWallet.shares || 0),
            math.bignumber(tokensToTransfer),
          ) as unknown as number);
      sharesWallet.shares = math.number(shares) as number;
      await sharesWallet.save();
    }
  }

  private async updateSharesHistory(action: Action): Promise<void> {
    const isDecrease = action === 'decrease';
    const { shareTypeID, investorID, stoID, certificateNos = '', shareNos = '' } = this;
    const shares = await Shares.findOneOrFail(
      { investorID, stoID, shareTypeID },
      { relations: ['shareType'] },
    );

    const newHistory = SharesHistory.create({
      certificateSerials: certificateNos,
      shareSerials: shareNos,
      shareTypeID,
      investorID,
      isActive: true,
      shares: shares.shares,
      datePurchase: new Date(),
      purchaserID: -1,
      sharesID: shares.ID,
    });

    await newHistory.save();

    // Now Update the previous share history
    const shareHistory = await SharesHistory.findOne({ ID: shares.sharesHistoryID });
    if (shareHistory) {
      shareHistory.isActive = false;
      shareHistory.purchaserID = isDecrease ? -1 : investorID; // replace with id of purchaser if any
      await shareHistory.save();
    }

    shares.sharesHistoryID = newHistory.ID;
    shares.shareTypeID = shareTypeID;
    await shares.save();
  }

  private async validateTransfer(decrease: Entity, increase: Entity): Promise<void> {
    if (this.tokensToTransfer < 0) {
      throw new ValidationError(`Negative transfers are not supported.`);
    }
    if (!ShareTransferService.entityTypes.includes(decrease)) {
      throw new ValidationError(`Unknown entity type.`);
    }
    if (decrease === increase) {
      throw new ValidationError(`Can not transfer between the same type of entity.`);
    }
    if (this.token) {
      const exists = await SharesTransferHistory.findOne({ token: this.token });
      if (exists) {
        throw new ValidationError('Transfer with this token is already exists');
      }
    }
    const newToken = SharesTransferHistory.create({
      stoID: this.stoID,
      investorID: this.investorID,
      adminID: this.adminID,
      shareTypeID: this.shareTypeID,
      token: this.token || '',
      amount: this.tokensToTransfer,
      type: `${decrease}->${increase}`,
    });

    await newToken.save();
  }

  public async transferSharesBetweenString(decrease: string, increase: string): Promise<void> {
    return this.transferSharesBetween(decrease as Entity, increase as Entity);
  }

  /**
   * Performs a share transfer between two selected entities.
   * @param increase this entity's balance will be increased
   * @param decrease this entity's balance will be decreased
   */
  public async transferSharesBetween(decrease: Entity, increase: Entity): Promise<void> {
    // TODO: [DIG-378] Implement transaction in transferShares
    this._params = await Params.getAppParams();
    await this.validateTransfer(decrease, increase);
    await this.entityActions[increase]('increase');
    await this.entityActions[decrease]('decrease');
    await this.log(decrease, increase);
  }

  /**
   * Send email notification if it's enabled
   */
  private async emailNotify(isSellRequest: boolean): Promise<void> {
    const { investorID, tokensToTransfer, shareTypeID, _params } = this;

    if (!_params?.isShareTransferEmailEnabled) {
      return;
    }

    const investor = await Investor.findOneOrFail(investorID);
    const shareType = await ShareTypes.findOneOrFail(shareTypeID);
    const currency = (await shareType.currency).abbreviation;
    const alert = await BuyAlert.findOneOrFail({ ID: this.ID });

    const stos = await Stos.findOneOrFail(this.stoID);
    const emailController = new Email(stos);
    if (isSellRequest) {
      await emailController.sharesSoldBackNonBlockchain(
        investor,
        currency,
        shareType,
        tokensToTransfer,
      );
    } else {
      await emailController.sharesTransferredNonBlockchain(
        investor,
        currency,
        shareType,
        tokensToTransfer,
      );
      await emailController.sharesTransferredAdmin(investor, shareType, alert);
    }
  }

  /**
   *
   * @param entityOrder 2 arguments representing from whom to whom the transfer is made
   */
  private async log(...entityOrder: Entity[]): Promise<void> {
    const {
      adminID: userID,
      shareTypeID,
      tokensToTransfer,
      investorID,
      stoID,
      remain,
      custodianRemain,
    } = this;

    const shares = await Shares.findOneOrFail(
      { investorID, stoID, shareTypeID },
      { relations: ['shareType'] },
    );

    // Replace investor with investor id:${investorID}
    const entityStr = entityOrder.map((e) => (e === 'investor' ? `${e} id:${investorID}` : e));
    // If no adminID, assume API action
    const actor = userID ? `admin id:${userID}` : `API`;
    const custodianBalance = entityOrder.some((e) => e === 'custodian')
      ? ` ${custodianRemain} custodian shares remain.`
      : ``;
    const companyBalance = entityOrder.some((e) => e === 'company')
      ? ` ${remain} company shares remain.`
      : ``;

    const description = `Transferred ${tokensToTransfer} shares of type id:${shareTypeID} from ${entityStr[0]} to ${entityStr[1]} in sto id:${stoID} by ${actor}.${companyBalance}${custodianBalance}`;
    await Log.createLog({
      userID,
      investorID,
      description,
      stoID,
      activityType: 5,
      printLog: this.options?.printLog,
    });
    const investmentRecord = Investments.create({
      stoID,
      userID,
      sharetypeid: shareTypeID,
      currencyID: (await shares.shareType).currencyID,
      tokens: tokensToTransfer,
      date: new Date().toISOString().substring(0, 10),
      amount: this.investment,
      description: this.investmentDescription,
      investorID,
    });
    investmentRecord.save();
  }
}

export default ShareTransferService;
