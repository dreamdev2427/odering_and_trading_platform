import { ValidationError } from 'apollo-server-core';
import * as math from 'mathjs';

import { ExchangeOffer, ExchangeOrder, Shares, SharesWallet, ShareTypes } from 'entities';
import { ATOMIC_SWAP_STATUS, EXCHANGE_TYPE } from 'entities/exchange';

class BlockchainAtomicSwap {
  currentInvestorID: number;

  currentInvestorWalletAddress: string;

  orderID: number;

  orderInvestorID: number;

  offerInvestorID: number;

  offer: ExchangeOffer;

  order: ExchangeOrder;

  shareType: ShareTypes;

  buyerShare: Shares;

  sellerShare: Shares;

  buyerWallet: SharesWallet;

  sellerWallet: SharesWallet;

  buyerWalletAddress: string;

  sellerWalletAddress: string;

  constructor(userID: number, walletAddress: string, orderID: number) {
    this.currentInvestorID = userID;
    this.currentInvestorWalletAddress = walletAddress;
    this.orderID = orderID;
  }

  private async fetchData() {
    this.order = await ExchangeOrder.findOneOrFail(this.orderID);
    this.offer = await ExchangeOffer.findOneOrFail(this.order.atomicSwapExchangeOffersID);

    /* When atomicSwapCurrentStatus should be changed to ATOMIC_SWAP_STATUS.PROCESSED ?? */
    if (this.order.atomicSwapCurrentStatus === ATOMIC_SWAP_STATUS.PROCESSED) {
      throw new ValidationError('Atomic Swap Was Already Processed Once');
    }

    if (this.order.type === EXCHANGE_TYPE.SELL) {
      this.orderInvestorID = this.order.investorID;
      this.offerInvestorID = this.offer.investorID;
    }
    if (this.order.type === EXCHANGE_TYPE.BUY) {
      this.orderInvestorID = this.offer.investorID;
      this.offerInvestorID = this.order.investorID;
    }

    this.shareType = await this.order.shareType;
  }

  private async checkShares(): Promise<void> {
    this.sellerShare = await Shares.findOneOrFail({
      investorID: this.orderInvestorID,
      shareTypeID: this.shareType.ID,
    });

    if (this.sellerShare.shares < this.offer.sharesPartial) {
      throw new ValidationError('Swap cannot proceed, Seller has insufficient shares');
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

    if (this.order.type === EXCHANGE_TYPE.SELL) {
      if (this.currentInvestorID === this.orderInvestorID) {
        this.sellerWalletAddress = this.currentInvestorWalletAddress;
        this.buyerWalletAddress = this.offer.atomicBuyerPublicKey || '';
      }
      if (this.currentInvestorID === this.offerInvestorID) {
        const sellerWallet = await SharesWallet.findOneOrFail(this.order.atomicSwapSharesWalletID);
        this.sellerWalletAddress = sellerWallet.publicKey || '';
        this.buyerWalletAddress = this.currentInvestorWalletAddress;
      }
    }

    if (this.order.type === EXCHANGE_TYPE.BUY) {
      if (this.currentInvestorID === this.orderInvestorID) {
        this.buyerWalletAddress = this.currentInvestorWalletAddress;
        this.sellerWalletAddress = this.offer.atomicBuyerPublicKey || '';
      }
      if (this.currentInvestorID === this.offerInvestorID) {
        const buyerWallet = await SharesWallet.findOneOrFail(this.order.atomicSwapSharesWalletID);
        this.buyerWalletAddress = buyerWallet.publicKey || '';
        this.sellerWalletAddress = this.currentInvestorWalletAddress;
      }
    }

    this.sellerWallet = await SharesWallet.findOneOrFail({
      shareTypeID: this.shareType.ID,
      investorID: this.orderInvestorID,
      publicKey: this.sellerWalletAddress,
    });

    if ((this.sellerWallet.shares || 0) < this.offer.sharesPartial) {
      throw new ValidationError('Swap cannot proceed, Seller has insufficient shares');
    }

    const wallet = await SharesWallet.findOne({
      shareTypeID: this.shareType.ID,
      investorID: this.offerInvestorID,
      publicKey: this.buyerWalletAddress,
    });

    if (wallet) {
      this.buyerWallet = wallet;
      return;
    }

    this.buyerWallet = SharesWallet.create({
      investorID: this.offerInvestorID,
      shareTypeID: this.shareType.ID,
      shares: 0,
      publicKey: this.buyerWalletAddress,
      isBlocked: false,
    });

    await this.buyerWallet.save();
  }

  private async swap(): Promise<void> {
    const add = (one: number, two: number) =>
      math.number(math.add(math.bignumber(one), math.bignumber(two)) as unknown as number) as number;
    const subtract = (one: number, two: number) => math.subtract(one, two);

    if (this.currentInvestorID === this.buyerShare.investorID) {
      await Shares.update(this.buyerShare.ID, {
        shares: add(this.buyerShare.shares, this.offer.sharesPartial),
      });
    }

    if (this.currentInvestorID === this.sellerShare.investorID) {
      await Shares.update(this.sellerShare.ID, {
        shares: subtract(this.sellerShare.shares, this.offer.sharesPartial),
      });
    }

    if (!this.shareType.isBlockchain) {
      return;
    }

    if (this.currentInvestorID === this.buyerWallet.investorID) {
      await SharesWallet.update(this.buyerWallet.ID, {
        shares: add(this.buyerWallet.shares, this.offer.sharesPartial),
      });
    }

    if (this.currentInvestorID === this.sellerWallet.investorID) {
      await SharesWallet.update(this.sellerWallet.ID, {
        shares: subtract(this.sellerWallet.shares, this.offer.sharesPartial),
      });
    }
  }

  private async updateExchangeOrderStatus(): Promise<void> {
    /* Check to see that the current user is the order creator */
    if (this.currentInvestorID === this.orderInvestorID) {
      this.order.atomicSwapCurrentStatus = ATOMIC_SWAP_STATUS.SELLER_SENT;
    }

    /* Check to see that the current user is the offer creator */
    if (this.currentInvestorID === this.offerInvestorID) {
      this.order.atomicSwapCurrentStatus = ATOMIC_SWAP_STATUS.BUYER_COMPLETED;
    }

    await this.order.save();
  }

  async accept(): Promise<boolean> {
    await this.fetchData();
    await this.checkShares();
    await this.checkWallet();
    await this.swap();
    await this.updateExchangeOrderStatus();

    return true;
  }
}

export default BlockchainAtomicSwap;
