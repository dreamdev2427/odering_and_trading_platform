import { MigrationInterface, QueryRunner } from 'typeorm';

export class enforceProjectTypeParam1659549993154 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'defaultProjectType',
        isGlobal: 1,
        dataType: 2,
        intValue: 3,
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "defaultProjectType"')
      .execute();
  }
}
