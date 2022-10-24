import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertNewInvestorstoTypes1652121866006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('stoinvestortype')
      .values({
        ID: 10,
        type: 'failed',
      })
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('stoinvestortype')
      .values({
        ID: 11,
        type: 'restarted',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('stoinvestortype')
      .where('ID = 10')
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('stoinvestortype')
      .where('ID = 11')
      .execute();
  }
}
