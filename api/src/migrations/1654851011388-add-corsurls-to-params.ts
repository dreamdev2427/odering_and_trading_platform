import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCorsurlsToParams1654851011388 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'whitelistedCorsUrls',
        isGlobal: 1,
        dataType: 3,
        stringValue: '*',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "whitelistedCorsUrls"')
      .execute();
  }
}
