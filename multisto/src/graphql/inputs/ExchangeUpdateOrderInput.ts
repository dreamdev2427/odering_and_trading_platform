/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type ExchangeUpdateOrderInput = {
  readonly dateTo?: string;
  readonly rateFrom: number;
  readonly description?: string;
};
