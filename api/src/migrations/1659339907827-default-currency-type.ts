import { MigrationInterface, QueryRunner } from 'typeorm';

export class defaultCurrencyType1659339907827 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'defaultCurrencyType',
        isGlobal: 1,
        dataType: 2,
        intValue: 3,
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "defaultCurrencyType"')
      .execute();
  }
}
