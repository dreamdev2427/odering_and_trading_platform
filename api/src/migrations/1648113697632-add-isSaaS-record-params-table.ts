import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIsSaaSRecordParamsTable1648113697632 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'isSaaS',
        isGlobal: 1,
        dataType: 1,
        intValue: 0,
        stringValue: '',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "isSaaS"')
      .execute();
  }
}
