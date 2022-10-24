import { Investor } from "../../../../Schema";
import SqlQuery, { QueryFactory } from "../../documents/data/SqlQuery";
import mysql from "../../../../modules/mysql";
import { findMany, findOne, insert, update } from "../../../../modules/db";
import IInvestorService from "./IInvestorService";
import QueryObjectDto from "../dto/QueryObjectDto";
import AffiliateReportViewDto from "../../affiliate/dto/AffiliateReportViewDto";
import logger from "../../../../logger";

export default class InvestorSqlService implements IInvestorService {
  queryfactory: QueryFactory;
  queryDictionary: any = {
    searchName: ` CONCAT(i.FirstName, ' ', i.LastName) LIKE ? `,
    searchCountry: ` i.taxResidencyCountry LIKE ? `,
    searchId: ` i.ID LIKE ? `,
    searchEmail: ` i.email LIKE ?`,
    searchIsKyc: ` s.iskyc LIKE ? `,
    searchStoId: ` s.stoid LIKE ? `,
    orderName: ` CONCAT(i.FirstName, ' ', i.LastName) `,
    orderId: ` i.ID `,
    orderStoId: ` s.stoid `,
    orderEmail: ` i.email `,
    orderCountry: ` i.taxResidencyCountry `,
    exportIdCheckbox: ` i.id `,
    exportStoIdCheckbox: ` s.stoid `,
    exportNameCheckbox: ` FirstName, LastName `,
    exportCountryCheckbox: ` taxResidencyCountry `,
    exportContactCheckbox: ` phone, cell `,
    exportEmailCheckbox: ` Email `,
  };

  constructor(queryFactory: QueryFactory) {
    this.queryfactory = queryFactory;
  }
  getInvestor = (investorID: number): SqlQuery<Investor> => {
    const sql = `select * from investor where id = ?`;
    return this.queryfactory<Investor>(sql, [investorID]);
  };
  updateAffiliateStatus = (
    investorID: number,
    status: number
  ): SqlQuery<Investor> => {
    const sql = `update investor set affiliateStatus = ? where id = ?`;
    return this.queryfactory<Investor>(sql, [status, investorID]);
  };
  getAllInvestors = (
    offset?: number,
    records?: number
  ): SqlQuery<Investor[]> => {
    const pagination = offset && records ? `LIMIT ?, ?` : ``;
    const sql = `SELECT * FROM investor ${pagination}`;
    return this.queryfactory<Investor[]>(sql, [offset, records]);
  };
  getInvestorsForSto = (stoId: number): Promise<Investor[]> => {
    let sql = `SELECT * FROM investor i INNER JOIN investorsto isto ON i.ID = isto.investorid WHERE isto.stoid = ? ORDER BY i.ID`;
    if (stoId === 0) {
      sql = `SELECT * FROM investorsto isto INNER JOIN investor i ON i.ID = isto.investorid
                    GROUP BY isto.investorid HAVING (COUNT(isto.investorid) = 1)`;
    }
    return findMany<Investor>(sql, [stoId]);
  };
  getInvestorsAndAffiliateViewDataForSto = (
    stoId: number
  ): Promise<AffiliateReportViewDto[]> => {
    let sql = `SELECT i.*, COUNT(arv.lineInvestorId) as line, arv.armVolume, arv.rootInvestorTotalPersonalInvestmentVolume, 
                        SUM(arv.armVolume) as Downline
                        FROM investor i INNER JOIN investorsto isto ON i.ID = isto.investorid 
                    INNER JOIN AffiliateReportView arv ON i.ID = arv.rootInvestorId 
                    WHERE isto.stoid = 0 GROUP BY i.ID`;
    if (stoId === 0) {
      sql = `SELECT i.*, COUNT(arv.lineInvestorId) as line, arv.armVolume, arv.rootInvestorTotalPersonalInvestmentVolume, 
                        SUM(arv.armVolume) as Downline
                        FROM investorsto isto INNER JOIN investor i ON i.ID = isto.investorid
                    INNER JOIN AffiliateReportView arv ON i.ID = arv.rootInvestorId
                    GROUP BY isto.investorid HAVING (COUNT(isto.investorid) = 1)`;
    }
    return findMany<AffiliateReportViewDto>(sql, [stoId]);
  };
  geniusSerachInvestor = (
    investorQueryParameter: any,
    stoId?: any
  ): Promise<AffiliateReportViewDto[]> => {
    const wildeCardQuery = `%${investorQueryParameter}%`;
    let sql = `SELECT * FROM (
                        SELECT i.ID, isto.stoid, i.FirstName, i.LastName, i.email, i.country,
                            arv.lineInvestorId, arv.armVolume, arv.rootInvestorTotalPersonalInvestmentVolume
                        FROM investorsto isto 
                        INNER JOIN investor i ON i.ID = isto.investorid
                        INNER JOIN AffiliateReportView arv ON i.ID = arv.rootInvestorId AND isto.stoid = arv.stoid
                        WHERE (i.ID LIKE ? OR CONCAT(i.FirstName, ' ', i.LastName) LIKE ? OR i.email LIKE ? OR i.country LIKE ?)
                    ) as tmp`;
    if (stoId) {
      sql += ` WHERE stoid = ${stoId} `;
    }
    sql += ` ORDER BY ID, stoid `;
    return findMany<AffiliateReportViewDto>(sql, [
      wildeCardQuery,
      wildeCardQuery,
      wildeCardQuery,
      wildeCardQuery,
      wildeCardQuery,
    ]);
  };

