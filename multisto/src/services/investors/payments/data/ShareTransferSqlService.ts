import * as math from "mathjs";
import logger from "../../../../logger";
import { Investor, Shares, Sharetypes } from "../../../../Schema";
import AbstractSqlService from "../../../generic/AbstractSqlService";
import IShareTransferService from "./IShareTransferService";
import IWalletService from "../wallet/IWalletService";
import WalletService from "../wallet/WalletService";
import ShareTypeSqlService from "./ShareTypeSqlService";
import InvestorSqlService from "./InvestorSqlService";

export default class ShareTransferSqlService
  extends AbstractSqlService
  implements IShareTransferService
{
  ShareType = new ShareTypeSqlService();
  Investor = new InvestorSqlService();

  async transferShares(
    investorId: number,
    stoId: number,
    shareTypeId: number,
    tokensToTransfer: number,
    adminID: number,
    sellback: boolean
  ): Promise<void> {
    // Begin transaction
    // await this.transactionSvc.begin();
    // try {

    const [shareTypeRecord]: Sharetypes[] = await this.runSql(
      `SELECT * FROM sharetypes WHERE id=? AND stoid=?`,
      [shareTypeId, stoId]
    );

    const shareInvestorRecord: Shares[] = await this.runSql(
      `SELECT * FROM shares WHERE investorid = ? AND stoid = ? AND sharetypeid = ?`,
      [investorId, stoId, shareTypeId]
    );

    // runtime these are actually string so force converting them
    if (
      math.number(tokensToTransfer) >
      math.number(shareTypeRecord.companyShares || 0)
    ) {
      throw new Error(
        "Share Transfer Service - More shares are being transferred than the company available balance"
      );
    }

    if (sellback) {
      await this.reduceSharesFromInvestor(
        investorId,
        stoId,
        shareTypeId,
        tokensToTransfer,
        adminID,
        shareTypeRecord,
        shareInvestorRecord
      );
    } else {
      await this.addSharesToInvestor(
        investorId,
        stoId,
        shareTypeId,
        tokensToTransfer,
        adminID,
        shareTypeRecord,
        shareInvestorRecord
      );
    }

    const logDescription = `
      ${tokensToTransfer} shares of ${shareTypeRecord.title} 
      transferred to ${sellback ? "Investor" : "Company"}`;
    await this.runSql(
      `INSERT INTO logs(UserID, LogDate, Description, InvestorID, ActivityType, stoid) VALUES (?,NOW(), ?,?,?,?)`,
      [adminID, logDescription, investorId, 5, stoId]
    );

    await this.increaseLimitBalance({
      investorId,
      shareTypeId,
      tokensToTransfer,
    });
  }

  async addSharesToInvestor(
    investorId: number,
    stoId: number,
    shareTypeId: number,
    tokensToTransfer: number,
    adminID: number,
    shareTypeRecord: Sharetypes,
    shareInvestorRecord: Shares[]
  ): Promise<void> {
    let sql = "";
    let data = [];
    let totalShares = 0;

    if (shareInvestorRecord.length > 0) {
      totalShares = math.number(
        math.add(
          shareInvestorRecord[0].shares || 0,
          tokensToTransfer
        ) as math.BigNumber
      ) as number;

      sql =
        "UPDATE shares SET shares = ? WHERE investorid=? AND stoid=? AND sharetypeid = ?";
      data = [totalShares, investorId, stoId, shareTypeId];
    } else {
      totalShares = tokensToTransfer;
      sql =
        "INSERT INTO shares(shares, investorID, stoid, shareTypeid, sharesHistoryID) VALUES (?, ?, ?, ?, ?)";
      data = [totalShares, investorId, stoId, shareTypeId, 0];
    }
    await this.runSql(sql, data);

    const sharesWalletRecord = await this.runSql(
      `SELECT * FROM shareswallet WHERE investorID=? AND sharesID=? AND publicKey='platform'`,
      [investorId, shareTypeId]
    );

    if (sharesWalletRecord.length === 0) {
      sql = `INSERT INTO shareswallet(investorID, sharesID, shares, publicKey, isBlocked) VALUES(?, ?, ?, 'platform', 0)`;
      data = [investorId, shareTypeId, tokensToTransfer];
    } else {
      sql = `UPDATE shareswallet SET shares = shares + ? WHERE investorID=? AND sharesID=? AND publicKey='platform'`;
      data = [tokensToTransfer, investorId, shareTypeId];
    }
    await this.runSql(sql, data);

    const companyShares =
      math.subtract(
        shareTypeRecord.companyShares ?? 0,
        tokensToTransfer ?? 0
      ) ?? 0;

    await this.runSql(
      `UPDATE sharetypes SET companyShares = ? WHERE id=? AND stoid=?`,
      [companyShares, shareTypeId, stoId]
    );

    logger.info(
      `Transferred ${tokensToTransfer} shares of type id:${shareTypeId} to investor id:${investorId} in sto id:${stoId} by admin id:${adminID}`
    );
  }

  async reduceSharesFromInvestor(
    investorId: number,
    stoId: number,
    shareTypeId: number,
    tokensToTransfer: number,
    adminID: number,
    shareTypeRecord: Sharetypes,
    shareInvestorRecord: Shares[]
  ): Promise<void> {
    let totalShares = 0;

    if (shareInvestorRecord.length > 0) {
      totalShares = math.number(
        math.subtract(
          shareInvestorRecord[0].shares || 0,
          tokensToTransfer
        ) as math.BigNumber
      ) as number;

      await this.runSql(
        `UPDATE shares SET shares = ? WHERE investorid=? AND stoid=? AND sharetypeid = ?`,
        [totalShares, investorId, stoId, shareTypeId]
      );
    } else {
      throw new Error(
        "Share Transfer Service - reduceSharesFromInvestor - Investor does not have any shares to sell back"
      );
    }

    const sharesWalletRecord = await this.runSql(
      `SELECT * FROM shareswallet WHERE investorID=? AND sharesID=? AND publicKey='platform'`,
      [investorId, shareTypeId]
    );

    if (!(sharesWalletRecord.length === 0)) {
      await this.runSql(
        `UPDATE shareswallet SET shares = shares - ? WHERE investorID=? AND sharesID=? AND publicKey='platform'`,
        [tokensToTransfer, investorId, shareTypeId]
      );
    } else {
      throw new Error(
        "Share Transfer Service - reduceSharesFromInvestor - Investor does not have a shares wallet record"
      );
    }

    const companyShares =
      math.sum(shareTypeRecord.companyShares ?? 0, tokensToTransfer ?? 0) ?? 0;
    logger.info(
      `New company share total should be: ${companyShares} from ${shareTypeRecord.companyShares} + ${tokensToTransfer}`
    );
    await this.runSql(
      `UPDATE sharetypes SET companyShares = ? WHERE id=? AND stoid=?`,
      [companyShares, shareTypeId, stoId]
    );

    logger.info(
      `Transferred ${tokensToTransfer} shares of type id:${shareTypeId} from investor id:${investorId} back to company shares in sto id:${stoId} by admin id:${adminID}`
    );
  }

  async increaseLimitBalance(options: {
    tokensToTransfer: number;
    shareTypeId: number;
    investorId: number;
  }): Promise<void> {
    try {
      const shareType = await this.ShareType.findOne<Sharetypes>({
        ID: options.shareTypeId,
      });
      const investor = await this.Investor.findOne<Investor>({
        ID: options.investorId,
      });
      if (investor.allowedTotalInvestment > 0) {
        const yearlyTotalInvestment = math.add(
          investor.yearlyTotalInvestment,
          math.multiply(shareType.premimum ?? 1, options.tokensToTransfer ?? 0)
        ) as number;
        await this.runSql(
          `UPDATE investor SET yearlyTotalInvestment = ?`,
          yearlyTotalInvestment
        );
      }
    } catch (e) {
      logger.error(
        `In ShareTransferSqlService: Could not add to investor limit balance:\n${
          (e as Error).stack
        }`
      );
    }
  }

  async transferSharesToInvestorWallets(
    investorId: number,
    stoId: number,
    shareTypeId: number,
    tokensToTransfer: number,
    adminID: number,
    amountToReduce: number,
    walletProjectSpecific: number
  ): Promise<void> {
    //  share transfer automation
    let sql =
      "SELECT title, currencyid, isblockchain, walletCustodayType, tanganyWalletID FROM sharetypes WHERE id = ? AND stoid = ?";
    const shareTypeRecord = await this.runSql(sql, [shareTypeId, stoId]);

    if (!shareTypeRecord.length) {
      throw new Error(
        `transferSharesToInvestorWallets - shareTypeID ${shareTypeId} does not belong to ${stoId} aborting share transfer`
      );
    }

    // Reduce the investor balance if required
    if (amountToReduce > 0) {
      const walletService: IWalletService = new WalletService();
      const bal = await walletService.getInvestorBalance(
        investorId,
        stoId,
        shareTypeRecord[0].currencyid,
        walletProjectSpecific
      );
      if (amountToReduce > bal) {
        throw new Error(
          `transferSharesToInvestorWallets - investor do not have enough funds to buy shares. `
        );
      } else {
        await walletService.reduceInvestorBalance(
          investorId,
          stoId,
          shareTypeRecord[0].currencyid,
          amountToReduce,
          adminID,
          5,
          `${tokensToTransfer}  ${shareTypeRecord[0].title} Shares transferred to investor`,
          1,
          walletProjectSpecific
        );
      }
    }

    if (!shareTypeRecord[0].isblockchain) {
      await this.transferShares(
        investorId,
        stoId,
        shareTypeId,
        tokensToTransfer,
        adminID,
        false
      );
    } else if (shareTypeRecord[0].walletCustodayType === 1) {
      // 1 = Tangany wallet type

      sql =
        "SELECT publicKey FROM shareswallet WHERE investorID = ? AND sharesID = ? AND isBlocked = 0 AND publickey != 'platform'";
      const shareTypeRecords = await this.runSql(sql, [
        investorId,
        shareTypeId,
      ]);

      if (shareTypeRecords.length > 0) {
        sql = `INSERT INTO blockchainSharesTransferTransactions (hostname, toAddress, stoid, adminID, investorID, shareTypeID, amountToSend, investmentDetails, investmentAmount, reduceInvestorBalance, status, transactionID, recordDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, '', now())`;

        await this.runSql(sql, [
          "",
          shareTypeRecords[0].publicKey,
          stoId,
          -1,
          investorId,
          shareTypeId,
          tokensToTransfer,
          `${tokensToTransfer}  ${shareTypeRecord[0].title} Shares transferred to investor`,
          amountToReduce,
          0,
        ]);

        logger.error(
          `transferSharesToInvestorWallets - Blockchain transaction added in DB`
        );
      } else {
        // transfer shares off-chain
        await this.transferShares(
          investorId,
          stoId,
          shareTypeId,
          tokensToTransfer,
          adminID,
          false
        );
      }
    } else {
      // 0 = This is the default custody type that needs private key so transfer off-chain
      await this.transferShares(
        investorId,
        stoId,
        shareTypeId,
        tokensToTransfer,
        adminID,
        false
      );
    }
  }
}
