import * as math from "mathjs";
import * as mysql from "mysql2/promise";
import * as SqlString from "sqlstring";

const TIMEOUT_ENV = parseInt(process.env.MYSQL_CONNECTION_TIMEOUT ?? "", 10);
const TIMEOUT = Number.isNaN(TIMEOUT_ENV) ? 60 * 60 * 1000 : TIMEOUT_ENV;

export const Pool = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: TIMEOUT,
  host: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === "testing"
      ? process.env.MYSQL_TESTDATABASE ?? "multisto-test"
      : process.env.DB_Database,
  multipleStatements: true,
  supportBigNumbers: true,
  typeCast(field, next) {
    if (field.type === "DECIMAL") {
      const fieldValue = field.string();
      const fieldLength = fieldValue.slice(
        fieldValue.indexOf(".") + 1,
        fieldValue.length
      ).length;
      if (fieldLength <= 5) {
        return math.number(fieldValue);
      }
      if (fieldLength > 5) {
        return math.bignumber(fieldValue);
      }
      return next();
    }
    return next();
  },
});

export const DefaultPool = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: TIMEOUT,
  host: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_Database,
  multipleStatements: true,
  supportBigNumbers: true,
  typeCast(field, next) {
    if (field.type === "DECIMAL") {
      const fieldValue = field.string();
      const fieldLength = fieldValue.slice(
        fieldValue.indexOf(".") + 1,
        fieldValue.length
      ).length;
      if (fieldLength <= 5) {
        return math.number(fieldValue);
      }
      if (fieldLength > 5) {
        return math.bignumber(fieldValue);
      }
      return next();
    }
    return next();
  },
});

type TransactionCallback<A> = (connection: mysql.PoolConnection) => Promise<A>;

export const findOne = async <T>(
  sql: string,
  values: any[] = [],
  connection: mysql.PoolConnection | mysql.Pool = Pool
): Promise<T | null> => {
  const [rows] = await connection.query<mysql.RowDataPacket[]>(sql, values);
  return (rows[0] as T) || null;
};

export const findMany = async <T>(
  sql: string,
  values: unknown[] = [],
  connection: mysql.PoolConnection | mysql.Pool = Pool
): Promise<T[]> => {
  const [rows] = await connection.query<mysql.RowDataPacket[]>(sql, values);
  return (rows as T[]) || [];
};

export const execute = (sql: string, data: any) =>
  Pool.query(SqlString.format(sql), data);

export const executeTransaction = async <A>(
  callback: TransactionCallback<A>
): Promise<A> => {
  const connection = await Pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    connection.release();
    return result;
  } catch (e) {
    await connection.rollback();
    connection.release();
    throw e;
  }
};

export const insert = async (
  sql: string,
  values: unknown[] = [],
  connection: mysql.PoolConnection | mysql.Pool = Pool
): Promise<any> => {
  const [row] = await connection.query<mysql.OkPacket>(sql, values);
  return row;
};

export const update = async (
  sql: string,
  values: unknown[] = [],
  connection: mysql.PoolConnection | mysql.Pool = Pool
): Promise<any> => {
  const [row] = await connection.query<mysql.OkPacket>(sql, values);
  return row;
};

module.exports = {
  Pool,
  DefaultPool,
  execute,
  executeTransaction,
  findOne,
  findMany,
  insert,
  update,
};
