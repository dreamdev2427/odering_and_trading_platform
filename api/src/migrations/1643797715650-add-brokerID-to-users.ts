import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addBrokerIDToUsers1643797715650 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
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
    await queryRunner.dropColumn('users', 'brokerID');
  }
}
