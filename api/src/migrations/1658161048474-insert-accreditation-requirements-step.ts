import { MigrationInterface, QueryRunner } from 'typeorm';
import { Translations } from '../entities';

const translations: Partial<Translations>[] = [
  {
    key: 'AlertItem-Button-AccreditationRequired',
    locale: 'en',
    translation: 'Complete Accreditation',
  },
  {
    key: 'AlertItem-status-AccreditationRequired',
    locale: 'en',
    translation: 'Accreditation Required',
  },
];

export class insertAccreditationRequirementsStep1658161048474 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'accreditationRequirementStep',
        isGlobal: 1,
        dataType: 2,
        intValue: 0,
        stringValue: '',
      })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('translations')
      .values(translations)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "accreditationRequirementStep"')
      .execute();

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
