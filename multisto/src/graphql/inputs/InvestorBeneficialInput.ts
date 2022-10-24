/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type InvestorBeneficialInput = {
  readonly ID: number;
  readonly beneficialFirstName: string;
  readonly beneficialLastName: string;
  readonly beneficialAddress: string;
  readonly beneficialCity: string;
  readonly beneficialCountry: string;
  readonly beneficialEmail: string;
  readonly beneficialBirth: string;
  readonly beneficialNationality: string;
};
