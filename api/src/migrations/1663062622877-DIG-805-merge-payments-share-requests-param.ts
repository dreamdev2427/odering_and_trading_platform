import { MigrationInterface, QueryRunner } from 'typeorm';

export class DIG805MergePaymentsShareRequestsParam1663062622877 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'isMergingPaymentsSharesRequestsEnabled',
        isGlobal: 1,
        dataType: 2,
        intValue: 1,
        stringValue: '',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "isMergingPaymentsSharesRequestsEnabled"')
      .execute();
  }
}
