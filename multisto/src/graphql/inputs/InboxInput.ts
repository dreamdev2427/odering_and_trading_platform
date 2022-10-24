/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type InboxInput = {
  readonly stoID: number;
  readonly title: string;
  readonly content: string;
};
