/* eslint-disable no-console */
import { assert } from "chai";
import mysqldump from "mysqldump";

const db = require("../../modules/db");

const TEST_DATABASE = process.env.MYSQL_TESTDATABASE ?? "multisto-test";

const PERSISTENT_TABLES = ["params", "migrations", "api_migration_table"];

const checkTestDbConnection = async (): Promise<void> => {
  const [dbRecord] = await db.Pool.execute(`SELECT DATABASE() AS name;`);
  const dbName = (dbRecord as any)[0].name;

  if (dbName !== TEST_DATABASE) {
    throw new Error(
      `Abort Mocha: Wrong database! Expected: '${TEST_DATABASE}', Actual: '${dbName}'`
    );
  }
  console.log(`Selected DB:'${dbName}'`);
};

const checkTestDbOutdated = async (): Promise<boolean> => {
  type Migration = { id: number; name: string; run_on: Date };
  type ApiMigration = { id: number; name: string; timestamp: number };
  type RowResult<T> = [T[] | unknown[]];

  let testMigrations;
  let testApiMigrations;
  try {
    [testMigrations] = ((await db.Pool.execute(
      `SELECT * FROM migrations ORDER BY id DESC LIMIT 1;`
    )) as unknown) as RowResult<Migration[]>;
    [testApiMigrations] = ((await db.Pool.execute(
      `SELECT * FROM api_migration_table ORDER BY id DESC LIMIT 1;`
    )) as unknown) as RowResult<ApiMigration[]>;
  } catch (e) {
    console.log(e);
    // Test schema does not exist
    return true;
  }
  const [mainMigrations] = ((await db.DefaultPool.execute(
    `SELECT * FROM migrations ORDER BY id DESC LIMIT 1;`
  )) as unknown) as RowResult<Migration[]>;
  const [mainApiMigrations] = ((await db.DefaultPool.execute(
    `SELECT * FROM api_migration_table ORDER BY id DESC LIMIT 1;`
  )) as unknown) as RowResult<ApiMigration[]>;
  const multistoOutdated =
    (mainMigrations[0] as Migration)?.name !==
    (testMigrations[0] as Migration)?.name; // Schemas sitting at different migrations
  const apiOutdated =
    (mainApiMigrations[0] as Migration)?.name !==
    (testApiMigrations[0] as ApiMigration)?.name; // Schemas sitting at different migrations

  if (multistoOutdated)
    console.info(
      `multisto migrations are outdated (latest: ${
        (mainMigrations[0] as Migration)?.name
      }, current:${(testMigrations[0] as Migration)?.name})`
    );
  if (apiOutdated)
    console.info(
      `api migrations are outdated (latest: ${
        (mainApiMigrations[0] as ApiMigration)?.name
      }, current:${(testApiMigrations[0] as ApiMigration)?.name})`
    );

  return multistoOutdated || apiOutdated;
};

/**
 * Empties all database tables
 */
const clearDb = async (): Promise<void> => {
  console.info(`Dropping test database tables in \`${TEST_DATABASE}\`...`);
  try {
    await db.Pool.query(`\
          SET FOREIGN_KEY_CHECKS = 0;\
          SET GROUP_CONCAT_MAX_LEN=32768;\
          SET @tables = NULL;\
          SELECT GROUP_CONCAT('\`', table_name, '\`') INTO @tables\
          FROM information_schema.tables\
          WHERE table_schema = (SELECT DATABASE());\
          SELECT IFNULL(@tables,'dummy') INTO @tables;\
          SET @tables = CONCAT('DROP TABLE IF EXISTS ', @tables);\
          PREPARE stmt FROM @tables;\
          EXECUTE stmt;\
          DEALLOCATE PREPARE stmt;\
          SET FOREIGN_KEY_CHECKS = 1;`);
  } catch (error) {
    assert.fail(`SQL error encountered in clearDb.\n${(error as Error).stack}`);
  }
};

/** Clones the main db schema into the test db plus persistent tables */
const synchronizeTestDb = async (): Promise<void> => {
  const connection = {
    host: process.env.DB_SERVER as string,
    user: process.env.DB_USER as string,
    database: process.env.DB_Database as string,
    password: process.env.DB_PASSWORD as string,
  };

  /** Copy the current db schema to a test db */
  const dump = await mysqldump({
    connection,
    dump: {
      data: false,
      schema: {
        autoIncrement: false,
        table: {
          dropIfExist: true,
        },
        engine: true,
        format: true,
      },
    },
  });
  /** Keep the data from the 'params' table in test db */
  const dataDump = await mysqldump({
    connection,
    dump: {
      data: {
        format: true,
      },
      schema: false,
      tables: PERSISTENT_TABLES,
    },
  });

  await clearDb();

  const query = `\
          SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, AUTOCOMMIT = 0;\
          SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;\
          SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;\
          ${dump.dump.schema as string}\
          COMMIT;\
          SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;\
          SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;\
          SET AUTOCOMMIT = @OLD_AUTOCOMMIT;\
          `;
  try {
    console.info(`Inserting schema in \`${TEST_DATABASE}\`...`);
    await db.Pool.query(query); // Copy schema into test db
  } catch (error) {
    assert.fail(
      `SQL error encountered in Schema setup.\n${(error as Error).stack}`
    );
  }
  try {
    console.info(`Carrying over data from [${PERSISTENT_TABLES}]...`);
    await db.Pool.query(dataDump.dump.data as string); // Copy some data into test db
  } catch (error) {
    assert.fail(
      `SQL error encountered in data insertion.\n${(error as Error).stack}`
    );
  }
};

export const setup = async (): Promise<void> => {
  if (process.env.NODE_ENV !== "testing") {
    throw new Error(
      `Abort Mocha: Wrong environment! Expected: 'testing', Actual: '${process.env.NODE_ENV}'`
    );
  }
  const beginTime = new Date();

  await checkTestDbConnection(); // Make SURE that we are connecting to the test db by default

  if (await checkTestDbOutdated()) {
    console.log(
      "Synchronizing test DB schema to latest migration (this can take a minute)..."
    );
    await synchronizeTestDb();
  } else {
    console.log("Test DB schema is up to date.");
  }

  const endTime = new Date();
  console.log(
    `Set up Test DB in ${(endTime.getTime() - beginTime.getTime()) / 1000}s`
  );
};

export const teardown = async (): Promise<void> => {
  if (process.env.CLEAR_DB_ON_TEST_TEARDOWN) {
    await clearDb();
  }
};
