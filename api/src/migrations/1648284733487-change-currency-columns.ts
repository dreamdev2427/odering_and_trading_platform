import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class changeCurrencyColumns1648284733487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'currency',
      'blockchainID',
      new TableColumn({
        name: 'blockchainID',
        type: 'int',
        default: 1,
      }),
    );
    await queryRunner.changeColumn(
      'currency',
      'isNative',
      new TableColumn({
        name: 'isNative',
        type: 'int',
        default: 0,
      }),
    );
    await queryRunner.changeColumn(
      'currency',
      'Address',
      new TableColumn({
        name: 'Address',
        type: 'varchar',
        length: '300',
        default: '0000',
      }),
    );
    await queryRunner.changeColumn(
      'currency',
      'cryptoReceivingAddress',
      new TableColumn({
        name: 'cryptoReceivingAddress',
        type: 'varchar',
        length: '300',
        default: '000',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'currency',
      'blockchainID',
      new TableColumn({
        name: 'blockchainID',
        type: 'int',
      }),
    );
    await queryRunner.changeColumn(
      'currency',
      'isNative',
      new TableColumn({
        name: 'isNative',
        type: 'int',
      }),
    );
    await queryRunner.changeColumn(
      'currency',
      'Address',
      new TableColumn({
        name: 'Address',
        type: 'varchar',
        length: '300',
      }),
    );
    await queryRunner.changeColumn(
      'currency',
      'cryptoReceivingAddress',
      new TableColumn({
        name: 'cryptoReceivingAddress',
        type: 'varchar',
        length: '300',
      }),
    );
  }
}
