import * as math from "mathjs";
import AbstractSqlService from "../../../generic/AbstractSqlService";
import IWalletService from "./IWalletService";
import { InvestorBalancesInCompanyAccounts } from "../../../../Schema";

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum INTERNAL_WALLET_MODE {
  StoSpecific = 1,
  Global = 2,
  Disabled = 3,
}

export default class WalletService
  extends AbstractSqlService
  implements IWalletService
{
  async reduceInvestorBalance(
    investorId: number,
    stoId: number,
    currencyID: number,
    amount: number,
    adminID: number,
    approvalStatusID: number,
    details: string,
    CreateInvestorDepositReceivedAlert: number,
    walletProjectSpecific: number
  ): Promise<number> {
    if (walletProjectSpecific === INTERNAL_WALLET_MODE.Disabled) return 0;
    const specificStoID =
      walletProjectSpecific === INTERNAL_WALLET_MODE.Global ? 0 : stoId;

    const selectAmountSql =
      "select Amount from InvestorBalancesInCompanyAccounts where investorID = ? and currencyID = ? and stoid = ?";
    const balance = await this.runSql(selectAmountSql, [
      investorId,
      currencyID,
      specificStoID,
    ]);
    // marketSpace handles wallets off our platform, so we don't care about balances
    const isMarketSpace = (global as any).config.IsMarketSpace === 1;
    if (balance.length === 1 || isMarketSpace) {
      if (balance[0].Amount < amount && !isMarketSpace)
        throw new Error(
          "Investor does not have the required balance to perform the action"
        );

      if (!isMarketSpace) {
        const UpdateBalanceSql =
          "update InvestorBalancesInCompanyAccounts set Amount = Amount - ? where investorID = ? and currencyID = ? and stoid = ?";
        await this.runSql(UpdateBalanceSql, [
          amount,
          investorId,
          currencyID,
          specificStoID,
        ]);
      }

      let returnInsertedID = 0;
      if (CreateInvestorDepositReceivedAlert === 1) {
        const newBalance = isMarketSpace
          ? balance[0].Amount
          : math.subtract(balance[0].Amount, amount);
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
          newBalance,
        ]);
        returnInsertedID = result.insertId;
      }
      return returnInsertedID;
    }
    throw new Error("Investor do not have any amount in wallet.");
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
    walletProjectSpecific: number
  ): Promise<number> {
    if (walletProjectSpecific === INTERNAL_WALLET_MODE.Disabled) return 0;
    const specificStoID =
      walletProjectSpecific === INTERNAL_WALLET_MODE.Global ? 0 : stoId;

    const sql =
      "select Amount from InvestorBalancesInCompanyAccounts where investorID = ? and currencyID = ? and stoid = ?";
    const balance = await this.runSql(sql, [
      investorId,
      currencyID,
      specificStoID,
    ]);

    let currentBalance = 0;

    if (balance.length === 1) {
      const updateBalanceSQL =
        "update InvestorBalancesInCompanyAccounts set Amount = Amount + ? where investorID = ? and currencyID = ? and stoid = ?";
      await this.runSql(updateBalanceSQL, [
        amount,
        investorId,
        currencyID,
        specificStoID,
      ]);

      currentBalance = math.sum(balance[0].Amount, amount);
    } else {
      const insertBalanceSql =
        "insert into InvestorBalancesInCompanyAccounts(stoid, investorID, currencyID, Amount) values(?, ?, ?, ?)";
      await this.runSql(insertBalanceSql, [
        stoId,
        investorId,
        currencyID,
        amount,
      ]);

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
    walletProjectSpecific: number
  ): Promise<number> {
    if (walletProjectSpecific === INTERNAL_WALLET_MODE.Disabled) return 0;
    const specificStoID =
      walletProjectSpecific === INTERNAL_WALLET_MODE.Global ? 0 : stoId;
    const sql =
      "select Amount from InvestorBalancesInCompanyAccounts where investorID = ? and currencyID = ? and stoid = ?";
    const balance = await this.runSql(sql, [
      investorId,
      currencyID,
      specificStoID,
    ]);
    if (balance.length === 1) {
      return balance[0].Amount;
    }
    return 0;
  }

  async getInvestorSTOBalances(
    investorId: number,
    stoId: number,
    walletProjectSpecific: number
  ): Promise<InvestorBalancesInCompanyAccounts[]> {
    const specificStoID = walletProjectSpecific === 2 ? 0 : stoId;
    const sql =
      "select a.ID, c.ID as currencyID,  a.currencyID, a.Amount, a.investorID, a.stoid, c.Abbreviation, c.Country, c.Currency, c.isBlockchainBased, c.Symbol from InvestorBalancesInCompanyAccounts a, currency c where investorid = ? and a.currencyID = c.id and stoid = ?";
    const balances = await this.runSql(sql, [investorId, specificStoID]);

    return balances;
  }
}
