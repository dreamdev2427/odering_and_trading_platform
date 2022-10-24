import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeCharsetCollateForBrokerTables1649427357133 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE fees CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE fee_commissions CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE brokers CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE fees CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
    `);
    await queryRunner.query(`
        ALTER TABLE fee_commissions CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
    `);
    await queryRunner.query(`
        ALTER TABLE brokers CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
    `);
  }
}
