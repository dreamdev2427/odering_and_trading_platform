import { MigrationInterface, QueryRunner } from 'typeorm';

export class DIG842paramIsShareTransferEmailEnabled1663336625982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'isShareTransferEmailEnabled',
        isGlobal: 1,
        dataType: 2,
        intValue: 1,
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "isShareTransferEmailEnabled"')
      .execute();
  }
}
