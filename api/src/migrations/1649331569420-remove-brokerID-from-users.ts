import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class removeBrokerIDFromUsers1649331569420 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'brokerID');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
}
