export enum KYC_STATE {
  ABSENT = 'absent',
  SUBMITTED = 'submitted',
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
}
export enum KYC_OUTCOME {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  UNKNOWN = 'unknown',
}
export interface KycDto {
  state: KYC_STATE;
  outcome: KYC_OUTCOME;
}
export interface ProfileDto {
  id: string;
  name: string;
  kyc: KycDto;
  accounts: AccountDto[];
}
export interface AccountDto {
  address: string;
  currency: string;
  standard?: string;
  [standardKey: string]: string;
}
