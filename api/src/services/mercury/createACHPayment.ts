import { executeTransaction, findOne, update } from 'core/mysql';
import { Investor, InvestorBalancesInCompanyAccounts } from 'DBSchema';
import { mercuryEndpoint } from 'services/mercury/defs';
import { MercuryConfig } from 'services/mercury/types';
import got from 'got';
import { PoolConnection } from 'mysql2/promise';
import { fetchInvestorById } from '../investor/find';

const decreaseBalance = async (
  investorID: number,
  stoID: number,
  amount: number,
  connection: PoolConnection,
) => {
  const balance = await findOne<InvestorBalancesInCompanyAccounts>(
    `SELECT * FROM InvestorBalancesInCompanyAccounts WHERE investorID=? and stoid=? and currencyID=1 FOR UPDATE;`,
    [investorID, stoID],
    connection,
  );

  if (!balance?.Amount || balance.Amount < amount) throw new Error('Insufficient funds');

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
  idempotencyKey: string,
) => {
  const payload = {
    recipientId,
    amount,
    paymentMethod: 'ach',
    idempotencyKey: idempotencyKey,
  };

  const response = await got(`${mercuryEndpoint}/account/${config.accountID}/transactions`, {
    method: 'POST',
    responseType: 'json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.APIKey}`,
    },
    body: JSON.stringify(payload),
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
  idempotencyKey: string,
): Promise<void> => {
  const investor: Investor = await fetchInvestorById(investorID);
  if (!investor.mercuryID) {
    throw new Error('missing mercury recipientID');
  }
  const mercuryID: string = investor.mercuryID;
  return executeTransaction(async (connection) => {
    await decreaseBalance(investor.ID, stoID, amount, connection);
    await mercuryPostPayment(config, mercuryID, amount, idempotencyKey);
  });
};
