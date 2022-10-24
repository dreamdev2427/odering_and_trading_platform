import { Params } from 'entities';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class DIG736DoautomaticpurchaseDatatype1662503639099 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(Params)
      .set({ dataType: 2 })
      .where('param = "doAutomaticPurchase"')
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(Params)
      .set({ dataType: undefined })
      .where('param = "doAutomaticPurchase"')
      .execute();
  }
}
