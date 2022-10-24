/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type BlockchainSharesTransferTransactionsInput = {
  readonly toAddress: string;
  readonly stoID?: number;
  readonly adminID: number;
  readonly investorID?: number;
  readonly shareTypeID: number;
  readonly amountToSend: number;
  readonly investmentDetails?: string;
  readonly investmentAmount: number;
  readonly reduceInvestorBalance: number;
  readonly status: number;
  readonly recordDate: string;
};
