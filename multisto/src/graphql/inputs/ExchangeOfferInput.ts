/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type ExchangeOfferInput = {
  readonly exchangeOrderID: number;
  readonly sharesPartial: number;
  readonly rateFrom: number;
  readonly description?: string;
  readonly atomicBuyerPublicKey: string;
};
