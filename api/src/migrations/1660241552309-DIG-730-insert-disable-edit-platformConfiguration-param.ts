import { MigrationInterface, QueryRunner } from 'typeorm';

export class DIG730InsertDisableEditPlatformConfigurationParam1660241552309
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'enablePlatformConfigurationSwitches',
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
      .where('param = "enablePlatformConfigurationSwitches"')
      .execute();
  }
}
