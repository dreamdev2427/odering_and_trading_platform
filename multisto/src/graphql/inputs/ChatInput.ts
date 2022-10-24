import type { SENDER_TYPE } from "../enums";
import type { RECEIVER_TYPE } from "../enums";
import type { MESSAGE_TYPE } from "../enums";
import type { CHAT_CONTEXT } from "../enums";

/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type ChatInput = {
  readonly sender: SENDER_TYPE;
  readonly receiver: RECEIVER_TYPE;
  readonly investorID: number;
  readonly adminID: number;
  readonly stoID: number;
  readonly message: string;
  readonly type?: MESSAGE_TYPE;
  readonly dateSent?: number;
  readonly location?: string;
  readonly context?: CHAT_CONTEXT;
  readonly contextID?: number;
  readonly contextReceiverID?: number;
};
