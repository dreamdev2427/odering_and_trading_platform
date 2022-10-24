import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIs2FAEnabledByDefaultParam1651821919579 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'is2FAEnabledByDefault',
        isGlobal: 1,
        dataType: 2,
        intValue: 0,
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "is2FAEnabledByDefault"')
      .execute();
  }
}
