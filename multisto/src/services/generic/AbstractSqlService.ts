import { PoolConnection } from "mysql2/promise";
import * as SqlString from "sqlstring";
import mysql from "../../modules/mysql";

const { executeTransaction } = require("../../modules/db");

export interface SqlQueryResult {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}
export type SqlMethod = (sql: any, data?: any) => Promise<any>;

export type KV<T> = { keys: (keyof T)[]; values: any[] };

/**
 * Provides a generic way of initializing SQL services so that their runSql
 * method can be redirectable, but defaults to a mysql implementation.
 * An extending service will bbe calling runSql instead of mysql.executeSQLStatement
 */
export default abstract class AbstractSqlService {
  protected tableName?: string = undefined;

  static LOG_SQL: boolean = false;

  public logSql: boolean = false;

  protected logNext: boolean = false;

  protected lastSql: string = ``;

  /**
   * Invokes the default SQL handling method.
   * This is abstract so that we can swap the driver or connection out
   */
  runSql: SqlMethod;

  private defaultMethod;

  constructor(sqlMethod?: SqlMethod) {
    if (sqlMethod) {
      this.runSql = sqlMethod;
      this.defaultMethod = sqlMethod;
    } else {
      this.runSql = mysql.executeSQLStatement;
      this.defaultMethod = this.runSql;
    }
  }

  private _logSql(sql: string, args?: any) {
    this.lastSql = sql;
    if (this.logSql || AbstractSqlService.LOG_SQL || this.logNext)
      // eslint-disable-next-line no-console
      console.log(SqlString.format(sql, args));
    this.logNext = false;
  }

  /** Will log the SQL of the next action for debugging purposes */
  logNextCommand() {
    this.logNext = true;
  }

  getLastSql = (): string => this.lastSql;
  /**
   * Return array as comma-separated '?' elements to be inserted in SQL string.
   * This is needed to ensure that every part of the SQL string will pass
   * through an SQL injection escape function at once, even if we think that
   * the incoming parameter array is "clean".
   *
   * Example: [1,2,3] => "?,?,?" => SELECT * WHERE ID IN (?,?,?)
   * @param arr Array of any type
   * @returns Array of '?' of equal length
   */
  arrayAsSqlArguments = (arr: Array<any>): string => {
    const args: Array<string> = arr.map(() => "?");
    return args.join(",");
  };

  // eslint-disable-next-line class-methods-use-this
  toSqlDateTime(date: Date): string {
    return SqlString.format(date.toISOString().slice(0, 19).replace("T", " "));
  }

  async findAll(tableName?: string) {
    const finalTableName = tableName ?? this.tableName;
    return this.runSql(`SELECT * FROM ${finalTableName}`);
  }

  async find<T, Criteria>(
    whereEquals: Criteria,
    tableName?: string
  ): Promise<T[]> {
    const finalTableName = tableName ?? this.tableName;

    // Get keys and values of the criteria object for equivalences (EQ)
    const criteriaEqKv = this.resourcesToKv<Criteria>([whereEquals])[0];

    // Extract the string `Key = Value` from the criteria EQ KV
    const criteriaSql = criteriaEqKv.keys.map(
      (criterium: keyof Criteria) =>
        `${String(criterium)} = ${whereEquals[criterium]}`
    );

    return this.runSql(
      `SELECT * FROM ${finalTableName} WHERE ${criteriaSql.join(` AND `)}`
    );
  }

  async findOne<T>(options: Partial<T>): Promise<T> {
    const [result] = await this.findByRecords<T>([options]);
    return result;
  }

  async findMany<T>(options: Partial<T>): Promise<T[]> {
    return this.findByRecords<T>([options]);
  }
  /**
   * Search by using the key-values of one or many partial records of the same type as the return type.
   */
  async findByRecords<T>(options: Partial<T>[]): Promise<T[]> {
    const useValues: Partial<T>[keyof T][][] = [];
    const sqls: string[][] = [];
    options.forEach((record) => {
      const keys: (keyof T)[] = Object.keys(record) as (keyof T)[];
      const values = keys.map((key) => record[key]);
      const useKeys = keys.filter(
        (key) => record[key] !== undefined && record[key] !== null
      );
      useValues.push(
        values.filter((value) => value !== undefined && value !== null)
      );
      sqls.push(useKeys.map((key) => `${String(key)} = ?`));
    });
    // Group one record's key searches with AND between them
    const sqlGrps = sqls.map((sql) => `${sql.join(` AND `)}`);
    // Result is: SELECT * FROM table WHERE (option0.key = ?...) OR (option1.key = ?...)
    const sql = `SELECT * FROM ${this.tableName} WHERE (${sqlGrps.join(
      `) OR (`
    )})`;

    const reducedValues = useValues.reduce(
      (total, vals) => [...total, ...vals],
      []
    );

    this._logSql(sql, reducedValues);

    return this.runSql(sql, reducedValues);
  }

