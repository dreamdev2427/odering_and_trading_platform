import {
  Currency,
  DividendInvestorPayouts,
  DividendInvestorPayoutsView,
  Investor,
  Paymentchannels,
  Sharetypes,
} from "../../../../Schema";
import AbstractSqlService, {
  SqlMethod,
} from "../../../generic/AbstractSqlService";
import DividendInvestorPayoutDto from "../dto/DividendInvestorPayoutDto";
import { CurrencySqlService } from "./CurrencySqlService";
import helpers from "./helpers";
import ICurrencyService from "./ICurrencyService";
import IDividendInvestorPayoutsService from "./IDividendInvestorPayoutsService";
import IStosService from "./IStosService";
import { StosSqlService } from "./StosSqlService";

export default class DividendInvestorPayoutsSqlService
  extends AbstractSqlService
  implements IDividendInvestorPayoutsService {
  tableName = "DividendInvestorPayouts";

  Stos: IStosService;

  Currency: ICurrencyService;

  constructor(inject?: {
    Stos?: IStosService;
    Currency?: ICurrencyService;
    sqlMethod?: SqlMethod;
  }) {
    super(inject?.sqlMethod);
    this.Stos = inject?.Stos ?? new StosSqlService(inject?.sqlMethod);
    this.Currency =
      inject?.Currency ?? new CurrencySqlService(inject?.sqlMethod);
  }

  async list(
    stoId: number,
    payoutId?: number
  ): Promise<DividendInvestorPayoutDto[]> {
    const payoutSql = payoutId ? `AND payoutId = ?` : ``;
    const sql = `SELECT * FROM DividendInvestorPayoutsView WHERE stoId = ? ${payoutSql}`;
    const payouts: DividendInvestorPayoutsView[] = ((await this.runSql(sql, [
      stoId,
      payoutId,
    ])) as DividendInvestorPayoutsView[]).map((p) => ({
      ...p,
      // Convert to number. For some reason, currencyId is a string on Ownez deployment
      currencyId: p.currencyId ? +p.currencyId : undefined,
    }));

    const shareTypes: Sharetypes[] = await this.runSql(
      `SELECT * FROM sharetypes WHERE stoid = ${stoId}`
    );
    const channels: Paymentchannels[] = await this.runSql(
      `SELECT * FROM paymentchannels WHERE stoid = ${stoId}`
    );
    const currencies: Currency[] = await this.Currency.list();

    const investorIDs = payouts.map((p) => p.investorId);
    const investors: Investor[] =
      investorIDs.length &&
      (await this.runSql(
        `SELECT ID, FirstName, LastName, CompanyName FROM investor WHERE ID IN (${investorIDs.join(
          `,`
        )})`
      ));

    // const [stoSettingsRaw] = await this.runSql(
    //   `SELECT settings FROM stos WHERE ID = ${stoId}`
    // );
    // const stoSettings = JSON.parse(stoSettingsRaw.settings);
    // const defaultCurrencyId = stoSettings.DefaultSTOCurreny;
    const defaultCurrencyId = await this.Stos.getDefaultCurrencyID(stoId);
    const payoutsDto: DividendInvestorPayoutDto[] = payouts.map((p) => {
      const investor = investors.find((i) => i.ID === p.investorId);
      // Fancy name display logic for correct whitespace without a million if statements
      const investorNames = [
        investor?.FirstName,
        investor?.LastName,
        investor?.CompanyName,
      ].filter((name) => name != null);
      const investorName = investorNames.join(` `);

      return {
        ...p,
        currencyId: p.currencyId ?? defaultCurrencyId,
        shareType: shareTypes.find((s) => s.ID === p.shareTypeId),
        paymentChannel: channels.find((c) => c.ID === p.channelId),
        currency: currencies.find(
          (c) => c.ID === (p.currencyId ?? defaultCurrencyId)
        ) as Currency,
        investorName,
      };
    });
    return payoutsDto;
  }

  async listRawForPayout(payoutId: number): Promise<DividendInvestorPayouts[]> {
    return this.runSql(
      `SELECT * FROM ${this.tableName} WHERE payoutId = ?`,
      payoutId
    ) as Promise<DividendInvestorPayouts[]>;
  }

  async remove(payout: DividendInvestorPayouts): Promise<void> {
    return this.runSql(`DELETE FROM ${this.tableName} WHERE ID = ?`, payout.id);
  }

  async removeMany(payouts: DividendInvestorPayouts[]): Promise<void> {
    const ids = payouts.map((p) => p.id);
    const qs = this.arrayAsSqlArguments(ids);
    if (ids.length)
      await this.runSql(
        `DELETE FROM ${this.tableName} WHERE ID IN (${qs})`,
        ids
      );
  }

  async addFuturePayouts(
    payouts: Omit<DividendInvestorPayouts, "id">[]
  ): Promise<void> {
    if (!payouts.length) return;

    const payoutId = payouts[0].payoutId;

    let existingPayouts: DividendInvestorPayouts[] = await this.listRawForPayout(
      payoutId
    );
    // Existing payouts MUST NOT BE IN PROGRESS / COMPLETED SUCCESSFULLY otherwise we will hijack them and require a duplicate payment
    const completedPayouts = existingPayouts.filter((p) =>
      ["completed", "pending", "reverting"].includes(p.status)
    );
    const newPayouts = payouts.filter(
      (pNew) =>
        !completedPayouts.some((pCompleted) =>
          helpers.areSimilarInvPayouts(pCompleted, pNew)
        )
    );
    existingPayouts = existingPayouts.filter(
      (pExists) =>
        !completedPayouts.some((pCompleted) =>
          helpers.areSimilarInvPayouts(pCompleted, pExists)
        )
    );
    const investorPayouts = await this._cleanOldPayouts(
      existingPayouts,
      newPayouts
    );

    const updatePayouts = investorPayouts.filter(
      (p) => p.id != null
    ) as DividendInvestorPayouts[];
    const createPayouts = investorPayouts.filter((p) => p.id == null) as Omit<
      DividendInvestorPayouts,
      "id"
    >[];

    // Have to split them due to limitation in my DB module that I'm not gonna fix soon if ever
    // insertMany will process only the object type of the first record in the array for the phrase `INSERT INTO table(keys /* <-- HERE */) VALUES(values)` and some objects lack the id field while others have it
    if (updatePayouts.length) {
      //   console.log(`Upserting ${updatePayouts.length} payouts`);
      //   this.logNext = true;
      await this.insertMany<DividendInvestorPayouts>(
        updatePayouts,
        "DividendInvestorPayouts",
        true
      );
      // await this.removeMany(updatePayouts);
      // await this.insertMany<DividendInvestorPayouts>(
      //     updatePayouts,
      //     "DividendInvestorPayouts"
      // );
    }
    if (createPayouts.length) {
      //   console.log(`Creating ${createPayouts.length} new payouts`);
      await this.insertMany<Omit<DividendInvestorPayouts, "id">>(
        createPayouts,
        "DividendInvestorPayouts"
      );
    }
  }

  /** Cleans old payouts that aren't required anymore for whatever reason. Map new IDs to overwrite old IDs if possible */
  protected async _cleanOldPayouts(
    old: DividendInvestorPayouts[],
    proper: Omit<DividendInvestorPayouts, "id">[]
  ): Promise<Partial<DividendInvestorPayouts>[]> {
    // Match "old" to "proper" using similarity (ID won't exist on the "proper" as it's a new investor payout)
    const toDelete = old.filter(
      (o) => !proper.some((p) => helpers.areSimilarInvPayouts(o, p))
    );
    // Subtract toDelete from "old"
    const toUpdate = old.filter((o) => !toDelete.includes(o));
    // Remove the old unnecessary ones
    await this.removeMany(toDelete);
    // Add insert IDs to the ones that already exist (will cause an upsert)
    return proper.map((newPayout) => {
      const id = toUpdate.find((o) =>
        helpers.areSimilarInvPayouts(newPayout, o)
      )?.id;
      return {
        ...(id && { id }),
        ...newPayout,
      };
    });
  }
}
