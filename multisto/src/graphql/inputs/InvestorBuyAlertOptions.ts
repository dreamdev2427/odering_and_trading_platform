/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type InvestorBuyAlertOptions = {
  readonly ignoreWalletBalance?: boolean;
  readonly ignoreAllPreviousRequests?: boolean;
  readonly ignoreSignatures?: boolean;
  readonly ignoreEntity?: boolean;
};
