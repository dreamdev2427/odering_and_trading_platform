import * as mysql from 'mysql2/promise';
import { SQLConnection } from 'core/SqlQuery';

const poolOptions: mysql.PoolOptions = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database:
    process.env.NODE_ENV === 'testing'
      ? process.env.MYSQL_TESTDATABASE ?? 'multisto-test'
      : process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  multipleStatements: true,
  decimalNumbers: true,
};

/** A pool that points to the default or testing database depending on env */
const Pool = mysql.createPool({
  ...poolOptions,
});
/** A pool that points to the default or testing database and has multiple statements enabled.
 * LESS SECURE
 * NOTE: This has since become deprecated, we made it the default
 */
export const PoolMS = mysql.createPool({
  ...poolOptions,
  multipleStatements: true,
});
/** A pool that always points to the default database */
export const DefaultPool = mysql.createPool({
  ...poolOptions,
  database: process.env.MYSQL_DATABASE,
});

export const findOne = async <T = any>(
  sql: string,
  values: unknown[] = [],
  connection: mysql.PoolConnection | mysql.Pool = Pool,
): Promise<T | null> => {
  const [rows] = await connection.execute<mysql.RowDataPacket[]>(sql, values);
  return (rows[0] as T) || null;
};

export const findMany = async <T = any>(
  sql: string,
  values: unknown[] = [],
  connection: mysql.PoolConnection | mysql.Pool = Pool,
): Promise<T[]> => {
  const [rows] = await connection.execute<mysql.RowDataPacket[]>(sql, values);
  return (rows as T[]) || [];
};

export const insert = async (
  sql: string,
  values: unknown[] = [],
  connection: mysql.PoolConnection | mysql.Pool = Pool,
): Promise<any> => {
  const [row] = await connection.execute<mysql.OkPacket>(sql, values);
  return row;
};

export const update = async (
  sql: string,
  values: unknown[] = [],
  connection: mysql.PoolConnection | mysql.Pool = Pool,
): Promise<any> => {
  const [row] = await connection.execute<mysql.OkPacket>(sql, values);
  return row;
};

export const executeTransaction = async <A>(
  callback: (connection: mysql.PoolConnection) => Promise<A>,
): Promise<A> => {
  const connection = await Pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    await connection.release();
    return result;
  } catch (e) {
    await connection.rollback();
    await connection.release();
    throw e;
  }
};

export const execute: SQLConnection = <A>(query: string, params: any[]) =>
  Pool.execute(query, params).then((a) => a[0]) as Promise<A[]>; // workaround is going to be replaced by type-graphql

export default Pool;
