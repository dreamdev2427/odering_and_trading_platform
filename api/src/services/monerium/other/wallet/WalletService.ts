import { INTERNAL_WALLET_MODE } from 'core/envs';
import AbstractSqlService from '../sql/AbstractSqlService';
import IWalletService from './IWalletService';

export default class WalletService extends AbstractSqlService implements IWalletService {
  async reduceInvestorBalance(
    investorId: number,
    stoId: number,
    currencyID: number,
    amount: number,
    adminID: number,
    approvalStatusID: number,
    details: string,
    CreateInvestorDepositReceivedAlert: number,
    walletProjectSpecific: number,
  ): Promise<number> {
    if (walletProjectSpecific === INTERNAL_WALLET_MODE.Disabled) return 0;
    const specificStoID = walletProjectSpecific === INTERNAL_WALLET_MODE.StoSpecific ? 0 : stoId;

    const selectAmountSql =
      'select Amount from InvestorBalancesInCompanyAccounts where investorID = ? and currencyID = ? and stoid = ?';
    const balance = await this.runSql(selectAmountSql, [investorId, currencyID, specificStoID]);
    if (balance.length === 1) {
      if (balance[0].Amount < amount)
        throw new Error('Investor do not have required balance to reduce');

      const UpdateBalanceSql =
        'update InvestorBalancesInCompanyAccounts set Amount = Amount - ? where investorID = ? and currencyID = ? and stoid = ?';
      await this.runSql(UpdateBalanceSql, [amount, investorId, currencyID, specificStoID]);

      let returnInsertedID = 0;
      if (CreateInvestorDepositReceivedAlert === 1) {
        const DepositAlertSql = `insert into InvestorDepositReceivedAlert(storid, investorid, isApproved, DateReceived, ChannelID, Amount, Details, DateApproved, ApprovedByUserID, currencyID, runningBalance)  values (?, ?,  ?, now(), ?, ?, ?, now(), ?, ?, ? )`;
        const result = await this.runSql(DepositAlertSql, [
          specificStoID,
          investorId,
          approvalStatusID,
          -1,
          amount,
          details,
          adminID,
          currencyID,
          balance[0].Amount - amount,
        ]);
        returnInsertedID = result.insertId;
      }
      return returnInsertedID;
    }
    throw new Error('Investor do not have any amount in wallet.');
  }

  async increaseInvestorBalance(
    investorId: number,
    stoId: number,
    currencyID: number,
    amount: number,
    adminID: number,
    approvalStatusID: number,
    channelID: number,
    details: string,
    CreateInvestorDepositReceivedAlert: number,
    walletProjectSpecific: number,
  ): Promise<number> {
    if (walletProjectSpecific === INTERNAL_WALLET_MODE.Disabled) return 0;
    const specificStoID = walletProjectSpecific === INTERNAL_WALLET_MODE.StoSpecific ? 0 : stoId;

    const sql =
      'select Amount from InvestorBalancesInCompanyAccounts where investorID = ? and currencyID = ? and stoid = ?';
    const balance = await this.runSql(sql, [investorId, currencyID, specificStoID]);

    let currentBalance = 0;

    if (balance.length === 1) {
      const updateBalanceSQL =
        'update InvestorBalancesInCompanyAccounts set Amount = Amount + ? where investorID = ? and currencyID = ? and stoid = ?';
      await this.runSql(updateBalanceSQL, [amount, investorId, currencyID, specificStoID]);

      currentBalance = balance[0].Amount + amount;
    } else {
      const insertBalanceSql =
        'insert into InvestorBalancesInCompanyAccounts(stoid, investorID, currencyID, Amount) values(?, ?, ?, ?)';
      await this.runSql(insertBalanceSql, [stoId, investorId, currencyID, amount]);

      currentBalance = amount;
    }

    let returnInsertedID = 0;
    if (CreateInvestorDepositReceivedAlert === 1) {
      const insertDepositAlert = `Insert into InvestorDepositReceivedAlert(storid, investorid, isApproved, DateReceived, ChannelID, Amount, Details, DateApproved, ApprovedByUserID, currencyID, runningBalance)  values (?, ?,  ?, now(), ?, ?, ?, now(), ?, ?, ? )`;
      const result = await this.runSql(insertDepositAlert, [
        specificStoID,
        investorId,
        approvalStatusID,
        channelID,
        amount,
        details,
        adminID,
        currencyID,
        currentBalance,
      ]);
      returnInsertedID = result.insertId;
    }
    return returnInsertedID;
  }

  async getInvestorBalance(
    investorId: number,
    stoId: number,
    currencyID: number,
    walletProjectSpecific: number,
  ): Promise<number> {
    if (walletProjectSpecific === INTERNAL_WALLET_MODE.Disabled) return 0;
    const specificStoID = walletProjectSpecific === INTERNAL_WALLET_MODE.StoSpecific ? 0 : stoId;
    const sql =
      'select Amount from InvestorBalancesInCompanyAccounts where investorID = ? and currencyID = ? and stoid = ?';
    const balance = await this.runSql(sql, [investorId, currencyID, specificStoID]);
    if (balance.length === 1) {
      return balance[0].Amount;
    }
    return 0;
  }
}