  /**
   * Insert a resource in a generic way. Returns inserted row ID.
   * WARNING: Make sure you've set the class field tableName and that the resource object has only the same keys as the SQL table schema
   */
  async insert<T>(resource: T, tableName?: string): Promise<number> {
    return this.insertMany<T>([resource], tableName);
  }
  /**
   * Insert an array of resources in a generic way. Returns first inserted row ID.
   * WARNING: Make sure you've set the class field tableName and that the resource object has only the same keys as the SQL table schema
   */
  async insertMany<T>(
    resources: T[],
    tableName?: string,
    upsert?: boolean
  ): Promise<number> {
    const sql = this.getInsertSql<T>(resources, tableName, upsert);
    this._logSql(sql);
    const fullRes = await this.runSql(sql);
    const res = fullRes[0] ?? fullRes;
    if (!res || Number.isNaN(res.insertId)) {
      throw new Error(
        `AbstractSqlService: Could not fetch insertId correctly. Please verify the SQL response object:\n${JSON.stringify(
          fullRes
        )}`
      );
    }
    return res.insertId;
  }
  /**
   * Insert/update an array of resources in a generic way. Returns first inserted row ID.
   * WARNING: Make sure you've set the class field tableName and that the resource object has only the same keys as the SQL table schema
   */
  async upsertMany<T>(resources: T[], tableName?: string): Promise<number> {
    return this.insertMany<T>(resources, tableName, true);
  }
  async deleteByIDs(ids: number[], tableName?: string): Promise<void> {
    const table = tableName ?? this.tableName;
    if (!table) throw new Error(`AbstractSqlService: no tableName set`);
    if (!ids) throw new Error(`AbstractSqlService: deleteByIDs: empty array`);
    const qs = this.arrayAsSqlArguments(ids);
    return this.runSql(`DELETE FROM ${table} WHERE ID IN (${qs})`, ids);
  }
  async clearTable(tableName?: string): Promise<void> {
    await this.runSql(`DELETE FROM ${tableName ?? this.tableName};`);
  }
  async clearTables(...tableNames: string[]): Promise<void> {
    const queries = tableNames.map((table) => `DELETE FROM ${table};`);
    return this.runSql(queries.join(""));
  }
  protected resourcesToKv<T>(resources: T[]): KV<T>[] {
    return resources.map((resource) => {
      const keys: (keyof T)[] = [];
      let values: any[] = [];
      Object.entries(resource).forEach((kv) => {
        keys.push(kv[0] as keyof T);
        values.push(kv[1]);
      });
      // Format dates
      values = values.map((val) =>
        val instanceof Date
          ? `'${this.toSqlDateTime(val)}'`
          : SqlString.escape(val)
      );
      return { keys, values };
    });
  }

  /**
   * Returns escaped SQL
   */
  getInsertSql<T>(
    resources: T[],
    tableName?: string,
    upsert?: boolean
  ): string {
    const finalTableName = tableName ?? this.tableName;
    if (!finalTableName) {
      throw new Error(
        `SQL Service: class variable tableName is not set for automatic insert`
      );
    }
    const records: KV<T>[] = this.resourcesToKv<T>(resources);
    const valueSqlGroups = records.map((rec) => `(${rec.values.join(`,`)})`);

    let sql = `INSERT INTO ${finalTableName} (\`${records[0].keys.join(
      `\`,\``
    )}\`) VALUES ${valueSqlGroups.join(`,`)}`;
    if (upsert) {
      const allKeys: (keyof T)[] = records.reduce(
        (keys: (keyof T)[], record) => [...keys, ...record.keys],
        []
      );
      const columns = Array.from(new Set(allKeys));
      const colSqls = columns.map(
        (key: keyof T) => `\`${String(key)}\`=VALUES(\`${String(key)}\`)`
      );

      sql = `${sql} ON DUPLICATE KEY UPDATE ${colSqls.join(`,`)}`;
    }
    // Split large insert requests to circumvent MySQL max request length limit
    // if (sql.length >= 16777216) {
    // This starts becoming a problem at ~80K records or ~40K with upserts (assuming 200 chars per). Not gonna bother.
    // But if you are clever, you could call this function recursively with half of its records and then split the end result before each insert
    // }
    return sql;
  }

  useOnce(method: SqlMethod) {
    this.runSql = (sql: string, data: any) => {
      const res = method(SqlString.format(sql), data);
      this.runSql = this.defaultMethod;
      return res;
    };
  }

  // eslint-disable-next-line class-methods-use-this
  prepare(method: SqlMethod, services: AbstractSqlService[]) {
    services.forEach((svc) => svc.useOnce(method));
  }

  /**
   * Extract the SQL method from a PoolConnection
   */
  // eslint-disable-next-line class-methods-use-this
  connectionMethod(connection: PoolConnection): SqlMethod {
    return (sql: string, data?: any) => connection.query(sql, data);
  }

  transact: <T>(
    callback: (connection: PoolConnection) => Promise<T>
  ) => Promise<T> = executeTransaction;
}
