/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type SignInSSOInput = {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
};
