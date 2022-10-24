import { MigrationInterface, QueryRunner } from 'typeorm';

export class customKycParam1650921260570 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'clientKYC',
        isGlobal: 1,
        dataType: 1,
        stringValue: '',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "clientKYC"')
      .execute();
  }
}
