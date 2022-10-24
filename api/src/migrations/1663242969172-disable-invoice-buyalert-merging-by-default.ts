import { Params } from 'entities';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class disableInvoiceBuyAlertMergingByDefault1663242969172 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(Params)
      .set({
        intValue: 0,
      })
      .where(`param = 'isMergingPaymentsSharesRequestsEnabled'`)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(Params)
      .set({
        intValue: 1,
      })
      .where(`param = 'isMergingPaymentsSharesRequestsEnabled'`)
      .execute();
  }
}
