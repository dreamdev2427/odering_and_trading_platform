import crypto from 'crypto';

import { ExchangeOffer } from 'entities';
import { ATOMIC_SWAP_STATUS } from 'entities/exchange';

const startAtomicSwap = async (offerID: number): Promise<boolean> => {
  const offer = await ExchangeOffer.findOneOrFail(offerID);
  const order = await offer.exchangeOrder;

  order.atomicSwapCurrentStatus = ATOMIC_SWAP_STATUS.ACCEPTED;
  order.atomicSwapExchangeOffersID = offerID;

  await order.atomicSwapSharesWallet;
  await order.shareType;

  await order.save();

  offer.atomicSwapAccepted = true;
  offer.atomicSwapSecret = crypto.randomBytes(3).toString('hex');
  await offer.save();

  return true;
};

export default startAtomicSwap;
