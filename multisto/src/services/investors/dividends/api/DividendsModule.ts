/* eslint-disable class-methods-use-this */
import { PoolConnection } from "mysql2/promise";
import * as math from "mathjs";
import IDividendsModule from "./IDividendsModule";
import IDividendTemplatesService from "../data/IDividendTemplatesService";
import DividendPayoutDto from "../dto/DividendPayoutDto";
import IDividendPayoutsService from "../data/IDividendPayoutsService";
import DividendPayoutsSqlService from "../data/DividendPayoutsSqlService";
import DividendTemplatesSqlService from "../data/DividendTemplatesSqlService";
import IDividendInvestorPayoutsService from "../data/IDividendInvestorPayoutsService";
import DividendInvestorPayoutsSqlService from "../data/DividendInvestorPayoutsSqlService";
import DividendTemplateInputDto from "../dto/DividendTemplateInputDto";
import AbstractSqlService, {
  SqlMethod,
} from "../../../generic/AbstractSqlService";
import {
  Currency,
  DividendPayouts,
  DividendTemplates,
} from "../../../../Schema";
import DividendInvestorPayoutDto from "../dto/DividendInvestorPayoutDto";
import IWalletService from "../../payments/wallet/IWalletService";
import WalletService from "../../payments/wallet/WalletService";
import logger from "../../../../logger";
import IStosService from "../data/IStosService";
import { StosSqlService } from "../data/StosSqlService";

import { executeTransaction } from "../../../../modules/db";

let dividendPayoutPrototype: DividendPayouts; // For type purposes

export default class DividendsModule implements IDividendsModule {
  DataSvc: AbstractSqlService;
  Templates: IDividendTemplatesService;
  Payouts: IDividendPayoutsService;
  InvestorPayouts: IDividendInvestorPayoutsService;
  Stos: IStosService;

  Wallet: IWalletService = new WalletService();

  constructor(inject?: {
    DataSvc: AbstractSqlService;
    Templates: IDividendTemplatesService;
    Payouts: IDividendPayoutsService;
    InvestorPayouts: IDividendInvestorPayoutsService;
    Stos: IStosService;
  }) {
    this.DataSvc = inject?.DataSvc ?? new DividendTemplatesSqlService();
    this.Templates = inject?.Templates ?? new DividendTemplatesSqlService();
    this.Payouts = inject?.Payouts ?? new DividendPayoutsSqlService();
    this.InvestorPayouts =
      inject?.InvestorPayouts ?? new DividendInvestorPayoutsSqlService();
    this.Stos = inject?.Stos ?? new StosSqlService();
  }

  private resetServices(method?: SqlMethod) {
    this.Templates = new DividendTemplatesSqlService(method);
    this.Payouts = new DividendPayoutsSqlService(method);
    this.InvestorPayouts = new DividendInvestorPayoutsSqlService({
      sqlMethod: method,
    });
  }

  async listFutureDividends(stoId: number): Promise<DividendPayoutDto[]> {
    await this.Payouts.createFuturesForReactivatedTemplates(stoId);
    await this._ensurePayoutCurrencies(stoId);
    // TODO: Should not calculate everything every time the page loads
    // Find out only the IDs first without joining anything, because we want to re-calculate those IDs
    const payoutIDs = await this.Payouts.listFutureIDs(stoId);
    // Re-calculate futures
    const promises = payoutIDs.map((id) => this.Payouts.calculatePayout(id));
    await Promise.all(promises);
    // Now list the full data about the futures
    const payouts = await this.Payouts.listFutures(stoId);
    return payouts;
  }

  /**
   * Makes sure to try and not have missing currencies for dividends.
   * Sets unknown currency IDs to STO default currency ID.
   */
  async _ensurePayoutCurrencies(stoId: number): Promise<void> {
    const templates = await this.Templates.list(stoId);
    const currencies = (await this.DataSvc.runSql(
      `SELECT * FROM currency`
    )) as Currency[];
    const defaultCurrencyID = await this.Stos.getDefaultCurrencyID(stoId);
    const promises = templates
      .filter(
        (template) =>
          !currencies.find((currency) => template.currencyId === currency.ID)
      )
      .map((template) =>
        this.DataSvc.runSql(
          `UPDATE DividendTemplates SET currencyId = ? WHERE id = ?`,
          [defaultCurrencyID, template.id]
        )
      );
    await Promise.all(promises);
  }

  async listAllDividendPayouts(stoId: number): Promise<DividendPayoutDto[]> {
    return this.Payouts.list(stoId);
  }

