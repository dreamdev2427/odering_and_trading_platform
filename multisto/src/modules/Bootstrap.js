// import initDb from './db-builder';
import * as mysql from "mysql2/promise";
import MySqlConnChecker from "./MySqlConnChecker";
import { DefaultPool } from "./db";

const DBMigrate = require("db-migrate");
const logger = require("../logger");

/** Commands executed at launch */
export default class Bootstrap {
  /**
   * Performs all actions necessary before booting multisto
   */
  static async all() {
    await Bootstrap.awaitMySQLServerOrExit();
    await Bootstrap.customizeDb();
    await Bootstrap.performMigrations();
  }

  /**
   * For for SaaS
   * Need to await the server instance to come online
   */
  static async awaitMySQLServerOrExit() {
    await MySqlConnChecker.attemptConnectionOrExit({
      timeout: process.env.MYSQL_PROBE_MAX_AWAIT // Timeout in ms after which to exit (5 minutes default)
    });
  }

  /** For for SaaS */
  static async customizeDb() {
    if (process.env.VALUES_HOSTNAME?.length) {
      try {
        if (!process.env.URL.length) {
          throw new Error(`customizeDb: The env $URL is not set!`);
        }
        await DefaultPool.execute(
          `UPDATE stos SET
            title='${process.env.VALUES_HOSTNAME}', 
            stolink='${process.env.URL}', 
            stolinkfull='https://${process.env.URL}' where ID = 0;`);
        logger.info(`  customizeDb: Updated stos`);
        await DefaultPool.execute(
          `UPDATE params SET stringvalue='https://${process.env.URL}/platform/login'
          WHERE param = 'SingleSignInLoginURL';`
        );
        logger.info(`  customizeDb: Updated params`);
        logger.info(`✔ customizeDb: Successfully applied $VALUES_HOSTNAME and $URL from env`);
      } catch(e) {
        logger.error(`customizeDb failed critically:\n${e.stack}`);
        process.exit(1);
        throw e;
      }
    }
  }

  static async performMigrations() {
    if (process.env.AUTOMIGRATE === "1") {
      // Killswitch
      const dbmigrate = await DBMigrate.getInstance(true);

      // OPTIONAL
      // Performs silent migrations by default
      if (process.env.VERBOSE_MIGRATION !== "1") {
        dbmigrate.silence(true);
      }

      let migrated;
      try {
        // Build DB schema if needed
        // await initDb(process.env.DB_Database);

        // Auto-migrate downwards only if parameter is given
        // NOTE: It will be performed EVERY TIME untill this parameter is removed from env
        // NOTE: Perhaps it is better to do a down migration manually from the shell using the db-migrate binary command
        // NOTE: db-migrate binary is availabe with npm run db-migrate
        if (process.env.MIGRATEDOWN) {
          migrated = await dbmigrate.down(1);
        } else {
          migrated = await dbmigrate.up();
        }
      } catch (e) {
        logger.error(e);
      }

      migrated?.forEach(({ title }) => {
        const name = `Migration "${title}" is migrated `;
        if (process.env.MIGRATEDOWN) {
          logger.info(`${name} DOWN!`);
        } else {
          logger.info(`${name} UP!`);
        }
      });
    }
  }
}
