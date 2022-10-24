import { MigrationInterface, QueryRunner } from 'typeorm';
import { Translations } from 'entities';

export class DIG770ChangeTranslationEspToEs1661423532964 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(Translations)
      .set({ locale: 'es' })
      .where('locale like "esp"')
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(Translations)
      .set({ locale: 'esp' })
      .where('locale like "es"')
      .execute();
  }
}
