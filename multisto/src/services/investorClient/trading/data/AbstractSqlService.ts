import MySqlChain from '../../../../modules/MySqlChain';
import mysqlJs = require('../../../../modules/mysql');

const mysql: any = mysqlJs as any;

/**
 * Common functionality of SQL services
 */
export default class AbstractSqlService {
    doChaining: boolean = false;

    constructor(doChaining: boolean) {
        if (doChaining === true) {
            this.doChaining = true;
        }
    }

    /** @returns void when chaining */
    /** @returns Promise of result when not chaining */
    executeSql(sql: string, data: string[]): Promise<any> {
        if (this.doChaining) {
            MySqlChain.push(sql, data);
            return new Promise((resolve) => resolve("")); // TODO: Can probably be improved to return promise of result in here
        }
        return mysql.executeSQLStatement(sql, data);
    }
}
