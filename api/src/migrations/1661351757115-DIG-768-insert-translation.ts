import { MigrationInterface, QueryRunner } from 'typeorm';
import { Translations } from 'entities';

const translations: Partial<Translations>[] = [
  {
    key: 'InvestingEntityForm-saveEntity-success-popUp-title',
    locale: 'en',
    translation: 'Entity Saved Successfully',
  },
];
export class DIG768InsertTranslation1661351757115 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('translations')
      .values(translations)
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'isInvestmentReturnCalculationEnabled',
        isGlobal: 1,
        dataType: 2,
        intValue: 0,
      })
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

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "isInvestmentReturnCalculationEnabled"')
      .execute();
  }
}
