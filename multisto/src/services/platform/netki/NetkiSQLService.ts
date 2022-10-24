import AbstractSqlService from "../../generic/AbstractSqlService";

export interface AccessCodes {
  access_codes: string;
  investorID?: number;
  childAccessCode?: string;
}

export default class NetkiSQLService extends AbstractSqlService {
  async getAccessCodes(): Promise<AccessCodes[]> {
    const sql = `select * from netki_access_codes`;
    return this.runSql(sql, []);
  }
  async setAccessCodes(accessCodes: (string | null)[][]): Promise<any> {
    const sql = `set foreign_key_checks = 0;
insert ignore into netki_access_codes(access_code, investorID, childAccessCode) values ?;
set foreign_key_checks = 1;`;
    return this.runSql(sql, [accessCodes]);
  }
  async deleteAccessCodes(): Promise<any> {
    const sql = `delete from netki_access_codes`;
    return this.runSql(sql, []);
  }
}
