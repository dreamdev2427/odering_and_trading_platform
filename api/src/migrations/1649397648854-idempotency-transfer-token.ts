import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class idempotencyTransferToken1649397648854 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'shares_transfer_history',
        columns: [
          {
            name: 'ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'stoID',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'investorID',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'adminID',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'shareTypeID',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: 14,
            scale: 3,
            isNullable: false,
            default: '0.000',
          },
          {
            name: 'type',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'token',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shares_transfer_history');
  }
}
