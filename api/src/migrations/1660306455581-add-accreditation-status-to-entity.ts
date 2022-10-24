import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addAccreditationStatusToEntity1660306455581 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'investing_entity',
      new TableColumn({
        name: 'isApprovedByAdmin',
        type: 'int',
        default: 1,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('investing_entity', 'isApprovedByAdmin');
  }
}
