import { ValidationError } from 'apollo-server-core';

import { ExchangeOfferInput } from 'api/exchange/exchange-offer.types';
import { ExchangeOffer, ExchangeOrder, Shares, SharesWallet } from 'entities';
import { EXCHANGE_TYPE } from 'entities/exchange';

const createExchangeOffer = async (
  data: ExchangeOfferInput,
  investorID: number,
): Promise<boolean> => {
  const order = await ExchangeOrder.findOneOrFail(data.exchangeOrderID);
  const shareType = await order.shareType;

  if (order.investorID === investorID) {
    throw new ValidationError("Can't make an offer to your own trades");
  }

  if (order.atomicSwapAcceptable && !data.atomicBuyerPublicKey) {
    throw new ValidationError('Wallet Not Set Up Properly');
  }

  if (data.sharesPartial > order.shares) {
    throw new ValidationError('Insufficient wallet funds');
  }

  if (!order.atomicSwapAcceptable && order.type === EXCHANGE_TYPE.BUY) {
    const investorShares = shareType.isBlockchain
      ? await SharesWallet.findOneOrFail({
          shareTypeID: shareType.ID,
          investorID,
          publicKey: 'platform',
        })
      : await Shares.findOneOrFail({ investorID, stoID: order.stoID, shareTypeID: shareType.ID });
    if (data.sharesPartial > (investorShares?.shares || 0)) {
      throw new ValidationError('Insufficient on chain funds');
    }
  }

  const newOffer = ExchangeOffer.create({
    investorID,
    rateTo: 0,
    stoID: shareType.stoID,
    ...data,
  });
  await newOffer.save();

  return true;
};

export default createExchangeOffer;
