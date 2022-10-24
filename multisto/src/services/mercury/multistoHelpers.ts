import * as mysql from "mysql2/promise";
import InvestorSqlService from "../investorClient/investor/data/InvestorSQLService";
import { getQueryfactory } from "../investorClient/documents/data/SqlQuery";
import { Investor } from "../../Schema";

const { Pool } = require("../../modules/db");

export const findMany = async <T>(
  sql: string,
  values: unknown[] = [],
  connection: mysql.PoolConnection | mysql.Pool = Pool
): Promise<T[]> => {
  const [rows] = await connection.query<mysql.RowDataPacket[]>(sql, values);
  return (rows as T[]) || [];
};

export const fetchInvestorById = async (investorID: number): Promise<Investor | undefined> => {
  const investorService = new InvestorSqlService(getQueryfactory(findMany));
  const [investor] = await investorService.getInvestor(investorID);
  return investor;
};
