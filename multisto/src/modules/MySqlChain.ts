import mysqlJs = require('./mysql');

const mysql: any = mysqlJs as any;

/** Static block */

/**
 * WORK IN PROGRESS
 * Static.
 * Maintains a chain of SQL commands to be executed at once.
 * Use begin(), push(), then execute().
 * Uses mysql module.
 */
class MySqlChain {
    /** Culminative SQL query */
    static fullQuery: string = '';
    /** Data per query */
    static fullData: string[] = [];

    /**
     * Begin a chain of SQL commands. Destroys previous chain.
     */
    static begin(): void {
        MySqlChain.fullQuery = '';
        MySqlChain.fullData = [];
    }

    /**
     * Add SQL command to the chain.
     */
    static push(query: string, data: string[]): void {
        MySqlChain.fullQuery += query;
        MySqlChain.fullData = MySqlChain.fullData.concat(data);
    }

    /**
     * Execute current chain of SQL commands.
     */
    static execute(): Promise<any> {
        return mysql.executeSQLStatement(MySqlChain.fullQuery, MySqlChain.fullData);
    }
}

export default MySqlChain;
