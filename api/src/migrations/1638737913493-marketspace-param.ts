import { MigrationInterface, QueryRunner } from 'typeorm';

export class marketspaceParam1638737913493 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'IsMarketSpace',
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
      .where('param = "IsMarketSpace"')
      .execute();
  }
}
