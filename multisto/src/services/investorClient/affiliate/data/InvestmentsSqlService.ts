/* eslint-disable class-methods-use-this */
import mysql from "../../../../modules/mysql";
import { findMany } from "../../../../modules/db";
import IInvestmentsService from "./IInvestmentsService";

export default class InvestmentsSqlService implements IInvestmentsService {
  async getIsEligible(investorId: number, amount: string): Promise<Boolean> {
    const sql = `SELECT (SUM(AmountInvested) >= ?) AS eligible FROM investments WHERE InvestorID = ? GROUP BY stoid;`;
    const stoEligibility = await findMany<{ eligible: number }>(sql, [
      amount,
      investorId,
    ]);

    let result: Boolean = false;
    stoEligibility.forEach((sto) => {
      if (sto.eligible === 1) {
        result = true;
      }
    });
    return result;
  }
  getInvestedIn(investorId: number, stoId: number): Promise<string> {
    const sql = `SELECT SUM(AmountInvested) as sum FROM investments WHERE InvestorID = ? AND stoid = ?`;
    const result: any = mysql.executeSQLStatement(sql, [investorId, stoId]);
    return result[0] ? result[0].sum : "0";
  }
  getAllInvestedIn(ids: number[], stoId: number): Promise<string> {
    if (ids.length === 0) return Promise.resolve("0");
    const sql = `SELECT SUM(AmountInvested) as sum FROM investments WHERE InvestorID IN (${ids.join(
      ","
    )}) AND stoid = ?`;
    const result: any = mysql.executeSQLStatement(sql, [stoId]);
    return result[0] ? result[0].sum : "0";
  }

  async getAllVolumeInvestedIn(
    ids: number[],
    options?: { stoId?: number; dateFrom?: Date; dateTo?: Date }
  ): Promise<{ amount: string; tokens: string }> {
    if (ids.length === 0) return Promise.resolve({ amount: "0", tokens: "0" });
    const idString = ids.join(",");

    // Add search filters
    const filters: string[] = [];
    if (options?.stoId) {
      filters.push(`stoId = ${options.stoId}`);
    }
    if (options?.dateFrom) {
      const dateTo =
        `"${options.dateTo?.toISOString().split("T")[0]}"` || "CURDATE()";
      filters.push(
        `DateTime BETWEEN "${
          options.dateFrom.toISOString().split("T")[0]
        }" AND ${dateTo}`
      );
    }
    filters.push(`investorId IN (${idString})`);

    const filterString = filters.join(" AND ");
    const sql = `
            SELECT
                COALESCE(SUM(AmountInvested),0) as amount,
                COALESCE(SUM(TokensTransferred),0) as tokens
                FROM investments
                WHERE
                ${filterString}`;
    const result: any = await mysql.executeSQLStatement(sql);
    return result[0] ?? { amount: "0", tokens: "0" };
  }
  getTotalInvestment(investorId: number): Promise<string> {
    const sql = `SELECT SUM(AmountInvested) as sum FROM investments WHERE InvestorID = ?`;
    const result: any = mysql.executeSQLStatement(sql, investorId);
    return result[0] ? result[0].sum : "0";
  }
}
