// import { readFileSync } from "fs";
const fs = require("fs");

const saasSchema = fs
  .readFileSync("./migrations/populate/sqls/20211015194221-setup-up.sql")
  .toString("utf-8");
const saasLines = saasSchema.split("\n");
const mstoSchema = fs
  .readFileSync("../multisto/src/Schema.ts")
  .toString("utf-8");
const mstoLines = mstoSchema.split("\n");

/** The following will come from either multisto or api migrations and are marked to be ignored */
/** I ran out of time to create a script to scan API migrations automatically,
 * hence these lists are large and will be outdated soon */
const ignoreTables = [
  // From Multisto
  "autoCryptoPaymentReceiptProcessing",
  "blockchains",
  // Not referenced anywhere in code
  "kycfilenames",
  // From API
  "chats",
  "FeeCommissions",
  "InvestingEntityTypes",
  "InvestorBankssto",
  "MoonpayBuyAlerts",
  "MoonpayTransactionData",
  "NetkiAccessCodes",
  "SharesHistoricalData",
  "SharesTransferHistory",
];
const ignoreColumns = [
  "investorpublickeys.blockchainID",
  "sharetypes.channelIDForAutoPayments",
  "sharetypes.keyStoreFileAutoPayments",
  "sharetypes.keyStoreFileAutoPaymentsPassword",
  "Brokers.brokerID",
  "Currency.blockchainID",
  "Currency.Address",
  "Currency.isNative",
  "Currency.cryptoReceivingAddress",
  "Dividend.ShareTypeID", // This one is fully deprecated even
  "Exchangeoffers.stoID",
  "Exchangeorders.stoID",
  "InvestingEntity.typeID",
  "Investor.brokerID",
  "Investor.driversLicenseID",
  "Investor.investmentLimitUpdateDate",
  "Investor.allowedTotalInvestment",
  "Investor.yearlyTotalInvestment",
  "InvestorBanks.swift", // Not used
  "InvestorBuyPropertyAlert.isSellRequest",
  "InvestorBuyPropertyAlert.isHiddenForInvestor",
  "Paymentchannels.adminEmailHeader",
  "Paymentchannels.adminEmailBody",
  "Paymentchannels.sendAdminEmail",
  "Sharetypes.sellToCompany",
  "Sharetypes.sellValue",
  "Sharetypes.isShareNosApplicable",
  "Sharetypes.isCertificateNosApplicable",
];

// States
const STATE = {
  Default: 0,
  SqlTable: 1,
  SqlColumn: 2,
  SchemaTable: 3,
  SchemaColumn: 4,
};

class State {
  state = STATE.Default;

  inTable = undefined;

  tables = [];

  lines = [];

  constructor(data) {
    Object.assign(this, data);
  }
}

class SchemaStateMachine {
  state = STATE.Default;

  /**
   * @type string | undefined
   */
  inTable = undefined;

  /**
   * @type {
   *  name: string,
   *  columns: string[],
   * }[]
   */
  tables = [];

  /**
   * @type string[]
   */
  lines = [];

  _enterSqlTable(tableName) {
    this.inTable = tableName;
    this.tables[tableName] = {
      name: tableName,
      columns: [],
    };
    this.state = STATE.SqlTable;
    // console.log(`TABLE \`${tableName}\` {`);
  }

  _enterSchemaTable(tableName) {
    this.inTable = tableName;
    this.tables[tableName] = {
      name: tableName,
      columns: [],
    };
    this.state = STATE.SchemaTable;
    // console.log(`interface ${tableName}\ {`);
  }

  /**
   * @param {number} i
   * @param {string} line
   */
  handleDefault(i, line) {
    if (
      line.startsWith("CREATE TABLE") &&
      !line.includes("View` (")
    ) {
      const re = new RegExp(`(?<=\`).*?(?=\`)`);
      const tableName = line.match(re)[0];
      this._enterSqlTable(tableName);
    } else if (
      line.startsWith("export interface") &&
      !line.includes("WithDefaults") &&
      !line.endsWith("View {")
    ) {
      const re = new RegExp(`(?<=interface ).*?(?= {)`);
      const tableName = line.match(re)[0];
      this._enterSchemaTable(tableName);
    }
    return i;
  }

