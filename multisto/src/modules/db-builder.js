import DBMigrate from 'db-migrate';
import logger from '../logger';
import mysql from './mysql';

/** Builds the database schema if necessary.
 */
export default async function initDb(dbName) {
    const dbm = await DBMigrate.getInstance(true);
    const query = `SELECT COUNT(DISTINCT \`table_name\`) AS tableCount FROM \`information_schema\`.\`columns\` WHERE \`table_schema\` = ?;`;

    mysql.executeSQLStatement(query, dbName)
    .then((result) => {
        if (result[0].tableCount === 0) {
            logger.info(`BUILDING DATABASE '${dbName}'.`);
            return dbm.up(1, 'build'); // Execute 1 migration from 'build' scope
        }
        if (result[0].tableCount === 1 && !process.env.SUPRESS_UNCLEAN_DATABASE_ERROR) {
            throw new Error(`Unclean database '${dbName}'. This can occur if the migrations ran on an empty database. Remove the migrations table if it exists and re-run the project.`);
        }
        return Promise.resolve();
    })
    .catch((err) => {
        logger.error(err);
        throw err;
    });
}
