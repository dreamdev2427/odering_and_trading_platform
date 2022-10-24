import { MigrationInterface, QueryRunner } from 'typeorm';

export class ssoActivityType1645660104566 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('activitytype')
      .values({
        ID: 33,
        Activity: 'SSO Investor Log In',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('activitytype')
      .where('ID = 33')
      .execute();
  }
}