  async listStoppedDividends(stoId: number): Promise<DividendPayoutDto[]> {
    const templates = (await this.Templates.list(stoId)).filter(
      (t) => t.isActive === 0 && t.status === "used"
    );
    const payouts = await this.Payouts.list(stoId);

    const futureless: DividendPayoutDto[] = [];

    templates.forEach((template) => {
      const hasFuture = payouts.find(
        (p) => p.templateId === template.id && p.status === "future"
      );
      if (!hasFuture) {
        futureless.push(
          payouts.find((p) => p.templateId === template.id) as DividendPayoutDto
        );
      }
    });
    return futureless;
  }

  async listDividendPayouts(
    stoId: number,
    templateId: number
  ): Promise<DividendPayoutDto[]> {
    return this.Payouts.list(stoId, templateId);
  }

  async listInvestorPayouts(
    stoId: number,
    payoutId: number
  ): Promise<DividendInvestorPayoutDto[]> {
    return this.InvestorPayouts.list(stoId, payoutId);
  }

  // TODO
  // async getFuturePayout(stoId: number, templateId: number): Promise<DividendPayoutsView> {
  //   const payouts = await this.DataSvc.runSql(
  //     `SELECT FROM DividendInvestorPayoutsView
  //     WHERE templateId = ?
  //     AND status IN ('future', 'pending')`, templateId) as DividendPayoutsView[];
  // }

  async distributeDividend(
    stoId: number,
    templateId: number
  ): Promise<boolean> {
    const futures = await this.Payouts.listFutures(stoId, templateId);
    if (!futures) {
      return false;
    }
    const future = futures[0];
    await this.Payouts.distributePayout(future.id);
    return true;
  }

  protected async _ensurePayoutDistributionOrFail(
    stoId: number,
    templateId: number
    // adminId: number,
  ): Promise<void> {
    await this.distributeDividend(stoId, templateId);
  }

  /** Will throw always */
  protected async _throwTemplateFutureError(
    templateId: number,
    stoId: number
  ): Promise<void> {
    const template = (await this.Templates.list(stoId)).find(
      (t) => t.id === templateId
    );
    if (!template) throw new Error(`Template ID:${templateId} doesn't exist!`);
    throw new Error(
      `There is no future payout for template${
        template.isActive === 1 ? ` and template is deactivated.` : `.`
      }`
    );
  }

