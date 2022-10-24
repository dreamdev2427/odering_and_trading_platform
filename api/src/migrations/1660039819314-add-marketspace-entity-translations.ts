import { Translations } from 'entities';
import { MigrationInterface, QueryRunner } from 'typeorm';

const translations: Partial<Translations>[] = [
  {
    key: 'MarketSpace-createnewEntity-redirect-popup-title-text',
    locale: 'en',
    translation: 'Do You want to redirect purchase flow?',
  },
  {
    key: 'MarketSpace-createnewEntity-redirect-confirm-text',
    locale: 'en',
    translation: 'yes, resume purchase',
  },
  {
    key: 'MarketSpace-createnewEntity-redirect-cancel-text',
    locale: 'en',
    translation: 'no, stay here',
  },
];

export class addMarketspaceEntityTranslations1660039819314 implements MigrationInterface {
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
