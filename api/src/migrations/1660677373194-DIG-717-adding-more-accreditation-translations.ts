import { Translations } from 'entities';
import { MigrationInterface, QueryRunner } from 'typeorm';

const translations: Partial<Translations>[] = [
  {
    key: 'Accredition-Acceptence-popup-title',
    locale: 'en',
    translation: 'Accredition status will be reviewed by admin, do you confirm it?',
  },
  {
    key: 'Accredition-Acceptence-popup-confirm-button',
    locale: 'en',
    translation: 'Yes, I confirm',
  },
  {
    key: 'Accredition-Acceptence-popup-cancel-button',
    locale: 'en',
    translation: 'No, I reject',
  },
];

export class DIG717AddingMoreAccreditationTranslations1660677373194 implements MigrationInterface {
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
