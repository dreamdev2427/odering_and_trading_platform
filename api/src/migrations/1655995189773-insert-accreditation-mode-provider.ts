import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertAccreditationModeProvider1655995189773 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'AccreditationProvider',
        isGlobal: 1,
        dataType: 2,
        intValue: 0,
      })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'AccreddRedirectLink',
        isGlobal: 1,
        dataType: 1,
        stringValue: '',
        intValue: 0,
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "AccreditationProvider"')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "AccreddRedirectLink"')
      .execute();
  }
}
