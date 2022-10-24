/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type TransferShareInput = {
  readonly stoID: number;
  readonly investorID: number;
  readonly shareTypeID: number;
  readonly tokensToTransfer: number;
  readonly investment: number;
  readonly investmentDescription: string;
  readonly certificateNos?: string;
  readonly shareNos?: string;
  readonly token?: string;
};
