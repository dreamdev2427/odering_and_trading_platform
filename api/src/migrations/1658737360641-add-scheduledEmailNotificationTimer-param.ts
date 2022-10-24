import { MigrationInterface, QueryRunner } from 'typeorm';

export class addScheduledEmailNotificationTimerParam1658737360641 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'scheduledEmailNotificationTimer',
        isGlobal: 1,
        dataType: 2,
        intValue: 10,
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "scheduledEmailNotificationTimer"')
      .execute();
  }
}
