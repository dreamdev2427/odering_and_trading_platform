import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDoAutomaticSellBackParams1646819688465 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'doAutomaticSellBack',
        intValue: 0,
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "doAutomaticSellBack"')
      .execute();
  }
}
