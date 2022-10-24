import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertPlatformConfigurationParameter1657154025686 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'platformConfiguration',
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
      .where('param = "platformConfiguration"')
      .execute();
  }
}
