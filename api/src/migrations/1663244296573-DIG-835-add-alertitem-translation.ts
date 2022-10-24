import { Translations } from 'entities';
import { MigrationInterface, QueryRunner } from 'typeorm';

const translations: Partial<Translations>[] = [
  {
    key: 'Portfolio-Transaction-Headers-Type',
    locale: 'en',
    translation: 'Type',
  },
  {
    key: 'Portfolio-Transaction-Headers-Date',
    locale: 'en',
    translation: 'Date',
  },
  {
    key: 'Portfolio-Transaction-Headers-Company-Project',
    locale: 'en',
    translation: 'Company / Project',
  },
  {
    key: 'Portfolio-Transaction-Headers-ShareType',
    locale: 'en',
    translation: 'Share',
  },
  {
    key: 'Portfolio-Transaction-Headers-Price-To-pay',
    locale: 'en',
    translation: 'Price to pay',
  },
  {
    key: 'Portfolio-Transaction-Headers-Shares',
    locale: 'en',
    translation: 'Shares',
  },
  {
    key: 'Portfolio-Transaction-Headers-Payment-Status',
    locale: 'en',
    translation: 'Payment Status',
  },
  {
    key: 'Portfolio-Transaction-Status-Type-Pending',
    locale: 'en',
    translation: 'Pending',
  },
  {
    key: 'Portfolio-Transaction-Status-Type-Resolved',
    locale: 'en',
    translation: 'Resolved',
  },
];

export class DIG835AddAlertitemTranslation1663244296573 implements MigrationInterface {
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
