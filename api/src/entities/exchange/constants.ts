import { registerEnumType } from 'type-graphql';

export enum EXCHANGE_TYPE {
  SELL = 1,
  BUY = 2,
}

export enum ATOMIC_SWAP_STATUS {
  // 0 = swap has not been initiated
  NOT_INITIALIZED,
  // 1 = Atomic Swap has been accepted by seller
  ACCEPTED,
  // 2 = Seller has committed his shares for transfer in swap contract
  SELLER_COMMITTED,
  // 3 = Seller has sent his tokens to swap contract
  SELLER_SENT,
  // 4 = Buyer has committed his tokens for transfers in swap contract
  BUYER_COMMITTED,
  // 5 = Buyer completed Swap
  BUYER_COMPLETED,
  // 6 = Swap was not successful and tokens given back to investor
  UNSUCCESSFUL,
  // 7 = Swap was already processed
  PROCESSED,
}

registerEnumType(EXCHANGE_TYPE, {
  name: 'ExchangeType',
  description: 'Types of exchange operations',
});

registerEnumType(ATOMIC_SWAP_STATUS, {
  name: 'AtomicSwapStatus',
  description: 'Statuses of atomic swap operations',
});
