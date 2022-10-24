import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addBrokerIDToBrokers1648822268220 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'brokers',
      new TableColumn({
        name: 'brokerID',
        type: 'varchar',
        length: '255',
        isNullable: true,
        isGenerated: true,
        generationStrategy: 'uuid',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('brokers', 'brokerID');
  }
}
