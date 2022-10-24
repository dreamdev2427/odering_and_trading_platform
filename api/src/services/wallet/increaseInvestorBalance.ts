import * as mysql from 'mysql2/promise';
import { findOne, insert, update } from '../../core/mysql';
import { InvestorBalancesInCompanyAccounts } from '../../DBSchema';

export default async (
  investorID: number,
  currencyID: number,
  amount: number,
  approvalStatusID: number,
  connection: mysql.PoolConnection,
  stoID = 0,
  adminID = -1,
  details = '',
): Promise<number> => {
  const currentBalance = await findOne<InvestorBalancesInCompanyAccounts>(
    `select * from InvestorBalancesInCompanyAccounts where investorID = ? and currencyID = ? and stoid = ?`,
    [investorID, currencyID, stoID],
    connection,
  );

  if (!currentBalance) {
    await insert(
      'insert into InvestorBalancesInCompanyAccounts(stoid, investorID, currencyID, Amount) values(?, ?, ?, ?)',
      [stoID, investorID, currencyID, amount],
      connection,
    );
  } else {
    await update(
      'update InvestorBalancesInCompanyAccounts set Amount = Amount + ? where investorID = ? and currencyID = ? and stoid = ?',
      [amount, investorID, currencyID, stoID],
      connection,
    );
  }

  const depositAlert = await insert(
    'insert into InvestorDepositReceivedAlert(storid, investorid, isApproved, DateReceived, ChannelID, Amount, Details, DateApproved, ApprovedByUserID, currencyID, runningBalance)  values (?, ?,  1, now(), -1, ?, ?, now(), ?, ?, ? )',
    [
      stoID,
      investorID,
      amount,
      details,
      adminID,
      currencyID,
      (currentBalance?.Amount ?? 0) + amount,
    ],
    connection,
  );

  return depositAlert.insertId;
};
