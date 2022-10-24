import { MigrationInterface, QueryRunner } from 'typeorm';

export class DIG744AutomaticShareClassSettingsParam1661511822345 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'isAutomaticShareClassSettingsEnabled',
        isGlobal: 1,
        dataType: 2,
        intValue: 1,
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "isAutomaticShareClassSettingsEnabled"')
      .execute();
  }
}
