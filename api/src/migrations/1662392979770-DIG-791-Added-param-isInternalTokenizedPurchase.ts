import { MigrationInterface, QueryRunner } from 'typeorm';

export class DIG791AddedParamIsInternalTokenizedPurchase1662392979770
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'isInternalTokenizedPurchaseEnabled',
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
      .where('param = "isInternalTokenizedPurchaseEnabled"')
      .execute();
  }
}
