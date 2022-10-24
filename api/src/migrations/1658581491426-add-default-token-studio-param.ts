import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDefaultTokenStudioParam1658581491426 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'selectedTokenStudio',
        isGlobal: 1,
        dataType: 3,
        stringValue: '[]',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "selectedTokenStudio"')
      .execute();
  }
}
