import { TableColumn, MigrationInterface, QueryRunner } from 'typeorm';

export class buyAlertIsHidden1652448891023 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'InvestorBuyPropertyAlert',
      new TableColumn({
        name: 'isHiddenForInvestor',
        type: 'tinyint',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('InvestorBuyPropertyAlert', 'isHiddenForInvestor');
  }
}
