import {
  Currency,
  DividendInvestorPayouts,
  DividendPayouts,
  DividendPayoutsView,
  DividendTemplates,
  Paymentchannels,
  Sharetypes,
} from "../../../../Schema";
import AbstractSqlService from "../../../generic/AbstractSqlService";
import DividendPayoutDto from "../dto/DividendPayoutDto";
import DividendTemplateInputDto from "../dto/DividendTemplateInputDto";
import IDividendPayoutsService from "./IDividendPayoutsService";
import StrategyFactory from "./strategies/StrategyFactory";
import StosSvc from "./StosSqlService";

let prototype: DividendPayouts;

export default class DividendPayoutsSqlService
  extends AbstractSqlService
  implements IDividendPayoutsService {
  readonly tableName = "DividendPayouts";

  async _constructDTOs(
    payouts: DividendPayoutsView[],
    stoId: number
  ): Promise<DividendPayoutDto[]> {
    const shareTypes: Sharetypes[] = await this.runSql(
      `SELECT * FROM sharetypes WHERE stoid = ${stoId}`
    );
    const channels: Paymentchannels[] = await this.runSql(
      `SELECT * FROM paymentchannels WHERE stoid = ${stoId}`
    );
    const currencies: Currency[] = await this.runSql(`SELECT * FROM currency`);

    const defaultCurrencyId = await StosSvc.getDefaultCurrencyID(stoId);

    return payouts.map((p) => ({
      ...p,
      currencyId: p.currencyId ?? defaultCurrencyId,
      shareType: shareTypes.find((s) => s.ID === p.shareTypeId),
      paymentChannel: channels.find((c) => c.ID === p.channelId),
      currency: currencies.find(
        (c) => c.ID === (p.currencyId ?? defaultCurrencyId)
      ) as Currency,
    }));
  }

  async list(stoId: number, templateId?: number): Promise<DividendPayoutDto[]> {
    const templateSql = templateId ? `AND templateId = ?` : ``;
    const sql = `SELECT * FROM DividendPayoutsView p WHERE p.stoId = ? ${templateSql}`;
    let payoutsRaw: DividendPayoutsView[] = ((await this.runSql(sql, [
      stoId,
      templateId,
    ])) as DividendPayoutsView[]).map((p) => ({
      ...p,
      // Convert to number. For some reason, currencyId is a string on Ownez deployment
      currencyId: p.currencyId ? +p.currencyId : undefined,
    }));
    payoutsRaw = await this._markCompleted(payoutsRaw);
    const payouts = await this._constructDTOs(payoutsRaw, stoId);
    return payouts;
  }

  async _listRaw(
    stoId: number,
    templateId?: number
  ): Promise<DividendPayoutsView[]> {
    const templateSql = templateId ? `AND templateId = ?` : ``;
    const sql = `SELECT * FROM DividendPayoutsView WHERE stoId = ? ${templateSql}`;
    return this.runSql(sql, [stoId, templateId]);
  }

  /**
   * Check all investor payouts within a list of total payouts,
   * and set the total payout status to 'completed' if applicable.
   * This is needed if a crash occurrs before a payout finishes, but all individual transactions are actually done
   * @param payouts list of total payouts to check
   * @returns new payouts list with updated status
   */
  async _markCompleted(
    payouts: DividendPayoutsView[]
  ): Promise<DividendPayoutsView[]> {
    const promises = payouts.map(
      async (payout: DividendPayoutsView): Promise<DividendPayoutsView> => {
        const invPayouts = (await this.runSql(
          `SELECT * FROM DividendInvestorPayouts WHERE payoutId = ?`,
          payout.id
        )) as DividendInvestorPayouts[];
        const changeStatus =
          invPayouts.every((ip) => ip.status === "completed") &&
          payout.status !== "completed" &&
          payout.status !== "future";
        if (changeStatus) {
          await this.changeStatus(payout.id, "completed");
        }
        // TODO: Investigate this. This is how the condition should be normally.
        // For some reason brand new future payouts turn into "completed"
        // (they don't have any "completed" invPayouts in them, only "future", while the .every() condition somehow assumes they all are completed)
        // const oldCondition = invPayouts.every((ip) => ip.status === "completed") && payout.status !== "completed";
        // if (oldCondition) {
        //   console.error(`Is .every completed?`);
        //   console.info(invPayouts.every((ip) => ip.status === "completed"))
        //   console.info(`Payout ID: ${payout.id}`);
        //   console.info(`IPayouts IDs: ${invPayouts.map(ip => ip.id).join()}`);
        // }
        return {
          ...payout,
          ...(changeStatus && { status: "completed" }),
        };
      }
    );
    return Promise.all(promises);
  }

  async createFuturesForReactivatedTemplates(stoId: number): Promise<void> {
    const templates = (await this.runSql(
      `SELECT * FROM DividendTemplates WHERE stoId = ? AND isActive = 1`,
      stoId
    )) as DividendTemplates[];
    const payouts = await this.list(stoId);
    const promises = templates.map(async (t) => {
      const hasFuture = payouts.find(
        (p) => p.templateId === t.id && p.status !== "completed"
      );
      // In this case, we need to know when to create a new future. Only if "completed".
      // Explanation: We've turned off the auto-renew and done the last payout. The last payout should be "completed".
      // We've turned on auto-renew again. There should be a new future payout.
      if (!hasFuture) {
        // console.log(`Creating future for ${t.id}`);
        // const future =
        await this.createFuture({ ...t, dateTimeDue: new Date() });
        // console.log(future);
      } else await Promise.resolve();
    });
    await Promise.all(promises);
  }

  async listFutures(
    stoId: number,
    templateId?: number
  ): Promise<DividendPayoutDto[]> {
    const all = await this.list(stoId, templateId);
    return all.filter((p) => p.status === "future" || p.status === "pending");
  }

  async listFutureIDs(
    stoId: number,
    templateId?: number | undefined
  ): Promise<number[]> {
    const all = await this._listRaw(stoId, templateId);
    const futures = all.filter(
      (p) => p.status === "future" || p.status === "pending"
    );
    return futures.map((f) => f.id);
  }

  create(payout: Omit<DividendPayouts, "id">): Promise<number> {
    const sql = `INSERT INTO DividendPayouts(
            templateId, dateTimeFrom, dateTimeDue, lastUpdatedAt, status, totalAmount, companyShares, totalInvestorShares, investors
        ) VALUES (?,?,?,?,?,?,?,?,?)`;
    return this.runSql(sql, [
      payout.templateId,
      this.toSqlDateTime(payout.dateTimeFrom),
      this.toSqlDateTime(payout.dateTimeDue),
      payout.lastUpdatedAt ? this.toSqlDateTime(payout.lastUpdatedAt) : "NULL",
      payout.status,
      payout.totalAmount,
      payout.companyShares,
      payout.totalInvestorShares ?? 0,
      payout.investors,
    ]);
  }

  // eslint-disable-next-line class-methods-use-this
  private addTemplatePeriod(template: DividendTemplateInputDto): Date {
    const date = template.dateTimeDue;
    let newDate;
    switch (template.periodUnit) {
      default:
      case "days":
        newDate = new Date(date.setDate(date.getDate() + template.period));
        break;
      case "months":
        newDate = new Date(date.setDate(date.getMonth() + template.period));
        break;
    }
    return newDate;
  }
  async createFuture(template: DividendTemplateInputDto): Promise<number> {
    const payout: Omit<DividendPayouts, "id"> = {
      templateId: template.id,
      dateTimeFrom: new Date(),
      dateTimeDue: template.dateTimeDue,
      // dateTimeDue: this.addTemplatePeriod(template),
      lastUpdatedAt: new Date(),
      totalAmount: 0,
      companyShares: 0,
      totalInvestorShares: 0,
      investors: 0,
      status: "future",
      currentlyPaidAmount: 0,
      currentlyPaidInvestors: 0,
    };
    return this.insert<Omit<DividendPayouts, "id">>(payout);
  }
  async fetchPayoutWithTemplate(
    payoutId: number
  ): Promise<DividendPayoutsView> {
    const payoutSql = `SELECT * FROM DividendPayoutsView WHERE id = ?`;
    const [payout] = await this.runSql(payoutSql, payoutId);
    return payout;
  }

  async calculatePayout(
    payoutId: number,
    options?: { skipDistribution?: boolean }
  ): Promise<void> {
    const payout = await this.fetchPayoutWithTemplate(payoutId);
    const strategy = StrategyFactory.createStrategy(payout);

    if (options?.skipDistribution !== true) {
      // Also updates totals
      await strategy.distributePayout(payout);
    } else {
      await strategy.updateTotals(payout);
    }
  }

  async changeStatus(
    payoutId: number,
    status: typeof prototype.status
  ): Promise<void> {
    return this.runSql(`UPDATE DividendPayouts SET status = ? WHERE id = ?`, [
      status,
      payoutId,
    ]);
  }
  async distributePayout(payoutId: number): Promise<void> {
    const payout = await this.fetchPayoutWithTemplate(payoutId);
    const strategy = StrategyFactory.createStrategy(payout);
    await strategy.distributePayout(payout);
  }

  async deleteFuture(template: DividendTemplates): Promise<number> {
    return this.runSql(
      `DELETE FROM DividendPayouts WHERE status="future" AND templateId = ?`,
      template.id
    );
  }

  async updateFutureAwardValue(
    templateId: number,
    awardValue: number
  ): Promise<void> {
    const [future] = (await this.runSql(
      `SELECT * FROM DividendPayouts WHERE status = "future" AND templateId = ?`,
      templateId
    )) as DividendPayouts[];
    if (!future) {
      throw new Error(`No future for this template ID: ${templateId}`);
    }
    await this.runSql(
      `UPDATE DividendPayouts SET awardValue = ? WHERE id = ?;`,
      [awardValue, future.id]
    );
    await this.calculatePayout(future.id);
  }

  async setStatus(
    payoutId: number,
    status: DividendPayouts["status"]
  ): Promise<void> {
    return this.runSql(`UPDATE DividendPayouts SET status = ? WHERE id = ?`, [
      status,
      payoutId,
    ]);
  }
}
