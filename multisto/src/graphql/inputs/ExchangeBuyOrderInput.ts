/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type ExchangeBuyOrderInput = {
  readonly dateFrom?: string;
  readonly dateTo?: string;
  readonly shareTypeID: number;
  readonly shares: number;
  readonly rateFrom: number;
};
