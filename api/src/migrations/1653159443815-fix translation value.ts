import { MigrationInterface, QueryRunner } from 'typeorm';
import { Translations } from '../entities';

export class fixTranslationValue1653159443815 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(Translations)
      .set({ translation: 'No, I am not interested' })
      .where('key LIKE "kyc-upload-submit-apply-consent-no" AND locale like "en"')
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(Translations)
      .set({ translation: 'Yes, I give my consent' })
      .where('key LIKE "kyc-upload-submit-apply-consent-no" AND locale like "en"')
      .execute();
  }
}
