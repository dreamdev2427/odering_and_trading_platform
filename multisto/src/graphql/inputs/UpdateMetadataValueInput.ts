/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type UpdateMetadataValueInput = {
  readonly key: string;
  readonly value: string;
  readonly stoID: number;
};
