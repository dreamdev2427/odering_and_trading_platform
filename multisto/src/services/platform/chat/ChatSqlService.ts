import { Chats } from "../../../Schema";
import AbstractSqlService from "../../generic/AbstractSqlService";
import IChatService, {
  MESSAGE_TYPE,
  SENDER_TYPE,
  RECEIVER_TYPE,
  ReceiverID,
} from "./IChatService";

export default class ChatSqlService
  extends AbstractSqlService
  implements IChatService {
  async getByID(ID: number): Promise<Chats> {
    const [result] = await this.runSql(`SELECT * FROM chats WHERE ID = ?`, ID);
    return result;
  }

  async getChatList(stoID: number): Promise<Chats[]> {
    return this.runSql(
      `SELECT A.ID, A.investorID, A.stoID, A.isRead, A.dateRead, 
        DATE_FORMAT(A.dateSent,'%M %d %Y %H:%i:%s') AS DATE_SENT, 
        CONCAT(C.FirstName, ' ', C.LastName) AS FULL_NAME 
        FROM chats A INNER JOIN investor C ON A.investorID = C.ID WHERE A.stoID = ? AND A.isDeleted = 0 AND A.receiver = "ADMIN" 
        AND A.dateSent = (SELECT MAX(B.dateSent) FROM chats B WHERE A.investorID = B.investorID AND B.sender = "INVESTOR" AND B.receiver = "ADMIN")`,
      [stoID]
    );
  }

  async getCustomerSupportChatList(): Promise<Chats[]> {
    return this.runSql(
      `SELECT A.ID, A.investorID, A.stoID, A.isRead, A.dateRead, 
        DATE_FORMAT(A.dateSent,'%M %d %Y %H:%i:%s') AS DATE_SENT, 
        CONCAT(C.FirstName, ' ', C.LastName) AS FULL_NAME 
        FROM chats A INNER JOIN investor C ON A.investorID = C.ID WHERE A.stoID = 0 AND A.isDeleted = 0 AND A.receiver = "PLATFORM" 
        AND A.dateSent = (SELECT MAX(B.dateSent) FROM chats B WHERE A.investorID = B.investorID AND B.sender = "INVESTOR" AND B.receiver = "PLATFORM")`
    );
  }

  async getChatHistory(stoID: number, investorID: number): Promise<Chats[]> {
    return this.runSql(
      `SELECT *, DATE_FORMAT(dateSent,'%M %d %Y %H:%i:%s') AS DATE_SENT, 
        (SELECT CONCAT(investor.FirstName, ' ', investor.LastName) FROM investor WHERE investor.ID = chats.investorID) AS INVESTOR_FULL_NAME, 
        (SELECT CONCAT(users.FirstName, ' ', users.LastName) FROM users WHERE users.ID = chats.adminID) AS ADMIN_FULL_NAME 
        FROM chats WHERE stoID = ? AND investorID = ? AND isDeleted = 0 AND context IS NULL AND sender IN ("INVESTOR" , "ADMIN") AND receiver IN ("INVESTOR" , "ADMIN")`,
      [stoID, investorID]
    );
  }

  async getCustomerSupportChatHistory(investorID: number): Promise<Chats[]> {
    return this.runSql(
      `SELECT *, DATE_FORMAT(dateSent,'%M %d %Y %H:%i:%s') AS DATE_SENT, 
      (SELECT CONCAT(investor.FirstName, ' ', investor.LastName) FROM investor WHERE investor.ID = chats.investorID) AS INVESTOR_FULL_NAME, 
      (SELECT CONCAT(users.FirstName, ' ', users.LastName) FROM users WHERE users.ID = chats.adminID) AS ADMIN_FULL_NAME 
      FROM chats WHERE stoID = 0 AND investorID = ? AND isDeleted = 0 AND context IS NULL AND sender IN ("INVESTOR" , "PLATFORM") AND receiver IN ("INVESTOR" , "PLATFORM")`,
      [investorID]
    );
  }

  async getUnreadMessagesCount(stoID: number): Promise<number> {
    const [result] = await this.runSql(
      `SELECT COUNT(*) AS COUNT FROM chats WHERE stoID = ? AND isDeleted = 0 
        AND sender = "INVESTOR" AND receiver = "ADMIN" AND isRead = 0`,
      stoID
    );
    return result;
  }

  async getCustomerSupportUnreadMessagesCount(): Promise<number> {
    const [result] = await this.runSql(
      `SELECT COUNT(*) AS COUNT FROM chats WHERE stoID = 0 AND isDeleted = 0 
        AND sender = "INVESTOR" AND receiver = "PLATFORM" AND isRead = 0`
    );
    return result;
  }

  async getReceiverIDs(stoID: number = 0): Promise<ReceiverID[]> {
    return this.runSql(`SELECT investorid FROM investorsto WHERE stoid = ?`, [
      stoID,
    ]);
  }

  async insertOne(
    sender: SENDER_TYPE,
    receiver: RECEIVER_TYPE,
    investorID: number,
    adminID: number,
    stoID: number,
    message: string,
    type?: MESSAGE_TYPE,
    location?: string
  ): Promise<void> {
    const sql = `INSERT INTO chats (sender, receiver, investorID, adminID, stoID, message, type, location) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    return this.runSql(sql, [
      sender,
      receiver,
      investorID,
      adminID,
      stoID,
      message,
      type,
      location,
    ]);
  }

  async updateToSeen(stoID: number, investorID: number): Promise<void> {
    const sql = `UPDATE chats SET isRead = 1, dateRead = NOW() WHERE stoID = ? 
                  AND investorID = ? AND isDeleted = 0 AND sender = "INVESTOR" 
                  AND receiver = "ADMIN" AND isRead = 0`;
    return this.runSql(sql, [stoID, investorID]);
  }

  async updateCustomerSupportToSeen(investorID: number): Promise<void> {
    const sql = `UPDATE chats SET isRead = 1, dateRead = NOW() WHERE stoID = 0 
                  AND investorID = ? AND isDeleted = 0 AND sender = "INVESTOR" 
                  AND receiver = "PLATFORM" AND isRead = 0`;
    return this.runSql(sql, [investorID]);
  }

  async deleteOne(ID: number): Promise<void> {
    const sql = `UPDATE chats SET isDeleted = 1 WHERE ID = ?`;
    return this.runSql(sql, ID);
  }

  async deleteOnePermanently(ID: number): Promise<void> {
    const sql = `DELETE FROM chats WHERE ID = ?`;
    return this.runSql(sql, ID);
  }

  async deleteChatHistory(stoID: number, investorID: number): Promise<void> {
    const sql = `UPDATE chats SET isDeleted = 1 WHERE stoID = ? AND investorID = ? AND context IS NULL 
                  AND sender IN ("INVESTOR" , "ADMIN") AND receiver IN ("INVESTOR" , "ADMIN")`;
    return this.runSql(sql, [stoID, investorID]);
  }

  async deleteCustomerSupportChatHistory(investorID: number): Promise<void> {
    const sql = `UPDATE chats SET isDeleted = 1 WHERE stoID = 0 AND investorID = ? AND context IS NULL 
                  AND sender IN ("INVESTOR" , "PLATFORM") AND receiver IN ("INVESTOR" , "PLATFORM")`;
    return this.runSql(sql, [investorID]);
  }

  async deleteChatHistoryPermanently(
    stoID: number,
    investorID: number
  ): Promise<void> {
    const sql = `DELETE FROM chats WHERE stoID = ? AND investorID = ? AND context IS NULL 
                  AND sender IN ("INVESTOR" , "ADMIN") AND receiver IN ("INVESTOR" , "ADMIN")`;
    return this.runSql(sql, [stoID, investorID]);
  }

  async deleteCustomerSupportChatHistoryPermanently(
    investorID: number
  ): Promise<void> {
    const sql = `DELETE FROM chats WHERE stoID = 0 AND investorID = ? AND context IS NULL 
                  AND sender IN ("INVESTOR" , "PLATFORM") AND receiver IN ("INVESTOR" , "PLATFORM")`;
    return this.runSql(sql, [investorID]);
  }

  async deleteChatList(stoID: number): Promise<void> {
    const sql = `UPDATE chats SET isDeleted = 1 WHERE stoID = ? AND context IS NULL 
                  AND sender IN ("INVESTOR" , "ADMIN") AND receiver IN ("INVESTOR" , "ADMIN")`;
    return this.runSql(sql, stoID);
  }

  async deleteCustomerSupportChatList(): Promise<void> {
    const sql = `UPDATE chats SET isDeleted = 1 WHERE stoID = 0 AND context IS NULL 
                  AND sender IN ("INVESTOR" , "PLATFORM") AND receiver IN ("INVESTOR" , "PLATFORM")`;
    return this.runSql(sql);
  }

  async deleteChatListPermanently(stoID: number): Promise<void> {
    const sql = `DELETE FROM chats WHERE stoID = ? AND context IS NULL 
                  AND sender IN ("INVESTOR" , "ADMIN") AND receiver IN ("INVESTOR" , "ADMIN")`;
    return this.runSql(sql, stoID);
  }

  async deleteCustomerSupportChatListPermanently(): Promise<void> {
    const sql = `DELETE FROM chats WHERE stoID = 0 AND context IS NULL 
                  AND sender IN ("INVESTOR" , "PLATFORM") AND receiver IN ("INVESTOR" , "PLATFORM")`;
    return this.runSql(sql);
  }
}
