import type { InvestingEntityPaymentMethods } from "../enums";

/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type InvestingEntityInput = {
  readonly typeID: number;
  readonly taxId: string;
  readonly name: string;
  readonly nickname?: string;
  readonly accredited: boolean;
  readonly paymentMethod: InvestingEntityPaymentMethods;
  readonly address: string;
  readonly city: string;
  readonly postalCode: string;
  readonly country: string;
  readonly state: string;
};
