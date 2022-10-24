import { SentToAllMessages } from "../../../Schema";
import AbstractSqlService from "../../generic/AbstractSqlService";
import ISentToAllMessageService, {
  SENDER_TYPE,
} from "./ISentToAllMessageService";

export default class SentToAllMessageSqlService
  extends AbstractSqlService
  implements ISentToAllMessageService
{
  async getByID(ID: number): Promise<SentToAllMessages> {
    const [result] = await this.runSql(
      `SELECT * FROM sent_to_all_messages WHERE ID = ?`,
      ID
    );
    return result;
  }

  async getMessagesList(
    sender: SENDER_TYPE,
    stoID: number
  ): Promise<SentToAllMessages[]> {
    return this.runSql(
      `SELECT A.ID, A.adminID, A.stoID, A.message, 
        DATE_FORMAT(A.dateSent,'%M %d %Y %H:%i:%s') AS DATE_SENT, 
        CONCAT(C.FirstName, ' ', C.LastName) AS FULL_NAME 
        FROM sent_to_all_messages A INNER JOIN users C ON A.adminID = C.ID WHERE A.sender = ? AND A.stoID = ? 
      `,
      [sender, stoID]
    );
  }

  async insertOne(
    sender: SENDER_TYPE,
    adminID: number,
    stoID: number,
    message: string
  ): Promise<void> {
    const sql = `INSERT INTO sent_to_all_messages (sender, adminID, stoID, message) 
                 VALUES (?, ?, ?, ?)`;
    return this.runSql(sql, [sender, adminID, stoID, message]);
  }
}
