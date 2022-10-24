import { MigrationInterface, QueryRunner } from 'typeorm';

export class DIG806InsertHideAllDocumentsSignedPopUp1662659254051 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'isAllDocumentsSignedPopUpEnabled',
        isGlobal: 1,
        dataType: 2,
        intValue: 0,
        stringValue: '',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "isAllDocumentsSignedPopUpEnabled"')
      .execute();
  }
}
