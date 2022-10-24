import { Translations } from 'entities';
import { MigrationInterface, QueryRunner } from 'typeorm';
const translations: Partial<Translations>[] = [
  {
    key: 'ActiveProperty-Resume-Purchase',
    locale: 'en',
    translation: 'Resume Purchase',
  },
];
export class DIG760AddMoreTranslations1661324539095 implements MigrationInterface {
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
