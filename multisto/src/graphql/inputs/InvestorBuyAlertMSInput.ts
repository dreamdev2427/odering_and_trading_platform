import type { BuyAlertStatus } from "../enums";

/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type InvestorBuyAlertMSInput = {
  readonly stoID: number;
  readonly shareTypeID: number;
  readonly shares: number;
  readonly details?: string;
  readonly publicKey?: string;
  readonly status?: BuyAlertStatus;
  readonly isHiddenForInvestor?: boolean;
  readonly isSellBackRequest?: boolean;
  readonly entityID: number;
};
