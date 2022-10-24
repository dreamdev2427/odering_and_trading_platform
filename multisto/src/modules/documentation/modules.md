# Modules folder

These are separate js/ts modules loaded by the multisto codebase. Sometimes they're just small helpers.

## Bootstrap

**Important:** An error in here will prevent multisto from starting, this includes a problem in migrations.

This is a hook where you can place any process that needs to happen before multisto starts loading.
Primarily used to set up/migrate the database.

## DB

This is responsible for handling MySQL connections and providing a Pool object to be used for queries.
The DefaultPool object is intended to be used by the testing utilities as we need to ensure we're not in the testing database. Otherwise, the normal Pool connection string can change depending on the application context (normal vs test).

## MySqlConnChecker

This module will probe the SQL server multiple times until it can establish a connection.
This is related to server deployments, primarily on SaaS where the MySQL server comes online later than multisto.

Check the following envs:

- `MYSQL_CONNECTION_TIMEOUT` _Default: 3600000 | 1 hour but realistically a few minutes, may be limited by other factors_

  Sets the time in ms after which a **single** connection attempt to the MySQL server will abort with "Error: connect ETIMEDOUT"

- `MYSQL_PROBE_MAX_AWAIT` _Default: 300000 | 5 minutes_

  Sets the time in ms after which the module MySqlConnChecker will stop making new probes to the SQL server.
  The system will still wait until after the last probe has finished. You can adjust `MYSQL_CONNECTION_TIMEOUT` for this.

- `MYSQL_PROBE_RETRY_DELAY` _Default: 5000 | 5 seconds_
  Sets the time in ms between connection probes in the module MySqlConnChecker
