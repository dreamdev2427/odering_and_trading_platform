/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type InvestorUsufructuaryInput = {
  readonly ID: number;
  readonly isUsufructuary: number;
  readonly usufructuaryFirstName: string;
  readonly usufructuaryLastName: string;
  readonly usufructuaryAddress: string;
  readonly usufructuaryCity: string;
  readonly usufructuaryCountry: string;
  readonly usufructuaryEmail: string;
};
