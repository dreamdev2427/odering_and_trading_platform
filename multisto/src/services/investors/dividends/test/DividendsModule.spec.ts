import { before, describe, it } from "mocha";
import { assert } from "chai";
import * as math from "mathjs";
import IDividendsModule from "../api/IDividendsModule";
import DividendsModule from "../api/DividendsModule";
import AbstractSqlService from "../../../generic/AbstractSqlService";
import DividendsSqlService from "../../dividends-legacy/data/DividendsSqlService";
import { ISeeder, Seed, SqlSeeder } from "./helpers/seeder.spec";
import seed, { ShareTypeID } from "./helpers/seed.spec";
import DividendTemplateInputDto from "../dto/DividendTemplateInputDto";
import { DividendTemplates } from "../../../../Schema";
import DividendPayoutDto from "../dto/DividendPayoutDto";

describe(`DIG-282 Dividends Module`, async () => {
  /** The module */
  const svc: IDividendsModule = new DividendsModule();
  /** Seeder providing test data */
  const seeder: ISeeder = new SqlSeeder();
  /** Seed needed */
  const sneed: Seed = seed;

  before(`Seed DB`, async () => {
    await seeder.seed(sneed);
  });
  after(`Seed DB`, async () => {
    await seeder.unseed(sneed);
  });

  beforeEach(`Cleanup before ALL dividends module tests`, async () => {
    const sql: AbstractSqlService = new DividendsSqlService();
    await sql.clearTables(
      "DividendInvestorPayouts",
      "DividendPayouts",
      "DividendTemplates"
    );
  });

  describe(`DIG-282 Should correctly distribute payments`, async () => {
    let templates: DividendTemplates[] = [];
    let payouts: DividendPayoutDto[] = [];
    let totalInvestorSharesExpected: number;
    let totalAmountExpected: number;
    const awardValue = 12.3333333333; // Using awkward number to trigger bad JS math

    beforeEach(`DIG-282 Setup before distribution tests`, async () => {
      const templateDetails: Omit<DividendTemplateInputDto, "id"> = {
        awardStrategy: "feePerShare",
        awardValue,
        dateTimeDue: new Date(),
        isActive: 1,
        period: 1,
        periodUnit: "days",
        status: "unused",
        stoId: 0,
        shareTypeId: ShareTypeID.CLASS_A_FIAT,
      };
      await svc.createDividend(templateDetails);
      templates = await svc.Templates.list(0);
      payouts = await svc.listFutureDividends(0);

      // Control variables
      /** The sum of class A shares held by all investors (as specified in the seed) */
      totalInvestorSharesExpected = seed.shares
        .filter((s) => s.shareTypeid === ShareTypeID.CLASS_A_FIAT)
        .reduce((sum, rec) => math.add(sum, rec.shares ?? 0) as number, 0);
      totalAmountExpected = math.multiply(
        totalInvestorSharesExpected ?? 0,
        awardValue
      );
    });

    it(`Should be able to create template and future payout data`, async () => {
      assert.isNotEmpty(templates);
      assert.isNotEmpty(payouts);
    });

    it(`Should have the correct total investor shares for futures`, async () => {
      const [futurePayout] = payouts.filter((p) => p.status === "future");

      assert.equal(
        futurePayout.totalInvestorShares,
        totalInvestorSharesExpected
      );
    });

    it(`Should have the correct total amount for futures`, () => {
      const [futurePayout] = payouts.filter((p) => p.status === "future");

      assert.equal(futurePayout.totalAmount, totalAmountExpected);
    });

    it(`Should create correct investor futures on payout`, async () => {});

    it(`Should payout investor futures correctly`, async () => {});
  });

  it(`DIG-309 Should run on schedule`, async () => {});
});
