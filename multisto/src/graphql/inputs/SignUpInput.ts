/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type SignUpInput = {
  readonly firstName: string;
  readonly lastName: string;
  readonly companyName?: string;
  readonly password: string;
  readonly email: string;
  readonly stoID: number;
  readonly investorType: number;
  readonly brokerID?: string;
};
