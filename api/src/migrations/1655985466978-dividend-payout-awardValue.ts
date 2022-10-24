import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

/** Makes Award Value changeable per payout instead of per whole template */
export class dividendPayoutAwardValue1655985466978 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS DividendPayoutsView`);
    await queryRunner.query(`DROP VIEW IF EXISTS DividendInvestorPayoutsView`);
    await queryRunner.query(`DROP TABLE IF EXISTS DividendPayoutsView`);
    await queryRunner.query(`DROP TABLE IF EXISTS DividendInvestorPayoutsView`);

    await queryRunner.addColumn(
      'DividendPayouts',
      new TableColumn({
        name: 'awardValue',
        type: 'decimal',
        precision: 33,
        scale: 16,
        isNullable: true,
        default: null, // if null, take from template
      }),
    );

    await queryRunner.addColumn(
      'DividendPayouts',
      new TableColumn({
        name: 'currentlyPaidAmount',
        type: 'decimal',
        precision: 33,
        scale: 16,
        default: 0,
      }),
    );

    await queryRunner.addColumn(
      'DividendPayouts',
      new TableColumn({
        name: 'currentlyPaidInvestors',
        type: 'int',
        default: 0,
      }),
    );

    await queryRunner.addColumn(
      'DividendPayouts',
      new TableColumn({
        name: 'adminId',
        type: 'int',
        isNullable: true,
        default: null,
      }),
    );

    await queryRunner.query(
      `INSERT INTO activitytype (ID, Activity) VALUES (40, "Dividend amount awarded by admin")`,
    );

    // Add COALESCE(p.awardValue, template.awardValue) to views (always get most relevant awardValue)

    await queryRunner.query(`
            CREATE OR REPLACE VIEW DividendPayoutsView
            AS SELECT
                p.id, templateId, dateTimeFrom, dateTimeDue, lastUpdatedAt, p.status as status, totalAmount, companyShares, totalInvestorShares, investors,
                stoId, shareTypeId, currencyId, channelId, isActive, periodUnit, period, COALESCE(p.awardValue, template.awardValue) as awardValue, title, awardStrategy, template.status as templateStatus, adminId
            FROM DividendPayouts p
            INNER JOIN
                DividendTemplates template
                ON templateId = template.id;`);

    await queryRunner.query(`
            CREATE OR REPLACE VIEW DividendInvestorPayoutsView
            AS SELECT
                i.id, templateId, investorId, payoutId, amount, investorShares, i.lastUpdatedAt, i.status as status,
                dateTimeFrom, dateTimeDue, total.lastUpdatedAt as totalLastUpdatedAt, total.status as totalStatus, totalAmount, companyShares, totalInvestorShares, investors,
                stoId, shareTypeId, currencyId, channelId, isActive, periodUnit, period, COALESCE(total.awardValue, template.awardValue) as awardValue, title, awardStrategy, template.status as templateStatus, adminId
            FROM DividendInvestorPayouts i
            INNER JOIN
                DividendPayouts total
                ON i.payoutId = total.id
            INNER JOIN
                DividendTemplates template
                ON total.templateId = template.id;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('DividendPayouts', 'awardValue');
    await queryRunner.dropColumn('DividendPayouts', 'currentlyPaidAmount');
    await queryRunner.dropColumn('DividendPayouts', 'currentlyPaidInvestors');
    await queryRunner.dropColumn('DividendPayouts', 'adminId');
    await queryRunner.query(`DELETE FROM activitytype WHERE ID = 40`);

    // Revert views (copied from multisto migrations)

    await queryRunner.query(`
            CREATE OR REPLACE VIEW DividendPayoutsView
            AS SELECT
                p.id, templateId, dateTimeFrom, dateTimeDue, lastUpdatedAt, p.status as status, totalAmount, companyShares, totalInvestorShares, investors,
                stoId, shareTypeId, currencyId, channelId, isActive, periodUnit, period, awardValue, title, awardStrategy, template.status as templateStatus
            FROM DividendPayouts p
            INNER JOIN
                DividendTemplates template
                ON templateId = template.id;`);

    await queryRunner.query(`
            CREATE OR REPLACE VIEW DividendInvestorPayoutsView
            AS SELECT
                i.id, templateId, investorId, payoutId, amount, investorShares, i.lastUpdatedAt, i.status as status,
                dateTimeFrom, dateTimeDue, total.lastUpdatedAt as totalLastUpdatedAt, total.status as totalStatus, totalAmount, companyShares, totalInvestorShares, investors,
                stoId, shareTypeId, currencyId, channelId, isActive, periodUnit, period, awardValue, title, awardStrategy, template.status as templateStatus
            FROM DividendInvestorPayouts i
            INNER JOIN
                DividendPayouts total
                ON i.payoutId = total.id
            INNER JOIN
                DividendTemplates template
                ON total.templateId = template.id;`);
  }
}
