import type { FEE_BENEFICIARY } from "../enums";
import type { FEE_TYPE } from "../enums";
import type { COMMISSION_TYPE } from "../enums";

/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type FeeInput = {
  readonly stoID: number;
  readonly beneficiary: FEE_BENEFICIARY;
  readonly type: FEE_TYPE;
  readonly amount: number;
  readonly status: COMMISSION_TYPE;
};
