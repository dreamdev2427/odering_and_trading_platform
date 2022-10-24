import type { InvestingEntityMemberRoles } from "../enums";

/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type InvestingEntityMemberInput = {
  readonly entityID: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: InvestingEntityMemberRoles;
  readonly signatory: boolean;
  readonly email: string;
};
