import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class defaultBlochchainStudioStos1659353237098 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'stos',
      new TableColumn({
        name: 'defualtTokenStudio',
        type: 'int',
        default: 1,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('stos', 'defualtTokenStudio');
  }
}
