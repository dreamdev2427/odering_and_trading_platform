import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addPhotoFieldToUpdatesTable1656586780447 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'updates',
      new TableColumn({
        name: 'coverphoto',
        type: 'varchar',
        default: null,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('updates', 'coverphoto');
  }
}
