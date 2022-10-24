import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class investor2faCode1644978581492 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'investor',
      new TableColumn({
        name: 'twoFactorCode',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('investor', 'twoFactorCode');
  }

}
