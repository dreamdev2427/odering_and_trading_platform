import * as math from "mathjs";
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

/**
 * Take the award value and divide it between the distributed shares. Then multiply by how many shares an investor owns.
 * All investors combined take the whole award value. They each get a % respective of how many shares they own.
 */
export default class DividendAmountDistributedSqlService
  extends AbstractSqlService
  implements IStrategyService {
  protected Shares: ISharesService; // = new SharesSqlService();

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
        `DividendAmountDistributedSqlService: undefined stoId for payout:${payout.id}`
      );
    return this.runSql(
      `SELECT * FROM sharetypes WHERE stoid = ${payout.stoId}`
      // payout.stoId
    );
  }

  async updateTotals(payout: DividendPayoutsView): Promise<void> {
    if (payout.stoId === undefined)
      throw new Error(
        `:@ DividendAmountDistributedSqlService: undefined stoId for payout:${payout.id}`
      );
    const shareTypes = await this.getShareTypes(payout);
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
    const totalAmount = payout?.awardValue;

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
        `:@@ DividendAmountDistributedSqlService: undefined stoId for payout:${payout.id}`
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

    if (payout.totalInvestorShares === 0) {
      throw new Error(
        `DividendAmountDistributedSqlService: Total Investor Shares can not be 0: division by 0`
      );
    }
    const singleShareValue = math.divide(
      math.number(payout?.awardValue),
      math.number(payout.totalInvestorShares)
    ) as number;

    const newPayouts: Omit<
      DividendInvestorPayouts,
      "id"
    >[] = investorShares.map((iShares) => ({
      payoutId: payout.id,
      investorShares: iShares.totalShares,
      investorId: iShares.investorId,
      amount: math.multiply(iShares.totalShares, singleShareValue),
      status: options?.setStatus ?? "future",
      lastUpdatedAt: new Date(),
    }));

    await this.InvestorPayouts.addFuturePayouts(newPayouts);
  }
}
