/* eslint-disable */
import { Chats } from "../../../Schema";

export enum SENDER_TYPE {
  Investor = "INVESTOR",
  Admin = "ADMIN",
  Platform = "PLATFORM",
}

export enum RECEIVER_TYPE {
  Investor = "INVESTOR",
  Admin = "ADMIN",
  Platform = "PLATFORM",
}

export enum MESSAGE_TYPE {
  Message = "MESSAGE",
  File = "FILE",
}

export interface ReceiverID {
  investorid: number;
}

export default interface IChatService {
  /**
   * Get Chat By ID
   * @param ID - number
   */
  getByID(ID: number): Promise<Chats>;

  /**
   * Get Chat List
   * @param stoID - number
   */
  getChatList(stoID: number): Promise<Chats[]>;

  /**
   * Get Customer Support's Chat List
   */
  getCustomerSupportChatList(): Promise<Chats[]>;

  /**
   * Get Chat History
   * @param stoID - number
   * @param investorID - number
   */
  getChatHistory(stoID: number, investorID: number): Promise<Chats[]>;

  /**
   * Get Customer Support's Chat History
   * @param investorID - number
   */
  getCustomerSupportChatHistory(investorID: number): Promise<Chats[]>;

  /**
   * Get Unread Messages Count
   * @param stoID - number
   */
  getUnreadMessagesCount(stoID: number): Promise<number>;

  /**
   * Get Customer Support's Unread Messages Count
   */
  getCustomerSupportUnreadMessagesCount(): Promise<number>;

  /**
   * Get All Receivers' IDs of an STO or Platform
   * @param stoID - number
   */
  getReceiverIDs(stoID?: number): Promise<ReceiverID[]>;

  /**
   * Insert Into Chats Table
   * @param sender - SENDER_TYPE
   * @param receiver - RECEIVER_TYPE
   * @param investorID - number
   * @param adminID - number
   * @param stoID - number
   * @param message - string
   * @param type - MESSAGE_TYPE
   * @param location - string
   */
  insertOne(
    sender: SENDER_TYPE,
    receiver: RECEIVER_TYPE,
    investorID: number,
    adminID: number,
    stoID: number,
    message: string,
    type?: MESSAGE_TYPE,
    location?: string
  ): Promise<void>;

  /**
   * Update Chats To Seen Status
   * @param stoID - number
   * @param investorID - number
   */
  updateToSeen(stoID: number, investorID: number): Promise<void>;

  /**
   * Update Customer Support's Chats To Seen Status
   * @param investorID - number
   */
  updateCustomerSupportToSeen(investorID: number): Promise<void>;

  /**
   * Delete One Chat Record
   * @param ID - number
   */
  deleteOne(ID: number): Promise<void>;

  /**
   * Delete One Chat Record Permanently
   * @param ID - number
   */
  deleteOnePermanently(ID: number): Promise<void>;

  /**
   * Delete Chat History
   * @param stoID - number
   * @param investorID - number
   */
  deleteChatHistory(stoID: number, investorID: number): Promise<void>;

  /**
   * Delete Customer Support's Chat History
   * @param investorID - number
   */
  deleteCustomerSupportChatHistory(investorID: number): Promise<void>;

  /**
   * Delete Chat History Permanently
   * @param stoID - number
   * @param investorID - number
   */
  deleteChatHistoryPermanently(
    stoID: number,
    investorID: number
  ): Promise<void>;

  /**
   * Delete Customer Support's Chat History Permanently
   * @param investorID - number
   */
  deleteCustomerSupportChatHistoryPermanently(
    investorID: number
  ): Promise<void>;

  /**
   * Delete Chat List
   * @param stoID - number
   */
  deleteChatList(stoID: number): Promise<void>;

  /**
   * Delete Customer Support's Chat List
   */
  deleteCustomerSupportChatList(): Promise<void>;

  /**
   * Delete Chat List Permanently
   * @param stoID - number
   */
  deleteChatListPermanently(stoID: number): Promise<void>;

  /**
   * Delete Customer Support's Chat List Permanently
   */
  deleteCustomerSupportChatListPermanently(): Promise<void>;
}
