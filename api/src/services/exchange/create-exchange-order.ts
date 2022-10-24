import { ValidationError } from 'apollo-server-core';
import { Not } from 'typeorm';

import { ExchangeOrder, ShareTypes, SharesWallet, Shares } from 'entities';
import { ExchangeBuyOrderInput, ExchangeSellOrderInput } from 'api/exchange/exchange-order.types';
import { ATOMIC_SWAP_STATUS, EXCHANGE_TYPE } from 'entities/exchange';

type DataType = ExchangeBuyOrderInput | ExchangeSellOrderInput

const checkSellOrder = async (data: ExchangeSellOrderInput, investorID: number) => {
  if (data.atomicSwapSharesWalletID) {
    const wallet = await SharesWallet.findOneOrFail(data.atomicSwapSharesWalletID);
    if (wallet.shares < data.shares) {
      throw new ValidationError('Not enough shares to sell');
    }
  } else {
    const share = await Shares.findOneOrFail({ investorID, shareTypeID: data.shareTypeID })
    const list = await SharesWallet.find({
      shareTypeID: data.shareTypeID,
      investorID,
      publicKey: Not('platform'),
    });

    const shareWalletSum = list.reduce((sum, next) => sum + (next.shares || 0), 0);
    const availableShare = share.shares - shareWalletSum;
    if (availableShare < data.shares) {
      throw new ValidationError('Not enough shares to sell');
    }
  }
}

const createExchangeOrder = async (data: DataType, investorID: number, type: EXCHANGE_TYPE): Promise<boolean> => {
  const shareType = await ShareTypes.findOneOrFail(data.shareTypeID);

  if (type === EXCHANGE_TYPE.SELL && data instanceof ExchangeSellOrderInput) {
   await checkSellOrder(data, investorID);
  }

  const order = ExchangeOrder.create({
    investorID,
    description: '',
    type,
    rateTo: 1,
    atomicSwapCurrentStatus: ATOMIC_SWAP_STATUS.NOT_INITIALIZED,
    atomicSwapAcceptable: false,
    atomicSwapSharesWalletID: 0,
    stoID: shareType.stoID,
    ...data,
  });

  // it wont be zero, bcs spread replace it
  if (order.atomicSwapSharesWalletID) {
    order.atomicSwapExchangeOffersID = 0;
    order.atomicSwapAcceptable = true;
  }

  await order.save();
  return true;
};

export default createExchangeOrder;
