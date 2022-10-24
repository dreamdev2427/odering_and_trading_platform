import { MigrationInterface, QueryRunner } from 'typeorm';
import { Params } from 'entities';

export class DIG822UpdateLocalHttpsTo01662750974003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(Params)
      .set({ intValue: 0 })
      .where('param = "LocalHttpsStart"')
      .execute();
  }

  public async down(): Promise<void> {
    // no down because this param is used only on local machines
  }
}
