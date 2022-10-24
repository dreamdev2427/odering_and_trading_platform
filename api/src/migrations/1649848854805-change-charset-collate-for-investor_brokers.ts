import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeCharsetCollateForInvestorBrokers1649848854805 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE investor_brokers CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE investor_brokers CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci`,
    );
  }
}
