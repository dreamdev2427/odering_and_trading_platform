// import { Investor, InvestorBalancesInCompanyAccounts } from '../../Schema';
import { PoolConnection } from "mysql2/promise";
import got from "got";
import { mercuryEndpoint } from "./defs";
import { MercuryConfig } from "./types";
import { InvestorBalancesInCompanyAccounts } from "../../Schema";
import { fetchInvestorById, findMany } from "./multistoHelpers";


const { update, executeTransaction } = require("../../modules/db");


const decreaseBalance = async (
  investorID: number,
  stoID: number,
  amount: number,
  connection: PoolConnection
) => {
  const [balance] = await findMany<InvestorBalancesInCompanyAccounts>(
    `SELECT * FROM InvestorBalancesInCompanyAccounts WHERE investorID=? and stoid=? and currencyID=1 FOR UPDATE;`,
    [investorID, stoID], connection
  );

  if (!balance?.Amount || balance.Amount < amount) throw new Error("Insufficient funds");

  const sql = `
    UPDATE InvestorBalancesInCompanyAccounts 
    SET Amount=Amount - ? 
    WHERE Amount>=? and currencyID=1 and stoid=? and investorID=?;`;

  await update(sql, [amount, amount, stoID, investorID], connection);
};

const mercuryPostPayment = async (
  config: MercuryConfig,
  recipientId: string,
  amount: number,
  idempotencyKey: string
) => {
  const payload = {
    recipientId,
    amount,
    paymentMethod: "ach",
    idempotencyKey
  };

  const response = await got(`${mercuryEndpoint}/account/${config.accountID}/transactions`, {
    method: "POST",
    responseType: "json",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.APIKey}`
    },
    body: JSON.stringify(payload)
  });
  if (response.statusCode !== 200) {
    throw new Error(`returned status code ${response.statusCode}`);
  }
};

export default async (
  config: MercuryConfig,
  investorID: number,
  stoID: number,
  amount: number,
  idempotencyKey: string
): Promise<void> => {
  const investor = await fetchInvestorById(investorID);
  if (!investor?.mercuryID) {
    throw new Error("missing mercury recipientID");
  }
  const mercuryID: string = investor.mercuryID;
  return executeTransaction(async (connection: PoolConnection) => {
    await decreaseBalance(investor.ID, stoID, amount, connection);
    await mercuryPostPayment(config, mercuryID, amount, idempotencyKey);
  });
};
