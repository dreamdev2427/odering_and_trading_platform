/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type VerifyCryptoReciepeInput = {
  readonly transactionHash: string;
  readonly details: string;
  readonly currencyID: number;
  readonly amount: number;
  readonly channelID: number;
  readonly stoID: number;
};
