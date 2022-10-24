import { MigrationInterface, QueryRunner } from 'typeorm';

export class doRedirectToV21654790231660 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'doRedirectToV2',
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
      .where('param = "doRedirectToV2"')
      .execute();
  }
}