  async payDividend(
    stoId: number,
    templateId: number,
    adminId: number
  ): Promise<boolean> {
    let foundFuture: DividendPayoutDto | undefined;

    try {
      // Find future dividend payout
      const futures = await this.Payouts.listFutures(stoId, templateId);
      if (!futures.length) {
        await this._throwTemplateFutureError(templateId, stoId);
      }
      const future = futures[0];
      foundFuture = futures[0];
      await this.Payouts.changeStatus(future.id, "pending");

      // payouts now refers to investor payouts under the future payout
      let payouts: DividendInvestorPayoutDto[] = (
        await this.InvestorPayouts.list(stoId, future.id)
      ).filter(
        (payout: DividendInvestorPayoutDto) => payout.status === "future"
      );

      // Sorry about this garbage here ----------------------
      if (!payouts.length) {
        await this.distributeDividend(stoId, templateId);
        // TODO: Make this a function
        const allPayouts = await this.InvestorPayouts.list(stoId, future.id);
        payouts = allPayouts.filter(
          (payout: DividendInvestorPayoutDto) => payout.status === "future"
        );
        if (!payouts.length) {
          // Really nothing left to pay out
          // Copy-pasted from below because no time to deal with this shit anymore
          // Create new future
          const template = (await this.Templates.list(stoId)).find(
            (t) => t.id === future.templateId
          ) as DividendTemplates;
          template.status = "used";
          await this.DataSvc.runSql(
            `UPDATE DividendTemplates SET status="used" WHERE id = ?`,
            template.id
          );
          let date = new Date(future.dateTimeDue);
          if (template.periodUnit === "days") {
            date.setDate(date.getDate() + template.period);
          } else {
            date = new Date(
              date.getFullYear(),
              date.getMonth() + template.period,
              date.getDate()
            );
          }
          const newFutureId = await this.Payouts.createFuture({
            ...template,
            dateTimeDue: future.dateTimeDue,
          });
          // Have to do the totals first as for some reason they are 0 at some later point
          await this.Payouts.calculatePayout(newFutureId, {
            skipDistribution: true,
          });
          const processedPayouts = await this.InvestorPayouts.listRawForPayout(
            future.id
          );
          if (
            processedPayouts.some((p) =>
              ["rejected", "pending", "exception"].includes(p.status)
            )
          ) {
            await this.Payouts.setStatus(future.id, "pending");
          } else {
            await this.Payouts.setStatus(future.id, "completed");
          }
          return true;
        }
      }
      // ----------------------------------------------------

      // Temporarily just find the default payment channel
      // const paymentChannel = (
      //   await this.DataSvc.find<Paymentchannels, { stoId: number }>({ stoId })
      // )[0];

      // TODO: Raise payment events with dividend payout details and implement adapters to payment processors
      // For now, this is hardcoded
      await this.DataSvc.runSql(
        `INSERT INTO logs(stoid, userid, logdate, description, investorid, activitytype, recId) VALUES(?,?,NOW(),?,?,?,?)`,
        [
          stoId,
          adminId,
          `Dividend payout triggered by admin: ${future.currency?.Abbreviation} ${future.totalAmount}. Note this does not indicate any payment transaction.`,
          null,
          40,
          future.id,
        ]
      );
      logger.info(
        `Dividend payout triggered by admin: ${future.currency?.Abbreviation} ${future.totalAmount}. Note this does not indicate any payment transaction.`
      );

      const promises = payouts.map((payout: DividendInvestorPayoutDto) =>
        this._payIndividualPayout(payout)
      );

      // Execute and sum up results (counts up errors)
      type Totals = { investors: number; amount: number };
      const totals: Totals = (await Promise.all(promises)).reduce(
        (total: Totals, current) => {
          if (current !== null) {
            // eslint-disable-next-line no-param-reassign
            total.investors += 1;
            // eslint-disable-next-line no-param-reassign
            total.amount = math.add(total.amount, current) as number;
          }
          return total;
        },
        { investors: 0, amount: 0 }
      );

      // Add summary to the payout and finalize
      await this.DataSvc.runSql(
        `UPDATE DividendPayouts SET currentlyPaidAmount = ?, currentlyPaidInvestors = ? WHERE id = ?`,
        [totals.amount, totals.investors, future.id]
      );
      if (
        (totals.investors === future.investors && future.investors > 1) ||
        totals.amount === future.totalAmount
      ) {
        await this.DataSvc.runSql(
          `UPDATE DividendPayouts SET status = "completed" WHERE id = ?`,
          future.id
        );
      }

      logger.info(
        `Dividends Module: Admin ID: ${adminId} Paid out ${
          payouts[0].currency?.Abbreviation ?? "(currency)"
        } ${totals.amount} to ${
          totals.investors
        } investor(s) in Dividend Template ${
          future.title ?? future.shareType?.title ?? future.templateId
        }.\nPayout ID: ${future.id}`
      );

      // Create new future
      const template = (await this.Templates.list(stoId)).find(
        (t) => t.id === future.templateId
      ) as DividendTemplates;
      let date = new Date(future.dateTimeDue);
      if (template.periodUnit === "days") {
        date.setDate(date.getDate() + template.period);
      } else {
        date = new Date(
          date.getFullYear(),
          date.getMonth() + template.period,
          date.getDate()
        );
      }
      const newFutureId = await this.Payouts.createFuture({
        ...template,
        dateTimeDue: future.dateTimeDue,
      });
      // Have to do the totals first as for some reason they are 0 at some later point
      await this.Payouts.calculatePayout(newFutureId, {
        skipDistribution: true,
      });
      const processedPayouts = await this.InvestorPayouts.listRawForPayout(
        future.id
      );
      if (
        processedPayouts.some((p) =>
          ["rejected", "pending", "exception"].includes(p.status)
        )
      ) {
        await this.Payouts.setStatus(future.id, "pending");
      } else {
        await this.Payouts.setStatus(future.id, "completed");
      }
      return true;
    } catch (e) {
      if (foundFuture) await this.Payouts.setStatus(foundFuture.id, "pending");
      logger.error(`${(e as Error).stack}`);
      return false;
    }
  }

  /**
   * TODO: This is a placeholder, this function should call a PaymentFactory and it should resolve payments depending on the payment method
   */
  protected async _payIndividualPayout(
    payout: DividendInvestorPayoutDto
  ): Promise<number | null> {
    try {
      await this.DataSvc.runSql(
        `UPDATE DividendInvestorPayouts SET status = "pending"`
      );
      if (payout.currency === null) {
        logger.warn(
          `DividendInvestorPayout id:${payout.id} has undefined currency object in _payIndividualPayout`
        );
      }
      await this.Wallet.increaseInvestorBalance(
        payout.investorId,
        payout.stoId,
        payout.currency?.ID ?? payout.currencyId,
        payout.amount,
        payout.adminId ?? 0,
        1,
        payout.paymentChannel?.ID ?? 0,
        `Automatic payment from dividend ${
          payout.title ?? payout.shareType?.title ?? payout.templateId
        } on share type "${payout.shareType?.title ?? `All`}". Award: ${
          payout.amount
        }`,
        1,
        payout.stoId
      );
      await this.DataSvc.runSql(
        `UPDATE DividendInvestorPayouts SET status = "completed"`
      );
      await this.DataSvc.runSql(
        `INSERT INTO logs(stoid, userid, logdate, description, investorid, activitytype, recId) VALUES(?,?,NOW(),?,?,?,?)`,
        [
          payout.stoId,
          payout.adminId,
          `Dividend amount awarded by admin: ${
            payout.currency?.Abbreviation ?? "(currency)"
          } ${payout.amount} for "${payout.title}"`,
          payout.investorId,
          40,
          payout.payoutId,
        ]
      );
      logger.info(
        `Dividend amount awarded by admin: ${
          payout.currency?.Abbreviation ?? "(currency)"
        } ${payout.amount} to id:${payout.investorId} for "${payout.title}"`
      );
      return payout.amount;
    } catch (e) {
      logger.error(
        `DividendsModule: Error when paying out a dividend - not going to count towards the total value paid out and not going to mark the total payout as finished.\nDividendInvestorPayout id:${
          payout.id
        }.\nReason:\n${(e as Error).stack}`
      );
      await this.DataSvc.runSql(
        `UPDATE DividendInvestorPayouts SET status = "exception"`
      );
      return null;
    }
  }

