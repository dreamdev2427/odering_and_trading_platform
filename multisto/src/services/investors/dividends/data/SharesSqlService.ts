import { Shares, Shareshistory, Sharetypes } from "../../../../Schema";
import AbstractSqlService from "../../../generic/AbstractSqlService";
import SharesHistoryDto from "../dto/SharesHistoryDto";
import TotalSharesDto from "../dto/TotalSharesDto";
import ISharesService from "./ISharesService";

export default class SharesSqlService
  extends AbstractSqlService
  implements ISharesService {
  async getTotalDistributedSharesAndCost(
    shareTypes: Sharetypes[]
  ): Promise<TotalSharesDto> {
    const ids = shareTypes.map((st) => st.ID);
    const [result] = await this.runSql(`SELECT
            COALESCE(SUM(shares), 0) as totalShares,
            COALESCE(SUM(premimum * shares), 0) as totalCost,
            COALESCE(COUNT(DISTINCT(investorID)), 0) AS investors
        FROM shares
        INNER JOIN sharetypes st ON shares.shareTypeid = st.ID
        WHERE shareTypeid IN (${ids.join(`,`)})`);
    return result;
  }
  async getSharesOfType(shareTypes: Sharetypes[]): Promise<Shares[]> {
    return this.getSharesOfTypeId(shareTypes.map((st) => st.ID));
  }
  async getSharesOfTypeId(shareTypeIds: number[]): Promise<Shares[]> {
    return this.runSql(
      `SELECT * FROM shares WHERE shareTypeid IN (${shareTypeIds.join(`,`)})`
    );
  }
  async joinSharesHistory(shares: Shares[]): Promise<SharesHistoryDto[]> {
    const ids = shares.map((s) => s.ID);
    const histories: Shareshistory[] = await this.runSql(
      `SELECT * FROM Shareshistory WHERE sharesid IN (${ids.join(`,`)})`
    );
    return shares.map((s) => ({
      ...s,
      sharesHistory: histories.find((history) => history.sharesid === s.ID),
    }));
  }
}
