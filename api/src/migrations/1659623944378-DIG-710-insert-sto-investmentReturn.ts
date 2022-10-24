import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { Translations } from 'entities';

const translations: Partial<Translations>[] = [
  {
    key: 'portfolioOverviewMarketspace-totalInvested',
    locale: 'en',
    translation: 'Total Amount Invested',
  },
  {
    key: 'portfolioOverviewMarketspace-portfolioValue',
    locale: 'en',
    translation: 'Portfolio Value',
  },
  {
    key: 'portfolioOverviewMarketspace-distributionsReceived',
    locale: 'en',
    translation: 'Total Distributions Received',
  },
  {
    key: 'portfolioOverviewMarketspace-totalBeforeProfit',
    locale: 'en',
    translation: 'Total Owed Before Profit Sharing',
  },
];

export class DIG710InsertStoInvestmentReturn1659623944378 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'stos',
      new TableColumn({
        name: 'investmentReturn',
        type: 'decimal',
        precision: 14,
        scale: 3,
        isNullable: false,
        default: '0.0',
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('translations')
      .values(translations)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('stos', 'investmentReturn');

    const keys: string[] = translations.map((t) => t.key ?? '');
    const condition = `key = "${keys.join('" || key = "')}"`;
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('translations')
      .where(condition)
      .execute();
  }
}
