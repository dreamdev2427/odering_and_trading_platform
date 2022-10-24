import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addingBuyalercolumn1656602525424 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'InvestorDepositReceivedAlert',
      new TableColumn({
        name: 'buyAlertID',
        type: 'int',
        default: 0,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('InvestorDepositReceivedAlert', 'buyAlertID');
  }
}