  async updateDividends(stoId: number): Promise<void> {
    // TODO Implement
    throw new Error(`Method not implemented. ${stoId}`);
  }

  async sumDividendTotalAmount(
    stoId: number,
    shareTypeId: number,
    options?: {
      dateTimeFrom?: Date;
      dateTimeTo?: Date;
      status?: typeof dividendPayoutPrototype.status;
    }
  ): Promise<number> {
    // Get all payouts in the sto
    const payouts = (await this.Payouts.list(stoId))
      // Fitler by search options
      .filter(
        (p) =>
          (p.shareTypeId === shareTypeId || p.shareTypeId === 0) &&
          (p.status === options?.status ?? p.status) &&
          (options?.dateTimeFrom
            ? p.dateTimeFrom.valueOf() >= options.dateTimeFrom.valueOf()
            : true) &&
          (options?.dateTimeTo
            ? p.dateTimeDue.valueOf() >= options.dateTimeTo.valueOf()
            : true)
      );
    // Sum the matches
    return payouts.reduce((total, p) => total + p.totalAmount, 0);
  }

  async createDividend(
    template: Omit<DividendTemplateInputDto, "id">
  ): Promise<void> {
    let payoutId = 0;
    // await this.DataSvc.transact(async (connection) => {
    await executeTransaction(async (connection: PoolConnection) => {
      this.resetServices(this.DataSvc.connectionMethod(connection));
      const templateId = await this.Templates.create(template);
      payoutId = await this.Payouts.createFuture({
        ...template,
        id: templateId,
      });
      this.resetServices();
    });
    await this.Payouts.calculatePayout(payoutId);
  }

  async modifyDividend(template: DividendTemplateInputDto): Promise<void> {
    // Todo Must create a new template with the historyID of the old one
    await this.DataSvc.transact(async (connection) => {
      this.resetServices(connection.query);
      await this.Templates.update(template);
      await this.Payouts.deleteFuture(template);
      await this.Payouts.createFuture(template);
      this.resetServices();
    });
  }

  async deleteDividend(templateId: number): Promise<void> {
    // TODO Implement
    throw new Error(`Method not implemented. ${templateId}`);
  }

  async purgeDividend(templateId: number): Promise<void> {
    const [template] = await this.DataSvc.runSql(
      `SELECT * FROM DividendTemplates WHERE id = ?`,
      templateId
    );
    if (!template) {
      throw new Error(`Template id:${templateId} not found`);
    }

    const payouts = (await this.DataSvc.runSql(
      `SELECT * FROM DividendPayouts WHERE templateId = ?`,
      templateId
    )) as DividendPayouts[];
    const payoutIds = payouts.map((p) => p.id);
    if (payoutIds.length) {
      await this.DataSvc.runSql(
        `DELETE FROM DividendInvestorPayouts WHERE payoutId IN (${payoutIds.join()})`
      );
      await this.DataSvc.runSql(
        `DELETE FROM DividendPayouts WHERE id IN (${payoutIds.join()})`
      );
    }
    await this.DataSvc.runSql(
      `DELETE FROM DividendTemplates WHERE id = ?`,
      templateId
    );
    await this.DataSvc.runSql(
      `INSERT INTO logs(stoid, userid, logdate, description, investorid, activitytype) VALUES(?,?,NOW(),?,?,?)`,
      [
        template.stoId,
        template.adminId,
        `Dividend records for template with id:${template.id} "${template.title}" were deleted by admin`,
        null,
        41,
      ]
    );
    logger.info(
      `Dividend records for template with id:${template.id} "${template.title}" were deleted by admin`
    );
  }

  async updateIsActive(
    templateId: number,
    isActive: boolean
  ): Promise<boolean> {
    return this.Templates.updateIsActive(templateId, isActive ? 1 : 0);
  }

  async updateAwardValue(
    templateId: number,
    awardValue: number
  ): Promise<void> {
    return this.Payouts.updateFutureAwardValue(templateId, awardValue);
  }
}
