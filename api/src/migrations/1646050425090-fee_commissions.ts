import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class feeCommissions1646050425090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'fee_commissions',
        columns: [
          {
            name: 'ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'feeID',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: 14,
            scale: 3,
            isNullable: false,
            default: '0.0',
          },
          {
            name: 'transactionID',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'beneficiaryID',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'dateEarned',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['PENDING', 'COMPLETED', 'REJECTED'],
            enumName: 'statusEnum',
            default: '"PENDING"',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('fee_commissions');
  }
}
