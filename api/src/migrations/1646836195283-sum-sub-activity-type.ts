import { MigrationInterface, QueryRunner } from 'typeorm';

export class sumSubActivityType1646836195283 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('activitytype')
      .values({
        ID: 34,
        Activity: 'Sum Sub Webhook called',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('activitytype')
      .where('ID = 34')
      .execute();
  }
}
