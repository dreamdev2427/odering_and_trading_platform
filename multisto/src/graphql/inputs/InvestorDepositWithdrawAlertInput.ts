/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type InvestorDepositWithdrawAlertInput = {
  readonly stoID: number;
  readonly channelID: number;
  readonly amount: number;
  readonly isWithdrawRequest: boolean;
  readonly details?: string;
  readonly bankName?: string;
  readonly swiftCode?: string;
  readonly bankAccount?: string;
  readonly transactionID?: string;
  readonly buyAlertID?: number;
};
