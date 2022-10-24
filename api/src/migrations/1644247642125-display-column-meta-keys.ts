import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class displayColumnMetaKeys1644247642125 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.addColumn(
      'stosMetaKeys',
      new TableColumn({
        name: 'display',
        type: 'tinyint',
        width: 1,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropColumn('stosMetaKeys', 'display');
  }
}
