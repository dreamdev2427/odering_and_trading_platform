import { ATOMIC_SWAP_STATUS, ExchangeOffer, ExchangeOrder } from 'entities/exchange';

const updateExchangeOrderStatus = async (
  atomicSwapCurrentStatus: ATOMIC_SWAP_STATUS,
  userID: number,
  orderID: number,
): Promise<boolean> => {
  const order = await ExchangeOrder.findOneOrFail({ ID: orderID });
  const offer = await ExchangeOffer.findOneOrFail({ ID: order.atomicSwapExchangeOffersID });
  if (atomicSwapCurrentStatus === ATOMIC_SWAP_STATUS.SELLER_COMMITTED) {
    await ExchangeOrder.update({ ID: orderID, investorID: userID }, { atomicSwapCurrentStatus });
    return true;
  }
  if (atomicSwapCurrentStatus === ATOMIC_SWAP_STATUS.BUYER_COMMITTED) {
    if (offer.investorID === userID) {
      await ExchangeOrder.update({ ID: orderID }, { atomicSwapCurrentStatus });
      return true;
    }
    throw new Error();
  }
  if (atomicSwapCurrentStatus === ATOMIC_SWAP_STATUS.PROCESSED) {
    if (order.atomicSwapCurrentStatus === ATOMIC_SWAP_STATUS.BUYER_COMPLETED) {
      await ExchangeOrder.update({ ID: orderID, investorID: userID }, { atomicSwapCurrentStatus });
      return true;
    }
    throw new Error();
  }
  if (atomicSwapCurrentStatus === ATOMIC_SWAP_STATUS.UNSUCCESSFUL) {
    const currentDate = new Date().toISOString().slice(0, 10);
    const swapInProgress = [
      ATOMIC_SWAP_STATUS.NOT_INITIALIZED,
      ATOMIC_SWAP_STATUS.ACCEPTED,
      ATOMIC_SWAP_STATUS.SELLER_COMMITTED,
      ATOMIC_SWAP_STATUS.SELLER_SENT,
      ATOMIC_SWAP_STATUS.BUYER_COMMITTED,
    ].includes(order.atomicSwapCurrentStatus);
    if (currentDate > order.dateTo && swapInProgress) {
      await ExchangeOrder.update({ ID: orderID, investorID: userID }, { atomicSwapCurrentStatus });
      return true;
    }
    throw new Error();
  }
  throw new Error();
};

export default updateExchangeOrderStatus;
