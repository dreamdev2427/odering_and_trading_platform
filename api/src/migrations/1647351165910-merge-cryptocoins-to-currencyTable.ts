import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class mergeCryptocoinsToCurrencyTable1647351165910 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS `cryptocoins`;');

    await queryRunner.addColumn(
      'currency',
      new TableColumn({
        name: 'blockchainID',
        type: 'int',
      }),
    );
    await queryRunner.addColumn(
      'currency',
      new TableColumn({
        name: 'isNative',
        type: 'int',
      }),
    );
    await queryRunner.addColumn(
      'currency',
      new TableColumn({
        name: 'Address',
        type: 'varchar',
        length: '300',
      }),
    );
    await queryRunner.addColumn(
      'currency',
      new TableColumn({
        name: 'cryptoReceivingAddress',
        type: 'varchar',
        length: '300',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('currency', [
      'cryptoReceivingAddress',
      'Address',
      'isNative',
      'blockchainID',
    ]);
  }
}
