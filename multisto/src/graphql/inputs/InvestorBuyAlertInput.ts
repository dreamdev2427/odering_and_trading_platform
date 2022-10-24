import type { BuyAlertStatus } from "../enums";

/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type InvestorBuyAlertInput = {
  readonly stoID: number;
  readonly shareTypeID: number;
  readonly shares: number;
  readonly details?: string;
  readonly publicKey?: string;
  readonly status?: BuyAlertStatus;
  readonly isHiddenForInvestor?: boolean;
  readonly isSellBackRequest?: boolean;
};