  handleSqlTable(i, line) {
    if (line.startsWith(")")) {
      this.inTable = undefined;
      this.state = STATE.Default;
      // console.log(`}`);
    } else {
      const re = new RegExp(`(?<!\\S\\s)(?<=\\s+\`).+?(?=\`)`);
      const match = line.match(re);
      if (match) {
        const columnName = match[0];
        this.tables[this.inTable].columns.push(columnName);
        // console.log(`  ${columnName}`);
      }
    }
    return i;
  }

  handleSchemaTable(i, line) {
    if (line.startsWith("}")) {
      this.inTable = undefined;
      this.state = STATE.Default;
      // console.log(`}`);
    } else {
      const re = new RegExp(`(?<=^\\s+)\\S+?(?=[?:]{1,2} )`);
      const match = line.match(re);
      if (match) {
        const columnName = match[0];
        this.tables[this.inTable].columns.push(columnName);
        // console.log(`  ${columnName}`);
      }
    }
    return i;
  }

  handleLine = (i, line) => {
    switch (this.state) {
      case STATE.Default:
        return this.handleDefault(i, line);
      case STATE.SqlTable:
        return this.handleSqlTable(i, line);
      case STATE.SchemaTable:
        return this.handleSchemaTable(i, line);
    }
  };
}

const SaasSM = new SchemaStateMachine();
for (let i = 0; i < saasLines.length; i++) {
  i = SaasSM.handleLine(i, saasLines[i]);
}

const MstoSM = new SchemaStateMachine();
for (let i = 0; i < mstoLines.length; i++) {
  i = MstoSM.handleLine(i, mstoLines[i]);
}
/**
 * Convert object with named properties to array
 * @type { name: string,columns: string[] }[]
 */
const SaasTables = Object.keys(SaasSM.tables).map((key) => SaasSM.tables[key]);
/**
 * @type { name: string,columns: string[] }[]
 */
const MstoTables = Object.keys(MstoSM.tables).map((key) => MstoSM.tables[key]);

/**
 * Compare the names of 2 tables
 * @param {{ name: string, columns: string[] }} t1
 * @param {{ name: string, columns: string[] }} t2
 */
const areEqual = (t1, t2) =>
  t1.name.toLowerCase().replaceAll("_", "").replaceAll("-", "") ===
  t2.name.toLowerCase().replaceAll("_", "").replaceAll("-", "");

const missingTables = MstoTables.filter(
  (mTable) => !SaasTables.find((sTable) => areEqual(sTable, mTable))
).filter((table) => !ignoreTables.find((ignore) => areEqual({ name: ignore }, table)));

if (missingTables.length) {
  console.log(`Missing tables (${missingTables.length}):`);
  missingTables.forEach((table) => {
    console.log(`TABLE ${table.name}`);
    table.columns.forEach((column) => {
      console.log(`  ${column}`);
    });
  });
} else {
  console.log(`No missing tables`);
}

/**
 * Find missing columns in tables that exist in both collections
 * @type string[]
 */
const missingColumns = SaasTables.reduce((cols, sTable) => {
  // Find a matching table
  const mTable = MstoTables.find((t) => areEqual(sTable, t));
  // Compare columns
  return [
    ...cols,
    ...mTable.columns
      .filter((col) => !sTable.columns.find((scol) => scol === col))
      .map((col) => `${mTable.name}.${col}`),
  ];
}, []).filter((col) => !ignoreColumns.find((ignore) => ignore.toLowerCase() === col.toLowerCase()));

if (missingColumns.length) {
  console.log(
    `Missing columns (${missingColumns.length}):\n${missingColumns.join(`\n`)}`
  );
} else {
  console.log(`No missing columns`)
}
