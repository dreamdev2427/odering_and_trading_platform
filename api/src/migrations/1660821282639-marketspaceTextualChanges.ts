import { Translations } from 'entities';
import { MigrationInterface, QueryRunner } from 'typeorm';

const translations: Partial<Translations>[] = [
  {
    key: 'portfolioOverviewMarketspace-totalInvested-desc',
    locale: 'en',
    translation:
      'This value represents the total amount you have invested in MarketSpace Capital deals',
  },
  {
    key: 'portfolioOverviewMarketspace-portfolioValue-desc',
    locale: 'en',
    translation:
      'This value represents your Total Amount Invested plus any accrued preferred return. In other words, you have to receive this amount back to you before any profit sharing occurs. Note: This amount changes on a daily basis as your preferred return accrues.',
  },
  {
    key: 'portfolioOverviewMarketspace-distributionsReceived-desc',
    locale: 'en',
    translation:
      'This value represents any distributions you have received from your investments with MarketSpace Capital.',
  },
  {
    key: 'portfolioOverviewMarketspace-totalBeforeProfit-desc',
    locale: 'en',
    translation: 'This value represents your Portfolio Value minus Total Distributions Received.',
  },
  {
    key: 'offered-contracts',
    locale: 'en',
    translation: 'Documents Pending Action',
  },
  {
    key: 'Signed-Contracts',
    locale: 'en',
    translation: 'Executed Documents',
  },
  {
    key: 'contract-documents-Index-thead-title',
    locale: 'en',
    translation: 'Document Name',
  },
  {
    key: 'entityItemRowHeaderNickname',
    locale: 'en',
    translation: 'Entity',
  },
  {
    key: 'entityManagementAddNewEntity',
    locale: 'en',
    translation: 'Create New Entity',
  },
];

export class marketspaceTextualChanges1660821282639 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('translations')
      .values(translations)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
