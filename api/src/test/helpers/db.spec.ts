/* eslint-disable @typescript-eslint/no-unused-vars */
import mysqldump from 'mysqldump';
import { createConnection, getConnectionOptions } from 'typeorm';

import { DefaultPool, PoolMS } from 'core/mysql';

const TEST_DATABASE = process.env.MYSQL_TESTDATABASE ?? 'multisto-test';

const PERSISTENT_TABLES = ['params', 'migrations', 'currency', 'api_migration_table'];

const checkTestDbConnection = async (): Promise<void> => {
  const [dbRecord] = await PoolMS.execute(`SELECT DATABASE() AS name;`);
  const dbName = (dbRecord as any)[0].name;

  if (dbName !== TEST_DATABASE) {
    throw new Error(
      `Abort Mocha: Wrong database! Expected: '${TEST_DATABASE}', Actual: '${dbName}'`,
    );
  }
  console.log(`Selected DB:'${dbName}'`);
};

const checkTypeOrmConnection = async (): Promise<void> => {
  // read connection options from ormconfig file (or ENV variables)
  const connectionOptions = await getConnectionOptions();

  // do something with connectionOptions,
  // for example append a custom naming strategy or a custom logger
  Object.assign(connectionOptions, { database: TEST_DATABASE });

  const connection = await createConnection();

  if (connection.isConnected) {
    console.log('TypeORM connection established');
  }
};

const checkTestDbOutdated = async (): Promise<boolean> => {
  type Migration = { id: number; name: string; run_on: Date };
  type ApiMigration = { id: number; name: string; timestamp: number };
  type RowResult<T> = [T[] | unknown[]];

  let testMigrations;
  let testApiMigrations;
  try {
    [testMigrations] = (await PoolMS.execute(
      `SELECT * FROM migrations ORDER BY id DESC LIMIT 1;`,
    )) as unknown as RowResult<Migration[]>;
    [testApiMigrations] = (await PoolMS.execute(
      `SELECT * FROM api_migration_table ORDER BY id DESC LIMIT 1;`,
    )) as unknown as RowResult<ApiMigration[]>;
  } catch (e) {
    console.log(e);
    // Test schema does not exist
    return true;
  }
  const [mainMigrations] = (await DefaultPool.execute(
    `SELECT * FROM migrations ORDER BY id DESC LIMIT 1;`,
  )) as unknown as RowResult<Migration[]>;
  const [mainApiMigrations] = (await DefaultPool.execute(
    `SELECT * FROM api_migration_table ORDER BY id DESC LIMIT 1;`,
  )) as unknown as RowResult<ApiMigration[]>;
  const multistoOutdated =
    (mainMigrations[0] as Migration)?.name !== (testMigrations[0] as Migration)?.name; // Schemas sitting at different migrations
  const apiOutdated =
    (mainApiMigrations[0] as Migration)?.name !== (testApiMigrations[0] as ApiMigration)?.name; // Schemas sitting at different migrations

  if (multistoOutdated)
    console.info(
      `multisto migrations are outdated (latest: ${
        (mainMigrations[0] as Migration)?.name
      }, current:${(testMigrations[0] as Migration)?.name})`,
    );
  if (apiOutdated)
    console.info(
      `api migrations are outdated (latest: ${
        (mainApiMigrations[0] as ApiMigration)?.name
      }, current:${(testApiMigrations[0] as ApiMigration)?.name})`,
    );

  return multistoOutdated || apiOutdated;
};

/** Clones the main db schema into the test db plus persistent tables */
const synchronizeTestDb = async (): Promise<void> => {
  const connection = {
    host: process.env.MYSQL_HOST as string,
    user: process.env.MYSQL_USER as string,
    database: process.env.MYSQL_DATABASE as string,
    password: process.env.MYSQL_PASSWORD as string,
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

  await PoolMS.query(`\
        SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, AUTOCOMMIT = 0;\
        SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;\
        SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;\
        ${dump.dump.schema as string}\
        COMMIT;\
        SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;\
        SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;\
        SET AUTOCOMMIT = @OLD_AUTOCOMMIT;\
        `); // Copy schema into test db
  await PoolMS.query(dataDump.dump.data as string); // Copy some data into test db
};

export const setup = async (): Promise<void> => {
  if (process.env.NODE_ENV !== 'testing') {
    throw new Error(
      `Abort Mocha: Wrong environment! Expected: 'testing', Actual: '${process.env.NODE_ENV}'`,
    );
  }
  const beginTime = new Date();

  await checkTestDbConnection(); // Make SURE that we are connecting to the test db by default

  if (await checkTestDbOutdated()) {
    console.log('Synchronizing test DB schema (this can take a minute)...');
    await synchronizeTestDb();
  } else {
    console.log('Test DB schema is up to date.');
  }

  await checkTypeOrmConnection();

  const endTime = new Date();
  console.log(`Set up Test DB in ${(endTime.getTime() - beginTime.getTime()) / 1000}s`);
};

const clearDb = async (): Promise<void> => {
  await PoolMS.query(`\
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
};

export const teardown = async (): Promise<void> => {
  // await clearDb();
};
