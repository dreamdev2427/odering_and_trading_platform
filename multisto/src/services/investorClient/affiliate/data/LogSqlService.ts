import mysql from "../../../../modules/mysql";
import ILogService from "./ILogService";

export default class LogSqlService implements ILogService {
  // eslint-disable-next-line class-methods-use-this
  async logActivity(
    userId: number,
    description: string,
    investorId: number,
    activityType: number,
    stoId: number
  ): Promise<void> {
    const sql = `INSERT INTO
            logs(UserID, LogDate, Description, InvestorID, ActivityType, stoid, recid)
            VALUES(?, NOW(), ?, ?, ?, ?, -1);`;

    await mysql.executeSQLStatement(sql, [
      userId,
      description,
      investorId,
      activityType,
      stoId,
    ]);
  }
}
