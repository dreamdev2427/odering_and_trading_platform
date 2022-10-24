/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type InvestorBankAccountInput = {
  readonly accountTitle: string;
  readonly accountNo: string;
  readonly routingNumber: string;
  readonly iban: string;
  readonly accountHolderName: string;
  readonly accountHolderCity: string;
  readonly accountHolderCountry: string;
  readonly accountHolderAddress: string;
  readonly accountPostalCode: string;
  readonly bankName: string;
  readonly bankCity: string;
  readonly bankCountry: string;
  readonly bankAddress: string;
  readonly swift: string;
};
