# Digishares Multisto 🚛

## Pre-install

### Node.js

The project written in javascript, and you need to have **node.js** installed.
If you have it, please check the version with `node -v` command.
It has to be the **LTS version**.

### MySql

The project uses **MySQL**. You can use any mysql server you want.
- XAMPP(Win) / MAMP(MacOS)
- Mysql Workbench

### Redis 

Also, you have to install **Redis**. It does not require any specific, default config will be enough.

## Install

Install packages from the `package.json` file, you can do it by run `npm run setup` command.

## Configure

### hosts

The project uses hostname to resolve access to the data. You have to add a hostname to hosts file.

#### Linux/macOS

```shell
sudo nano /etc/hosts
```

in the end of file add this:
```
127.0.0.1       testingserver.com
```

You can use any domain you want, but keep in mind that you will use this domain to access the application.

#### Windows

TODO: Add update hosts for windows

### Database

Create a database with these parameters:
- name: **multisto**
- user: **multisto**
- password: **multisto**

If you have a backup import it in the new database. If you not have a backup than run `npm run db-migrate -- up:build` command.

#### Stos table

Find record with `id=0` in stos table and change the column:
```
stolink -> testingserver.com
stolinkfull -> http://testingserver.com
```

#### Params table

Find record with `param=SingleSignInEnabled` in params table and change the column:
```
intValue -> 0
```

### Environment variables

The project does not support .env variables, you need to set them manually.

For _linux/macOS_ you can create a script and set the environment variables in that file.
It will be something like this: `start.sh` in project root directory, example below. Do not commit that file.

Alternatively, set the required env variables (shown below) in ~/.bashrc or alternatives (~/.xprofile, ~/.xsession),
just make sure they are available in your shell once the project starts (test with `echo $DB_Database`) and then you can just `npm run start` without making a `start.sh` file. It's a less cumbersome way to launch.

Here is a recommendation for `start.sh`:
```shell
export NODE_ENV=staging
export Browser_Caption="DigiShares Investor Dashboard"
export Browser_CaptionNotLogin=DigiShares
export Browser_CaptionInvestor="DigiShares Issuer Dashboard"
export Stellar_Server=https://horizon-testnet.stellar.org
export SESSION_SECRET="^#$5sX(Hf6KUo!#65^"
export COOKIE_PARSERSECRET="6xH$*CYY*u44gcUN57%H"
export SERVER_PORT=3001
export PASSWORD_SALT=7fa73b47df808d36c5fe328546ddef8b9011b2c6
export Dashboard_Config=DigiShares
export DB_SERVER=127.0.0.1
export DB_USER=multisto
export DB_PASSWORD=multisto
export DB_Database=multisto
export AUTOMIGRATE=1
export SMTP_FromAddress=sa@digishares.io
export SMTP_Host=smtp.yandex.ru
export SMTP_Port=465
export SMTP_User=sa@digishares.io
export SMTP_Password=jGffTy4@#
export SMTP_MaxFileSize=3
export REDIS_URL=redis://127.0.0.1:6379
export CommonDomainName="testingserver.com"
export web3Address="http://127.0.0.1:7545"

npm run start
```
Keep in mind there's also more env vars needed for the other projects.

Do not add the file to git because it's only for local uses.

## Start

After you have finished configuration, you can run the application as shown below,
though there's a few extra steps needed to make it useable.

### Linux/macOS

```
sh start.sh
```

### Windows

TODO: add start for windows
Some devs use a script to import their env variables before starting.

### Watch mode

If you don't want to restart the application every time when you add changes, the use `npm run server` command.
Just replace `npm run start` with `npm run server`.

## Sign in

If you use a different domain, then use it instead of `testingserver.com`.
Also do not forget about port `:3001`.

Ask the team about credentials because they change from time to time.

### Platform admin

http://testingserver.com:3001/platform/adminlogin

### Sto admin

http://testingserver.com:3001/platform/login

### Little hack

Update all admin records and set `Password`:
```
8dd0529658e1fda1f3c0d31ff4e847c3f04d32148789f6cf496c1a0c4d119801
```
The hashed password is: `a`
```sql
UPDATE users SET
password='8dd0529658e1fda1f3c0d31ff4e847c3f04d32148789f6cf496c1a0c4d119801';
```
### STO Investor login
We recommend getting an investor and setting his credentials to something short like:
```sql
UPDATE investor SET
email='dev@dev.com',
password='8dd0529658e1fda1f3c0d31ff4e847c3f04d32148789f6cf496c1a0c4d119801'
WHERE id=264;
```
This sets someone's credentials to:
username: `dev@dev.com`
password: `a`

If this ID doesn't exist, search for another investor.

And if you want easy login to all investors:
```sql
UPDATE investor SET
password='8dd0529658e1fda1f3c0d31ff4e847c3f04d32148789f6cf496c1a0c4d119801';
```

## Code-style and best practices

Try to follow KISS, SOLID and DRY. Always try to split code in services, data services, controllers, routers. It will make your code more independent, testable and reusable. Also write and run tests for your code before push it and fix them if needed.

# Environment variables

We will add descriptions to multisto-specific envs here

## Optional envs

- `MIGRATEDOWN`
   
   If set to 1, will automatically migrate downwards on server start

- `MYSQL_CONNECTION_TIMEOUT` *Default: 3600000 | 1 hour but realistically a few minutes, limited by system*
   
   Sets the time in ms after which a **single** connection attempt to the MySQL server will abort with "Error: connect ETIMEDOUT"

- `MYSQL_PROBE_MAX_AWAIT` *Default: 300000 | 5 minutes*
   
   Sets the time in ms after which the module MySqlConnChecker will stop making new probes to the SQL server.
   The system will still wait until after the last probe has finished. You can adjust `MYSQL_CONNECTION_TIMEOUT` for this.

- `MYSQL_PROBE_RETRY_DELAY` *Default: 5000 | 5 seconds*
   
   Sets the time in ms between connection probes in the module MySqlConnChecker
