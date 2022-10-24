import { Fees } from "../../../Schema";
import AbstractSqlService from "../../generic/AbstractSqlService";
import IFeeService, { Beneficiary, Status, Type } from "./IFeeService";

export default class FeeSqlService
  extends AbstractSqlService
  implements IFeeService {
  async getAll(): Promise<Fees[]> {
    return this.runSql(
      `SELECT *, (SELECT stos.title FROM stos WHERE stos.ID = fees.stoID) AS project_title FROM fees`
    );
  }

  async getByID(ID: number): Promise<Fees> {
    const [result] = await this.runSql(`SELECT * FROM fees WHERE ID = ?`, ID);
    return result;
  }

  async getByStoAndType(stoID: number, type: Type): Promise<Fees[]> {
    return this.runSql(`SELECT * FROM fees WHERE stoID = ? AND type = ?`, [
      stoID,
      type,
    ]);
  }

  async insertOne(
    stoID: number,
    beneficiary: Beneficiary,
    type: Type,
    amount: number,
    status: Status
  ): Promise<void> {
    const sql = `INSERT INTO fees (stoID, beneficiary, type, amount, status) VALUES (?, ?, ?, ?, ?)`;
    return this.runSql(sql, [stoID, beneficiary, type, amount, status]);
  }

  async update(
    ID: number,
    stoID: number,
    beneficiary: Beneficiary,
    type: Type,
    amount: number,
    status: Status
  ): Promise<void> {
    const sql = `UPDATE fees SET stoID = ?, beneficiary = ?, type = ?, amount = ?, status = ? WHERE ID = ?`;
    return this.runSql(sql, [stoID, beneficiary, type, amount, status, ID]);
  }

  async deleteOne(ID: number): Promise<void> {
    const sql = `DELETE FROM fees WHERE ID = ?`;
    return this.runSql(sql, ID);
  }

  async deleteAll(): Promise<void> {
    return this.runSql(`DELETE FROM fees`);
  }
}
