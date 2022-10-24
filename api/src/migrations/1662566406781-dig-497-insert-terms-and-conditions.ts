import { MigrationInterface, QueryRunner } from 'typeorm';

export class dig497InsertTermsAndConditions1662566406781 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'termsAndConditionsConfig',
        isGlobal: 1,
        dataType: 3,
        intValue: 0,
        stringValue: `{"link": "https://digishares.io/tc","text": "Terms of Service of DigiShares"}`,
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "termsAndConditionsConfig"')
      .execute();
  }
}
