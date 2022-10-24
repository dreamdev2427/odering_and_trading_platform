/* eslint-disable */
import { SentToAllMessages } from "../../../Schema";

export enum SENDER_TYPE {
  Admin = "ADMIN",
  Platform = "PLATFORM",
}

export default interface ISentToAllMessageService {
  /**
   * Get Message By ID
   * @param ID - number
   */
  getByID(ID: number): Promise<SentToAllMessages>;

  /**
   * Get Sent-To-All Messages List
   * @param sender - SENDER_TYPE
   * @param stoID - number
   */
  getMessagesList(
    sender: SENDER_TYPE,
    stoID: number
  ): Promise<SentToAllMessages[]>;

  /**
   * Insert Into SentToAllMessages Table
   * @param sender - SENDER_TYPE
   * @param adminID - number
   * @param stoID - number
   * @param message - string
   */
  insertOne(
    sender: SENDER_TYPE,
    adminID: number,
    stoID: number,
    message: string
  ): Promise<void>;
}
