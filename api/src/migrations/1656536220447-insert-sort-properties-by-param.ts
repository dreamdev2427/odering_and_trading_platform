import { MigrationInterface, QueryRunner } from 'typeorm';
import { Translations } from '../entities';

export class sortPropertiesByParam1656536220447 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'isPropertySortingEnabled',
        isGlobal: 1,
        dataType: 2,
        intValue: 0,
      })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('translations')
      .values([
        {
          key: 'ActiveProperties-BuyProperty-CardHeader',
          locale: 'en',
          translation: 'Active Offerings',
        },
        {
          key: 'ActiveProperties-NonBuyProperty-CardHeader',
          locale: 'en',
          translation: 'Closed Offerings',
        },
      ])
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .update(Translations)
      .set({ translation: '"Invest Now"' })
      .where('key = "detailPropertyButtonInvestInProperty"')
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "isPropertySortingEnabled"')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('translations')
      .where(
        'key = "ActiveProperties-BuyProperty-CardHeader" or key = "ActiveProperties-NonBuyProperty-CardHeader"',
      )
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .update(Translations)
      .set({ translation: '"Invest in Property"' })
      .where('key = "detailPropertyButtonInvestInProperty"')
      .execute();
  }
}
