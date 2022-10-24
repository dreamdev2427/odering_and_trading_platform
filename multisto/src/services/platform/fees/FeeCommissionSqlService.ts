/* eslint-disable */
import { FeeCommissions } from "../../../Schema";
import AbstractSqlService from "../../generic/AbstractSqlService";
import IFeeCommissionService, {
  Status,
  BROKER_TYPE,
} from "./IFeeCommissionService";

export default class FeeCommissionSqlService
  extends AbstractSqlService
  implements IFeeCommissionService {
  async getAll(): Promise<FeeCommissions[]> {
    const sql = `SELECT * FROM fee_commissions`;
    const result = await this.runSql(sql);
    return result;
  }

  async getAllCommissions(): Promise<FeeCommissions[]> {
    const sql = `
      SELECT A.ID, A.feeID, A.amount, DATE_FORMAT(A.dateEarned,'%M %d %Y %H:%i') AS dateEarned, A.status, A.beneficiaryType, B.FirstName, B.LastName, B.email 
      FROM fee_commissions A INNER JOIN brokers B ON A.beneficiaryID = B.ID WHERE A.beneficiaryType = "BROKER"
      UNION ALL
      SELECT A.ID, A.feeID, A.amount, DATE_FORMAT(A.dateEarned,'%M %d %Y %H:%i') AS dateEarned, A.status, A.beneficiaryType, B.FirstName, B.LastName, B.email 
      FROM fee_commissions A INNER JOIN investor B ON A.beneficiaryID = B.ID WHERE A.beneficiaryType = "INVESTOR"`;
    const result = await this.runSql(sql);
    return result;
  }

  async getBrokerCommissions(beneficiaryID: number): Promise<FeeCommissions[]> {
    const sql = `
      SELECT A.ID, A.feeID, A.amount, DATE_FORMAT(A.dateEarned,'%M %d %Y %H:%i') AS dateEarned, A.status 
      FROM fee_commissions A INNER JOIN brokers B ON A.beneficiaryID = B.ID WHERE A.beneficiaryID = ? AND A.beneficiaryType = "BROKER"`;
    const result = await this.runSql(sql, [beneficiaryID]);
    return result;
  }

  async getByID(ID: number): Promise<FeeCommissions> {
    const sql = `SELECT * FROM fee_commissions WHERE ID = ?`;
    const [result] = await this.runSql(sql, [ID]);
    return result;
  }

  async getByFeeID(feeID: number): Promise<FeeCommissions[]> {
    const sql = `SELECT * FROM fee_commissions WHERE feeID = ?`;
    const result = await this.runSql(sql, [feeID]);
    return result;
  }

  async getByTransactionID(transactionID: number): Promise<FeeCommissions[]> {
    const sql = `SELECT * FROM fee_commissions WHERE transactionID = ?`;
    const result = await this.runSql(sql, [transactionID]);
    return result;
  }

  async getByBeneficiaryID(
    beneficiaryID: number,
    beneficiaryType?: BROKER_TYPE
  ): Promise<FeeCommissions[]> {
    let sql = `SELECT * FROM fee_commissions WHERE beneficiaryID = ?`;
    const data: any = [beneficiaryID];
    if (beneficiaryType) {
      sql += ` AND beneficiaryType = ?`;
      data.push(beneficiaryType);
    }
    const result = await this.runSql(sql, data);
    return result;
  }

  async getByStatus(status: Status): Promise<FeeCommissions[]> {
    const sql = `SELECT * FROM fee_commissions WHERE status = ?`;
    const result = await this.runSql(sql, [status]);
    return result;
  }

  async getSumByBeneficiaryID(
    beneficiaryID: number,
    beneficiaryType?: BROKER_TYPE,
    status?: Status
  ): Promise<number> {
    let sql = `SELECT COALESCE(SUM(amount), 0) feeSum FROM fee_commissions WHERE beneficiaryID = ?`;
    const data: any = [beneficiaryID];
    if (beneficiaryType) {
      sql += ` AND beneficiaryType = ?`;
      data.push(beneficiaryType);
    }
    if (status) {
      sql += ` AND status = ?`;
      data.push(status);
    }
    const [result] = await this.runSql(sql, data);
    return result;
  }

  async insertOne(
    feeID: number,
    amount: number,
    transactionID: number,
    beneficiaryID: number,
    dateEarned?: Date,
    status?: Status,
    beneficiaryType?: BROKER_TYPE
  ): Promise<void> {
    const sql = `
      INSERT INTO fee_commissions (feeID, amount, transactionID, beneficiaryID, dateEarned, status, beneficiaryType) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    return this.runSql(sql, [
      feeID,
      amount,
      transactionID,
      beneficiaryID,
      dateEarned,
      status,
      beneficiaryType,
    ]);
  }

  async update(
    ID: number,
    feeID: number,
    amount: number,
    transactionID: number,
    beneficiaryID: number,
    dateEarned: Date,
    status: Status,
    beneficiaryType: BROKER_TYPE
  ): Promise<void> {
    const sql = `
      UPDATE fee_commissions SET feeID = ?, amount = ?, transactionID = ?, beneficiaryID = ?, 
      dateEarned = ?, status = ?, beneficiaryType = ? WHERE ID = ?
    `;
    return this.runSql(sql, [
      feeID,
      amount,
      transactionID,
      beneficiaryID,
      dateEarned,
      status,
      beneficiaryType,
      ID,
    ]);
  }

  async updateStatus(ID: number, status: Status): Promise<void> {
    const sql = `
      UPDATE fee_commissions SET status = ? WHERE ID = ?
    `;
    return this.runSql(sql, [status, ID]);
  }

  async deleteOne(ID: number): Promise<void> {
    const sql = `DELETE FROM fee_commissions WHERE ID = ?`;
    return this.runSql(sql, [ID]);
  }

  async deleteAll(): Promise<void> {
    const sql = `DELETE FROM fee_commissions`;
    return this.runSql(sql);
  }
}
