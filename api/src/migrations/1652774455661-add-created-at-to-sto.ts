import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addCreatedAtToSto1652774455661 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'stos',
      new TableColumn({
        name: 'createdAt',
        type: 'datetime',
        default: 'CURRENT_TIMESTAMP',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('stos', 'createdAt');
  }
}
