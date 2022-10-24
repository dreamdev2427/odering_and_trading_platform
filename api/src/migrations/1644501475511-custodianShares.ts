import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class custodianShares1644501475511 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sharetypes',
      new TableColumn({
        name: 'custodianShares',
        type: 'decimal',
        precision: 14,
        scale: 3,
        isNullable: false,
        default: '0.0',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('sharetypes', 'custodianShares');
  }
}
