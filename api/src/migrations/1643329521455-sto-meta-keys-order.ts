import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class stoMetaKeysOrder1643329521455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.addColumn(
      'stosMetaKeys',
      new TableColumn({
        name: 'order',
        type: 'tinyint',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropColumn('stosMetaKeys', 'order');
  }
}
