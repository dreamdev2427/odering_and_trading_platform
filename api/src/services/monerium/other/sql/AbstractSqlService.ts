import Pool from 'core/mysql';

export default class AbstractSqlService {
  async runSql(sql: string, args: unknown[]): Promise<any> {
    return Pool.execute(sql, args);
  }
}
