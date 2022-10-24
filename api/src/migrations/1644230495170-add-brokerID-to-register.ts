import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addBrokerIDToRegister1644230495170 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'register',
      new TableColumn({
        name: 'brokerID',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('register', 'brokerID');
  }
}
