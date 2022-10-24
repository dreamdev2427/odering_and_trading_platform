/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type InvestorProfileInput = {
  readonly firstName: string;
  readonly lastName: string;
  readonly address: string;
  readonly zip: string;
  readonly town: string;
  readonly state: string;
  readonly country: string;
  readonly phone: string;
  readonly passportNumber: string;
  readonly nationalID: string;
  readonly driversLicenseID: string;
  readonly birthDate: string;
  readonly kinname?: string;
  readonly kinphone?: string;
  readonly kinemail?: string;
  readonly notes: string;
};
