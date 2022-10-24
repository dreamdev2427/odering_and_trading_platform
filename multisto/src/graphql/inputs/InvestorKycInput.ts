/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type InvestorKycInput = {
  readonly investorID: number;
  readonly status: number;
  readonly isKyc: boolean;
  readonly kycApplied: boolean;
};
