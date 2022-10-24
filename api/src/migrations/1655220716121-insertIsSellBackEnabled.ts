import { MigrationInterface, QueryRunner } from 'typeorm';
import { Params } from '../entities';

const names = ['api-sell-request-already-open'];
export class insertIsSellBackEnabled1655220716121 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'isSellBackEnabled',
        isGlobal: 1,
        dataType: 2,
        intValue: 0,
      })
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .update(Params)
      .set({ isGlobal: 1, dataType: 2 })
      .where('param = "doAutomaticSellBack"')
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('activitytype')
      .values({
        ID: 37,
        Activity: 'SellBack Alert Received',
      })
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('translations')
      .values([
        {
          key: 'api-sell-request-already-open',
          locale: 'en',
          translation:
            'You already have an open order to SELL this class of shares back to the company. Please open your portfolio and review your request.',
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const condition = `key = "${names.join('" || key = "')}"`;
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "isSellBackEnabled"')
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .update(Params)
      .set({ isGlobal: undefined, dataType: undefined, intValue: 0 })
      .where('param = "doAutomaticSellBack"')
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('activitytype')
      .where('ID = 37')
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('translations')
      .where(condition)
      .execute();
  }
}