  serachInvestor = (query: any): Promise<Investor[]> => {
    const wildeCardQuery = `%${query}%`;
    const sql =
      "SELECT * FROM investorsto isto INNER JOIN investor i ON i.ID = isto.investorid WHERE i.ID LIKE ? OR" +
      " CONCAT(i.FirstName, ' ', i.LastName) LIKE ? OR i.email LIKE ?";
    return findMany<Investor>(sql, [
      wildeCardQuery,
      wildeCardQuery,
      wildeCardQuery,
      wildeCardQuery,
    ]);
  };
  insertStoInvestors = (
    pasteSettingsStoId: number,
    investorIds: number[]
  ): Promise<null> => {
    const sql = `INSERT INTO investorsto 
            select investorid, isAccountClosed, ?, expectedShares, expectedInvestment, isKYC, KYCApplied, KYCUpdateDate, KYCCurrentStatus, inviteFriendEmailText, UsufructuariesFirstName, UsufructuariesLastName, UsufructuariesAddress, UsufructuariesCity, UsufructuariesCountry, UsufructuariesEmail, BeneificalFirstName, BeneificalLastName, BeneificalAddress, BeneificalCity, BeneificalCountry, BeneificalEmail, BeneificalDOB, BeneificalNationality, isUsufructuary, isActive, notes, dividendbank, dividendcrypto 
            from investorsto 
            WHERE investorid IN (?) AND NOT EXISTS ( 
              SELECT * FROM investorsto WHERE investorid IN (?) AND stoid = ?
            )`;
    logger.error(JSON.stringify(investorIds));
    logger.error(JSON.stringify(pasteSettingsStoId));
    return insert(sql, [
      pasteSettingsStoId,
      investorIds,
      investorIds,
      pasteSettingsStoId,
    ]);
  };

  countIncompleteKycInvestors = async (
    searchQueryObjects?: QueryObjectDto[]
  ): Promise<number> => {
    let sql = `select count(*) as count from investor i, investorsto s where i.id = 
            s.investorid `;
    const data: any = [];
    if (searchQueryObjects && searchQueryObjects?.length > 0) {
      searchQueryObjects.forEach((query: QueryObjectDto) => {
        if (this.queryDictionary[query.name]) {
          sql += ` AND ${this.queryDictionary[query.name]} `;
          data.push(`%${query.data}%`);
        }
      });
    }
    const result = await findOne<{ count: number }>(sql, data);
    return result?.count || 0;
  };
  getIncompleteKycInvestors = (
    recordsPage?: number,
    searchQueryObjects?: QueryObjectDto[],
    orderQueryObjects?: QueryObjectDto[],
    selectQueryProperties?: QueryObjectDto[]
  ): Promise<any> => {
    let sql = `select `;
    if (selectQueryProperties && selectQueryProperties?.length > 0) {
      let firstParamSelected = false;
      selectQueryProperties.forEach((query: QueryObjectDto) => {
        if (this.queryDictionary[query.name]) {
          if (firstParamSelected) {
            sql += `,`;
          }
          sql += `${this.queryDictionary[query.name]} `;
          firstParamSelected = true;
        }
      });
    } else {
      sql += `i.id, s.stoid, FirstName, LastName, Email, taxResidencyCountry, country, phone, cell `;
    }
    sql += ` from investor i, investorsto s where i.id = 
            s.investorid `;
    const data = [];
    if (searchQueryObjects && searchQueryObjects?.length > 0) {
      searchQueryObjects.forEach((query: QueryObjectDto) => {
        if (this.queryDictionary[query.name]) {
          sql += ` AND ${this.queryDictionary[query.name]} `;
          data.push(`%${query.data}%`);
        }
      });
    }
    if (orderQueryObjects && orderQueryObjects?.length > 0) {
      sql += ` ORDER BY true`;
      orderQueryObjects.forEach((query: QueryObjectDto) => {
        if (this.queryDictionary[query.name]) {
          sql += `, ${this.queryDictionary[query.name]} ${query.data}`;
        }
      });
    }

    if (recordsPage !== undefined) {
      const globalObj: any = global as any; // Fetch global object
      const offset = globalObj.config.RecordsPerPaging;
      sql += ` LIMIT ?, ?`;
      data.push((recordsPage - 1) * offset);
      data.push(offset);
    }
    return mysql.executeSQLStatement(sql, data);
  };

  enableDisableInvestorLogin = (
    isActive: boolean,
    investorId: number,
    stoId: number
  ): Promise<null> => {
    const stmt =
      "Update investorsto set isActive = ? where investorid = ? and stoid = ?";
    return update(stmt, [isActive, investorId, stoId]);
  };

  enableDisableInvestorLoginForAllStos = (
    isActive: boolean,
    investorId: number
  ): Promise<null> => {
    const stmt = "Update investorsto set isActive = ? where investorid = ?";
    return update(stmt, [isActive, investorId]);
  };

  enable2FAForAll = (): Promise<null> => {
    const stmt = "UPDATE investor SET twofactorenable = ?";
    return update(stmt, [1]);
  };
}
