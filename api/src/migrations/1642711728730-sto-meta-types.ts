import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class stoMetaTypes1642711728730 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.addColumn(
      'stosMetaKeys',
      new TableColumn({
        name: 'type',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropColumn('stosMetaKeys', 'type');
  }
}
