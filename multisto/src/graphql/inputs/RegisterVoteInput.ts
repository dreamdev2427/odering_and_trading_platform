/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type RegisterVoteInput = {
  readonly type: number;
  readonly optionID: number;
  readonly meetingID: number;
  readonly vote: number;
};
