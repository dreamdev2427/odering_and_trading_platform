/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type SetPasswordInput = {
  readonly token: string;
  readonly password: string;
};
