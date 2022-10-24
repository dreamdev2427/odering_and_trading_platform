import type { PAYMENT_STATUS } from "../enums";
import type { BROKER_TYPE } from "../enums";

/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type FeeCommissionInput = {
  readonly feeID: number;
  readonly amount: number;
  readonly transactionID: number;
  readonly beneficiaryID: number;
  readonly dateEarned?: number;
  readonly status?: PAYMENT_STATUS;
  readonly beneficiaryType?: BROKER_TYPE;
};
