import { MigrationInterface, QueryRunner } from 'typeorm';

export class is2FAForcedForAll1656501712936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'is2FAForcedForAll',
        isGlobal: 1,
        dataType: 2,
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
      .where('param = "is2FAForcedForAll"')
      .execute();
  }
}
