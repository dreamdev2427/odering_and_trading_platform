# GraphQL Digishares API

## Install

First, install packages from the `package.json` file, you can do it by run `npm install` command.

Second, create an `.env` file in the project directory. You can copy the `.env.example` and set your environment variables.

### Environment variables

There are several variables you have to set.

#### Database settings:

- `MYSQL_HOST` - mysql database host
- `MYSQL_DATABASE` - mysql database name
- `MYSQL_USER` - mysql database username
- `MYSQL_PASSWORD` - mysql database password

#### Secure keys:

- `PASSWORD_SALT` - password salt has to be the same as the `multisto` salt
- `PRIVATE_JWT_KEY` - high-complexity random string

#### Google Cloud Storage

- `GCS_SA` - base64 encoded google cloud storage service account json. be careful, you need to encode json with `node.js`, not with a browser.
- `GCS_BUCKET_NAME` - google cloud storage bucket name

#### Other settings:

- `FRONTEND_URL` - an url to the frontend application, it uses for links in emails.
- `STO_MODE` - operating mode of the application, may be `SINGLE` or `MULTI`
- `API_URL` - a url to the api application, it is used for uploading files (will most likely be http://localhost:300/gql for your local setup)

## Start

Start the api for deployment with

`npm run server`

for production with

`npm start`

### GraphQL playground

After starting the api, you can test it here:

[`http://localhost:3000/gql`](http://localhost:3000/gql)

## Migrations

`typeORM` package is used for migrations. You can read about working with migrations in [documentation](https://typeorm.io/#/migrations).
It is highly recommended to use **migration API** to write migrations.
When using the **migration API**, the probability of error minimizes, as opposed to pure **sql**.

Learn more about [**migration API**](https://typeorm.io/#/migrations/using-migration-api-to-write-migrations).

You can enable automatic migrations with the env variable AUTOMIGRATE=1. These will run on app startup.

### Running and reverting migrations

To have your database schema up-to-date, it is necessary to run migrations after pulling updates from remote.

You can run migrations using a npm script:

`npm run migration:run`

This command will execute all pending migrations and run them in a sequence ordered by their timestamps.

If for some reason you want to revert the changes, you can run:

`npm run migration:revert`

If you need to revert multiple migrations you must call this script multiple times.

### Creating a new migration

You can create a new migration using a npm script:

`npm run migration:create MIGRATION_NAME`

`MIGRATION_NAME` is the name of the migration - you can specify any name you want.
After you run the script you can see a new file generated in the "migration" directory named `{TIMESTAMP}-MIGRATION_NAME.ts` where `{TIMESTAMP}` is the current timestamp when the migration was generated.

## Code-style and best practices

Try to follow KISS, SOLID and DRY. Always try to write code in services, not in the mutations/queries. It will make your code more independent, testable and reusable. Also write and run tests for your code before push it and fix them if needed.
