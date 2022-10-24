/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type MoonpayStoWalletInput = {
  readonly stoID: number;
  readonly walletAddress: string;
  readonly walletAddressTag?: string;
};
