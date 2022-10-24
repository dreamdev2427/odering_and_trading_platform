import { ValidationError } from 'apollo-server-core';
import * as math from 'mathjs';

import {
  ExchangeOffer,
  ExchangeOrder,
  InvestorBalancesInCompanyAccounts as Balances,
  InvestorDepositReceivedAlert as Deposit,
  Shares,
  SharesWallet,
  ShareTypes,
} from 'entities';
import { ATOMIC_SWAP_STATUS, EXCHANGE_TYPE } from 'entities/exchange';

class AtomicSwap {
  offerID: number;

  sellMessage: string;

  buyMessage: string;

  orderInvestorID: number;

  offerInvestorID: number;

  offer: ExchangeOffer;

  order: ExchangeOrder;

  shareType: ShareTypes;

  buyerBalance: Balances;

  sellerBalance: Balances;

  buyerShare: Shares;

  sellerShare: Shares;

  buyerWallet: SharesWallet;

  sellerWallet: SharesWallet;

  constructor(offerID: number) {
    this.offerID = offerID;
  }

  private async fetchData() {
    this.offer = await ExchangeOffer.findOneOrFail(this.offerID);
    this.order = await this.offer.exchangeOrder;

    if (this.order.atomicSwapCurrentStatus === ATOMIC_SWAP_STATUS.PROCESSED) {
      throw new ValidationError('Swap was already processed once');
    }

    this.sellMessage = 'Shares bought on the Exchange';
    this.buyMessage = 'Shares sold in Exchange';
    this.orderInvestorID = this.order.investorID;
    this.offerInvestorID = this.offer.investorID;
    // if the internal swap is a buy; then switch the investor Ids around as the setInternalSwap is implemented from the Sell POV
    if (this.order.type === EXCHANGE_TYPE.BUY) {
      this.sellMessage = 'Shares sold in Exchange';
      this.buyMessage = 'Shares bought on the Exchange';
      this.orderInvestorID = this.offer.investorID;
      this.offerInvestorID = this.order.investorID;
    }

    this.shareType = await this.order.shareType;
  }

  private async checkBalances(): Promise<void> {
    this.buyerBalance = await Balances.findOneOrFail({
      investorID: this.offerInvestorID,
      stoID: this.shareType.stoID,
      currencyID: this.shareType.currencyID,
    });

    if (this.buyerBalance.amount < this.offer.rateFrom) {
      throw new ValidationError('Swap cannot proceed, buyer has insufficient funds');
    }

    const balance = await Balances.findOne({
      investorID: this.orderInvestorID,
      stoID: this.shareType.stoID,
      currencyID: this.shareType.currencyID,
    });

    if (balance) {
      this.sellerBalance = balance;
      return;
    }

    this.sellerBalance = Balances.create({
      investorID: this.orderInvestorID,
      stoID: this.shareType.stoID,
      currencyID: this.shareType.currencyID,
      amount: 0,
    });

    await this.sellerBalance.save();
  }

  private async checkShares(): Promise<void> {
    this.sellerShare = await Shares.findOneOrFail({
      investorID: this.orderInvestorID,
      shareTypeID: this.shareType.ID,
    });

    if (this.sellerShare.shares < this.offer.sharesPartial) {
      throw new ValidationError('Swap cannot proceed, seller has insufficient shares');
    }

    const share = await Shares.findOne({
      investorID: this.offerInvestorID,
      shareTypeID: this.shareType.ID,
    });

    if (share) {
      this.buyerShare = share;
      return;
    }

    this.buyerShare = Shares.create({
      stoID: this.shareType.stoID,
      shareTypeID: this.shareType.ID,
      shares: 0,
      investorID: this.offerInvestorID,
      sharesHistoryID: 0,
    });

    await this.buyerShare.save();
  }

  private async checkWallet(): Promise<void> {
    if (!this.shareType.isBlockchain) {
      return;
    }

    this.sellerWallet = await SharesWallet.findOneOrFail({
      shareTypeID: this.shareType.ID,
      investorID: this.orderInvestorID,
      publicKey: 'platform',
    });

    if ((this.sellerWallet.shares || 0) < this.offer.sharesPartial) {
      throw new ValidationError('Swap cannot proceed, seller has insufficient shares');
    }

    const wallet = await SharesWallet.findOne({
      shareTypeID: this.shareType.ID,
      investorID: this.offerInvestorID,
      publicKey: 'platform',
    });

    if (wallet) {
      this.buyerWallet = wallet;
      return;
    }

    this.buyerWallet = SharesWallet.create({
      investorID: this.offerInvestorID,
      shareTypeID: this.shareType.ID,
      shares: 0,
      publicKey: 'platform',
      isBlocked: false,
    });
    await this.buyerWallet.save();
  }

  private async swap(): Promise<void> {
    const add = (one: number, two: number) =>
      math.number(math.add(math.bignumber(one), math.bignumber(two)) as unknown as number) as number;
    const subtract = (one: number, two: number) => math.subtract(one, two);

    this.sellerBalance.amount = add(this.sellerBalance.amount, this.offer.rateFrom);
    await this.sellerBalance.save();

    this.buyerBalance.amount = subtract(this.buyerBalance.amount, this.offer.rateFrom);
    await this.buyerBalance.save();

    this.buyerShare.shares = add(this.buyerShare.shares, this.offer.sharesPartial);
    await this.buyerShare.save();

    this.sellerShare.shares = subtract(this.sellerShare.shares, this.offer.sharesPartial);
    await this.sellerShare.save();

    if (!this.shareType.isBlockchain) {
      return;
    }

    this.buyerWallet.shares = add(this.buyerWallet.shares, this.offer.sharesPartial);
    await this.buyerWallet.save();

    this.sellerWallet.shares = subtract(this.sellerWallet.shares, this.offer.sharesPartial);
    await this.sellerWallet.save();
  }

  private async createAlerts(): Promise<void> {
    const date = new Date().toISOString();
    const now = `${date.substring(0, 10)} ${date.substring(11, 19)}`;

    const alertData = {
      isApproved: 5,
      stoID: this.shareType.stoID,
      dateReceived: now,
      channelID: 0,
      amount: this.offer.rateFrom,
      details: this.sellMessage,
      dateApproved: now,
      approvedUserID: 0,
      currencyID: this.shareType.currencyID,
    };

    const sellerAlert = Deposit.create({
      ...alertData,
      investorID: this.orderInvestorID,
      details: this.sellMessage,
      balance: this.sellerBalance.amount,
    });

    await sellerAlert.save();

    const buyerAlert = Deposit.create({
      ...alertData,
      investorID: this.offerInvestorID,
      details: this.buyMessage,
      balance: this.buyerBalance.amount,
    });

    await buyerAlert.save();
  }

  async accept(): Promise<boolean> {
    await this.fetchData();
    await this.checkBalances();
    await this.checkShares();
    await this.checkWallet();

    await this.swap();

    this.order.atomicSwapCurrentStatus = ATOMIC_SWAP_STATUS.PROCESSED;
    await this.order.save();

    await this.createAlerts();

    return true;
  }
}

export default AtomicSwap;
