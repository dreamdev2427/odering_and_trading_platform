import { MigrationInterface, QueryRunner } from 'typeorm';
import { Params } from '../entities';

export class fixWhitelistedCorsUrlsStringValue1655990371774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(Params)
      .set({ stringValue: '""' })
      .where('param = "whitelistedCorsUrls"')
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(Params)
      .set({ stringValue: '*' })
      .where('param = "whitelistedCorsUrls"')
      .execute();
  }
}
