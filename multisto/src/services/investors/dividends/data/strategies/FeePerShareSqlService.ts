import * as math from "mathjs";
import logger from "../../../../../logger";
import {
  DividendInvestorPayouts,
  DividendPayoutsView,
  Sharetypes,
} from "../../../../../Schema";
import AbstractSqlService, {
  SqlMethod,
} from "../../../../generic/AbstractSqlService";
import DividendInvestorPayoutsSqlService from "../DividendInvestorPayoutsSqlService";
import IDividendInvestorPayoutsService from "../IDividendInvestorPayoutsService";
import ISharesService from "../ISharesService";
import SharesSqlService from "../SharesSqlService";
import IStrategyService from "./IStrategyService";

export default class FeePerShareSqlService
  extends AbstractSqlService
  implements IStrategyService {
  protected Shares: ISharesService;

  protected InvestorPayouts: IDividendInvestorPayoutsService;

  constructor(inject?: {
    Shares?: ISharesService;
    InvestorPayouts?: IDividendInvestorPayoutsService;
    sqlMethod?: SqlMethod;
  }) {
    super(inject?.sqlMethod);
    this.Shares = inject?.Shares ?? new SharesSqlService();
    this.InvestorPayouts =
      inject?.InvestorPayouts ?? new DividendInvestorPayoutsSqlService();
  }

  private async getShareTypes(
    payout: DividendPayoutsView
  ): Promise<Sharetypes[]> {
    if ((payout.shareTypeId ?? 0) > 0) {
      // If "ALL" share types selected
      return this.runSql(
        `SELECT * FROM sharetypes WHERE ID = ?`,
        payout.shareTypeId
      );
    }
    if (payout.stoId === undefined)
      throw new Error(
        `FeePerShareSqlService: undefined stoId for payout:${payout.id}`
      );
    return this.runSql(
      `SELECT * FROM sharetypes WHERE stoid = ${payout.stoId}`
      // payout.stoId
    );
  }

  async updateTotals(payout: DividendPayoutsView): Promise<void> {
    if (payout.stoId === undefined)
      throw new Error(
        `:@ FeePerShareSqlService: undefined stoId for payout:${payout.id}`
      );
    const shareTypes = await this.getShareTypes(payout);
    // const shareTypeIds = shareTypes.map(st => st.ID);
    const totalSharesDto = await this.Shares.getTotalDistributedSharesAndCost(
      shareTypes
    );
    const totalInvestorShares = totalSharesDto.totalShares;
    const investors = totalSharesDto.investors;
    let totalCompanyShares = shareTypes.reduce(
      (sum, shareType) => math.add(sum, shareType.companyShares ?? 0) as number,
      0
    );
    totalCompanyShares =
      totalCompanyShares > 9999999999 ? 9999999999 : totalCompanyShares; // Max < 10 bil.

    // This is strategy-specific
    const totalAmount = math.multiply(
      totalInvestorShares ?? 0,
      payout?.awardValue ?? 0
    ) as number;
    if (!payout?.awardValue) {
      logger.warn(
        `In FeePerShareSqlService: payout.awardValue is null or zero`
      );
    }

    await this.runSql(
      `UPDATE DividendPayouts SET
            lastUpdatedAt = NOW(),
            totalAmount = ?,
            companyShares = ?,
            totalInvestorShares = ?,
            investors = ?
        WHERE id = ?`,
      [
        totalAmount,
        totalCompanyShares,
        totalInvestorShares ?? 0,
        investors,
        payout.id,
      ]
    );
  }

  async distributePayout(
    payout: DividendPayoutsView,
    options?: { setStatus: "future" | "pending" }
  ): Promise<void> {
    await this.updateTotals(payout);
    // eslint-disable-next-line no-param-reassign
    [payout] = await this.runSql(
      `SELECT * FROM DividendPayoutsView WHERE ID = ?`,
      payout.id
    );

    if (payout.stoId === undefined)
      throw new Error(
        `:@@ FeePerShareSqlService: undefined stoId for payout:${payout.id}`
      );

    const shareTypes = await this.getShareTypes(payout);
    const sharesBought = await this.Shares.getSharesOfType(shareTypes);

    const investorIdSet: Set<number> = new Set<number>(); // Guarantee unique IDs only
    sharesBought.forEach((s) => investorIdSet.add(s.investorID));
    let investorIds = Array.from(investorIdSet.values());
    // Filter out bad IDs that were deleted but hold shares somehow
    const existingIds =
      (investorIds.length &&
        ((await this.runSql(
          `SELECT id FROM investor WHERE id IN (${investorIds.join()})`
        )) as { id: number }[]).map((i) => i.id)) ||
      [];
    investorIds = investorIds.filter((id) => existingIds.includes(id));

    const investorShares: {
      investorId: number;
      totalShares: number;
    }[] = investorIds.map((iid) => ({
      investorId: iid,
      totalShares: sharesBought
        .filter((s) => s.investorID === iid)
        .reduce((sum, s) => math.add(sum, math.number(s.shares)) as number, 0),
    }));
    // All above this point can be generalized

    const investorPayouts: Omit<
      DividendInvestorPayouts,
      "id"
    >[] = investorShares.map((iShares) => ({
      payoutId: payout.id,
      investorShares: iShares.totalShares,
      investorId: iShares.investorId,
      amount: math.multiply(
        iShares.totalShares,
        payout.awardValue ??
          0 /** This is coalesced with template.awardValue in the SQL View, MySQL Schema is wrong */
      ), // Future: Make as a dynamic formula
      status: options?.setStatus ?? "future",
      lastUpdatedAt: new Date(),
    }));

    await this.InvestorPayouts.addFuturePayouts(investorPayouts);
  }
}
