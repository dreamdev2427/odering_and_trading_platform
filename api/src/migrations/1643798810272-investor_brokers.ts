import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class investorBrokers1643798810272 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'investor_brokers',
        columns: [
          {
            name: 'ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'investorID',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'brokerID',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('investor_brokers');
  }
}
