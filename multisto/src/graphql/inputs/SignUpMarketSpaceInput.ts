/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type SignUpMarketSpaceInput = {
  readonly firstName: string;
  readonly lastName: string;
  readonly companyName?: string;
  readonly password: string;
  readonly email: string;
  readonly stoID: number;
  readonly investorType: number;
  readonly brokerID?: string;
  readonly referredBy?: string;
  readonly referredByID?: number;
  readonly phone: string;
  readonly address: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
  readonly country: string;
};
