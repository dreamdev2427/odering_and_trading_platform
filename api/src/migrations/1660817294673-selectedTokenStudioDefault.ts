import { Params } from 'entities';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class selectedTokenStudioDefault1660817294673 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(Params)
      .set({ stringValue: '[1]' })
      .where('param="selectedTokenStudio"')
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(Params)
      .set({ stringValue: '[]' })
      .where('param="selectedTokenStudio"')
      .execute();
  }
}
