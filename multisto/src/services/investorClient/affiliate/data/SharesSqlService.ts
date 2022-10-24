/* eslint-disable class-methods-use-this */
import mysql from "../../../../modules/mysql";
import { findOne, insert, findMany } from "../../../../modules/db";
import { Shares, Sharetypes } from "../../../../Schema";
import ISharesService from "./ISharesService";

export default class SharesSqlService implements ISharesService {
  async getTotalShares(stoId: number): Promise<number> {
    /** Doing the sumation in SQL in order to handle DECIMAL precision, which JS is not capable of by default */
    const sql = `
            SELECT
                SUM(totalShares) totalShares
            FROM
                sharetypes
            WHERE
                stoid = ?;
        `;
    const result: any = await mysql.executeSQLStatement(sql, stoId);
    return result[0].totalShares;
  }
  async getTotalBlockchainShares(stoId: number): Promise<number> {
    const sql = `
            SELECT
                SUM(totalShares) totalShares
            FROM
                sharetypes
            WHERE
                isblockchain = 1
            AND stoid = ?;
        `;
    const result: any = await mysql.executeSQLStatement(sql, stoId);
    return result[0].totalShares;
  }
  async getTotalCost(stoId: number): Promise<number> {
    const sql = `
            SELECT
                SUM(totalShares * nominalValue) totalCost
            FROM
                sharetypes
            WHERE
                stoid = ?;
        `;
    const result: any = await mysql.executeSQLStatement(sql, stoId);
    return result[0].totalCost;
  }
  async getTotalBlockchainCost(stoId: number): Promise<number> {
    const sql = `
            SELECT
                SUM(totalShares * nominalValue) totalCost
            FROM
                sharetypes
            WHERE
                isblockchain = 1
            AND stoid = ?;
        `;
    const result: any = await mysql.executeSQLStatement(sql, stoId);
    return result[0].totalCost;
  }
  async getPreciseCost(shareTypeId: number, nShares: string): Promise<string> {
    const sql = `
            SELECT
                (nominalValue * ?) cost
            FROM
                sharetypes
            WHERE
                id = ?;
        `;
    const result: any = await mysql.executeSQLStatement(sql, [
      nShares,
      shareTypeId,
    ]);
    return result[0] ? result[0].cost : 0;
  }
  async getPreciseDiscountCost(
    shareTypeId: number,
    nShares: string
  ): Promise<string> {
    // TODO: HARDCODED DISCOUNT PRICE VALUE, CHANGE SOON!!!
    const DISCOUNT_PRICE = "0.04";
    const sql = `
            SELECT
                (? * ?) cost
            FROM
                sharetypes
            WHERE
                id = ?;
        `;
    const result: any = await mysql.executeSQLStatement(sql, [
      DISCOUNT_PRICE,
      nShares,
      shareTypeId,
    ]);
    return result[0] ? result[0].cost : 0;
  }
  async getTotalInvestorSharesInSto(
    investorId: number,
    stoId: number
  ): Promise<number> {
    const sql = `
            SELECT
                COALESCE(SUM(shares),0) as sum
            FROM shares
            WHERE
                stoid = ?
            AND investorID = ?;
        `;
    const result: any = await mysql.executeSQLStatement(sql, [
      stoId,
      investorId,
    ]);
    return result[0].sum;
  }
  async getInvestorSharesInSto(
    investorId: number,
    stoId: number,
    shareTypeId: number
  ): Promise<number> {
    const sql = `
            SELECT
                COALESCE(SUM(shares),0) as sum
            FROM shares
            WHERE
                stoid = ?
            AND shareTypeid = ?
            AND investorID = ?;
        `;
    const result: any = await mysql.executeSQLStatement(sql, [
      stoId,
      shareTypeId,
      investorId,
    ]);
    return result[0].sum;
  }
  async getDefaultShareTypeId(stoId: number): Promise<number | undefined> {
    const sql = `SELECT shareTypeid AS id FROM shares WHERE stoid = ? ORDER BY shareTypeid ASC LIMIT 1`;
    const result: any = await mysql.executeSQLStatement(sql, stoId);
    return result[0].id;
  }
  async grantShares(
    investorId: number,
    stoId: number,
    shareTypeId: number,
    shares: number
  ): Promise<void> {
    const existingSharesRecords = (
      await findOne<{ recs: number }>(
        `
            SELECT
                COUNT(*) as recs
            FROM shares
            WHERE
                stoid = ?
            AND shareTypeid = ?
            AND investorID = ?;
        `,
        [stoId, shareTypeId, investorId]
      )
    )?.recs;

    const historySql = `
            INSERT INTO shareshistory(
                sharesid, isActive, investorID, shares, shareTypeid, CertificateSerials, ShareSerials, purchaserID, datePurchase)
            VALUES(-1, 1, ?, ?, ?, ?, ?, -1, NOW())`;
    const sharesHistoryId = (
      await insert(historySql, [
        investorId,
        shares,
        shareTypeId,
        null,
        null,
        -1,
      ])
    ).insertId;

    if (existingSharesRecords) {
      const sql = `
                UPDATE
                    shares
                SET
                    shares = shares + ?,
                    sharesHistoryID = ?
                WHERE
                    stoId = ?
                AND shareTypeid = ?
                AND investorId = ?;`;
      await mysql.executeSQLStatement(sql, [
        shares,
        sharesHistoryId,
        stoId,
        shareTypeId,
        investorId,
      ]);
      return;
    }

    const sql = `INSERT INTO shares(stoid, shareTypeid, shares, investorID, sharesHistoryID) VALUES(?,?,?,?,?);`;
    await mysql.executeSQLStatement(sql, [
      stoId,
      shareTypeId,
      shares,
      investorId,
      sharesHistoryId,
    ]);
  }
  async getInvestmentsAbove(
    investorId: number,
    shares: string
  ): Promise<Shares[]> {
    return findMany<Shares>(
      `
            SELECT * FROM shares WHERE investorid = ? and shares >= ?;`,
      [investorId, shares]
    );
  }
  async getShareTypesById(shareTypeId: number): Promise<Sharetypes> {
    const types = await findOne<Sharetypes>(
      `SELECT * FROM sharetypes WHERE id = ?;`,
      [shareTypeId]
    );
    if (!types) {
      throw new Error("Share types not found");
    }
    return types;
  }
  async getShareTypesForSto(stoId: number): Promise<Sharetypes[]> {
    return findMany(`SELECT * FROM sharetypes WHERE stoid = ?;`, [stoId]);
  }
  async getTotalInvestorInvestment(investorId: number): Promise<string> {
    const row = await findOne<{ sum: string }>(
      `SELECT SUM(amountInvested) AS sum FROM investments WHERE InvestorID = ?`,
      [investorId]
    );
    return row?.sum || "";
  }

  async getTotalInvestorShareValue(investorId: number): Promise<number> {
    const sql = `select SUM(s.shares * st.premimum) as totalValue from shares s
                    inner join sharetypes st on s.shareTypeid = st.ID
                    where investorID = ?`;
    const result: any = await mysql.executeSQLStatement(sql, [investorId]);
    return result[0].totalValue;
  }
}
