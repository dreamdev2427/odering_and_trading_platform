import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class polymeshTransactions1661166550442 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'blockchainSharesTransferTransactions',
      new TableColumn({
        name: 'polymeshInstructionStatus',
        type: 'int',
        isNullable: false,
        default: '0',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'blockchainSharesTransferTransactions',
      'polymeshInstructionStatus',
    );
  }
}
