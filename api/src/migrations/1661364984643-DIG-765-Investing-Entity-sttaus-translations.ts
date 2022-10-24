import { Translations } from 'entities';
import { MigrationInterface, QueryRunner } from 'typeorm';

const translations: Partial<Translations>[] = [
  {
    key: 'Investing-Entity-Status-1',
    locale: 'en',
    translation: 'Approved',
  },
  {
    key: 'Investing-Entity-Status-2',
    locale: 'en',
    translation: 'Pending',
  },
  {
    key: 'Investing-Entity-Status-3',
    locale: 'en',
    translation: 'Declined',
  },
];

export class DIG765InvestingEntitySttausTranslations1661364984643 implements MigrationInterface {
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
