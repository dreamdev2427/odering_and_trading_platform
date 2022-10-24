import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class fee1645432352921 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'fees',
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
            name: 'beneficiary',
            type: 'enum',
            enum: ['BROKER', 'PLATFORM'],
            enumName: 'beneficiaryEnum',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['REGISTRATION', 'DEPOSIT', 'BUY SHARES', 'EXCHANGE'],
            enumName: 'typeEnum',
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
            name: 'status',
            type: 'enum',
            enum: ['FLAT', 'PERCENTAGE'],
            enumName: 'statusEnum',
            default: '"FLAT"',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('fees');
  }
}
