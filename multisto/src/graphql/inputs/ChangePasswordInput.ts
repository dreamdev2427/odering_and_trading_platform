/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type ChangePasswordInput = {
  readonly oldPassword: string;
  readonly newPassword: string;
  readonly repeatPassword: string;
};
