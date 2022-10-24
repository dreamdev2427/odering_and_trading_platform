import got from 'got';
import moment from 'moment';
import { executeTransaction, findOne, insert, update } from 'core/mysql';
import { Investor, InvestorBalancesInCompanyAccounts, Stos } from 'DBSchema';
import {
  MercuryConfig,
  MercuryParam,
  MercuryTransaction,
  TransactionStatus,
} from 'services/mercury/types';
import { mercuryEndpoint } from 'services/mercury/defs';

type TargetWallet = {
  investorID: number;
  stoID: number;
};

const noteRegex = /I\d+S\d+/;

const isNoteValid = (note: string | null): boolean => noteRegex.test(note || '');

const selectValidNote = (transaction: MercuryTransaction): string | null =>
  // eslint-disable-next-line no-nested-ternary
  isNoteValid(transaction.note)
    ? transaction.note
    : isNoteValid(transaction.externalMemo)
    ? transaction.externalMemo
    : null;

const noteToRecipient = (note: string): TargetWallet => {
  const matches = note.match(noteRegex);
  if (!matches || matches.length === 0) throw new Error('incorrect format');
  const Sindex = matches[0].indexOf('S');
  const investorID = matches[0].substr(1, Sindex - 1);
  const stoID = matches[0].substr(Sindex + 1);
  return { investorID: parseInt(investorID, 10), stoID: parseInt(stoID, 10) };
};

const getRecipient = (transaction: MercuryTransaction): MercuryTransaction & TargetWallet => ({
  ...transaction,
  ...noteToRecipient(selectValidNote(transaction) || ''),
});

const containsNotePredicate = (transaction: MercuryTransaction) =>
  isNoteValid(transaction.note) || isNoteValid(transaction.externalMemo);

const checkInvestor = async (transaction: MercuryTransaction & TargetWallet): Promise<boolean> => {
  const investor = await findOne<Investor>('SELECT * FROM investor where ID=?;', [
    transaction.investorID,
  ]);
  const sto = await findOne<Stos>('SELECT * FROM stos where ID=?;', [transaction.stoID]);
  const balance = await findOne<InvestorBalancesInCompanyAccounts>(
    'SELECT * FROM InvestorBalancesInCompanyAccounts where investorID=? and stoid=?;',
    [transaction.investorID, transaction.stoID],
  );

  const insertBalanceSQL = `
       insert into InvestorBalancesInCompanyAccounts(stoid, investorID,currencyID,Amount) values(?,?,1,0);
    `;

  if (investor && sto) {
    if (!balance) {
      await insert(insertBalanceSQL, [transaction.stoID, transaction.investorID]);
    }
    return true;
  }
  return false;
};

const updateBalance = async (transaction: MercuryTransaction & TargetWallet): Promise<void> =>
  executeTransaction(async (connection) => {
    // check if idempotency key already exists
    const existingTransaction = findOne(
      'SELECT * FROM InvestorDepositReceivedAlert WHERE idempotencykey = ?',
      [transaction.id],
      connection,
    );
    if (!existingTransaction) {
      await insert(
        `INSERT INTO InvestorDepositReceivedAlert
            (investorID, isApproved, storid, DateReceived, ChannelID, Amount, Details, DateApproved, ApprovedByUserID,idempotencykey) 
            VALUES (?, '5', ?, ?, '0', ?, 'mercury transaction', now(), '-1',?);`,
        [
          transaction.investorID,
          transaction.stoID,
          new Date(transaction.createdAt),
          transaction.amount,
          transaction.id,
        ],
        connection,
      );
      await insert(
        `UPDATE InvestorBalancesInCompanyAccounts SET Amount=Amount+? WHERE stoid=? and investorID=?;`,
        [transaction.amount, transaction.stoID, transaction.investorID],
        connection,
      );
    }
  });

const statusFilter = (status: TransactionStatus) => (transaction: MercuryTransaction) =>
  transaction.status === status;

const updateLatestTransactionSQL = (currentConfig: MercuryConfig, date: Date) => {
  const sql = `UPDATE params SET intValue= ? WHERE param = "mercuryLatestTransaction"`;
  const newParam: MercuryParam = {
    ...currentConfig,
    enabled: true,
    lastProcessedTransaction: date.getTime(),
  };
  return update(sql, [JSON.stringify(newParam)]);
};

const getCreatedAt = (transaction: MercuryTransaction): number =>
  new Date(transaction.createdAt).getTime();

const updateLatestTransaction = (
  currentConfig: MercuryConfig,
  transactions: MercuryTransaction[],
) => {
  const pending = transactions.filter(statusFilter('pending')).map(getCreatedAt);
  if (pending.length > 0) {
    return updateLatestTransactionSQL(currentConfig, new Date(Math.min(...pending)));
  }
  const sent = transactions.filter(statusFilter('sent')).map(getCreatedAt);
  return updateLatestTransactionSQL(currentConfig, new Date(Math.max(...sent)));
};

const queryDateFormat = (date: Date) => moment(date).format('YYYY-MM-DD');

export default async (config: MercuryConfig): Promise<void> => {
  const startDate: string = queryDateFormat(new Date(config.lastProcessedTransaction));
  const response: any = await got(
    `${mercuryEndpoint}/account/${config.accountID}/transactions?start=${startDate}`,
    {
      method: 'GET',
      responseType: 'json',
      headers: {
        Authorization: `Bearer ${config.APIKey}`,
      },
    },
  );
  const transactions = response.body.transactions;
  await Promise.all(
    transactions
      .filter(statusFilter('sent'))
      .filter(containsNotePredicate)
      .map(getRecipient)
      .map(async (transaction: MercuryTransaction & TargetWallet) => {
        if (await checkInvestor(transaction)) {
          await updateBalance(transaction);
        }
      }),
  );
  await updateLatestTransaction(config, transactions);
};
