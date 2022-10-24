import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class multipleColsShareTypes1646665571457 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sharetypes',
      new TableColumn({
        name: 'sellToCompany',
        type: 'tinyint',
        default: '1',
      }),
    );
    await queryRunner.addColumn(
      'sharetypes',
      new TableColumn({
        name: 'sellValue',
        type: 'decimal',
        precision: 33,
        scale: 16,
        default: '0.0000000000000000',
      }),
    );
    await queryRunner.addColumn(
      'sharetypes',
      new TableColumn({
        name: 'isShareNosApplicable',
        type: 'tinyint',
        default: '0',
      }),
    );
    await queryRunner.addColumn(
      'sharetypes',
      new TableColumn({
        name: 'isCertificateNosApplicable',
        type: 'tinyint',
        default: '0',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('sharetypes', 'sellToCompany');
    await queryRunner.dropColumn('sharetypes', 'sellValue');
    await queryRunner.dropColumn('sharetypes', 'isShareNosApplicable');
    await queryRunner.dropColumn('sharetypes', 'isCertificateNosApplicable');
  }
}
