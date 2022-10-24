# Testing Suite

You have access to mocha using `npm run test`
Chai and Sinon are also installed.

This directory contians files for global test setup.

- [global.spec.ts](../global.spec.ts) is used to set up a database for testing purposes.
- [server.spec.ts](../server.spec.ts) is currently out of order, but would be used to initialize the multisto app for legacy tests, as the legacy code is a monolith.

It would be preferred that you write tests inside the modules that you are testing if possible, otherwise use this "global" folder and try to mimic the folder structure of what you are testing.

## Database
You need to create your own empty database, called `multisto-test` (to use a different name, set it the env variable `MYSQL_TESTDATABASE`). The test suite will switch to using that database.

Note: It is cloned from **YOUR** current version of the schema, using mysqldump. The tables `params` and `migrations` are copied with data. The database does not get cleared regularly in order to save time. It will be reset after you've run migrations.
