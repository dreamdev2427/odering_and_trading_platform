import { MigrationInterface, QueryRunner } from 'typeorm';

export class emailTextOverrideIncreaseSize1658926266733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `EmailTextOverrides` MODIFY COLUMN value TEXT');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE emailTextOverrides MODIFY COLUMN value varchar(2048)');
  }
}
