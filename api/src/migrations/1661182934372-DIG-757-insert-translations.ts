import { MigrationInterface, QueryRunner } from 'typeorm';
import { Translations } from 'entities';

const translations: Partial<Translations>[] = [
  {
    key: 'marketSpaceForm-card-title',
    locale: 'en',
    translation: 'Create Your Account',
  },
  {
    key: 'ContactCompany-BsSwal-cancelButton',
    locale: 'en',
    translation: 'Stay Here',
  },
  {
    key: 'ContactCompany-BsSwal-Confirm',
    locale: 'en',
    translation: 'See Message Thread',
  },
];

export class DIG757InsertTranslations1661182934372 implements MigrationInterface {
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
