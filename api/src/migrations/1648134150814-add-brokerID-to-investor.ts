import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addBrokerIDToInvestor1648134150814 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'investor',
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
    await queryRunner.dropColumn('investor', 'brokerID');
  }
}
