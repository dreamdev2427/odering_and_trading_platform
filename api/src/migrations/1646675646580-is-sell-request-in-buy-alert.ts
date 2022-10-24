import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class isSellRequestInBuyAlert1646675646580 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'InvestorBuyPropertyAlert',
      new TableColumn({
        name: 'isSellRequest',
        type: 'tinyint',
        default: '0',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('InvestorBuyPropertyAlert', 'isSellRequest');
  }
}
