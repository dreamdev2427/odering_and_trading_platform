import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class msEntityInBuyAlert1639960616498 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'InvestorBuyPropertyAlert',
      new TableColumn({
        name: 'entityID',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('InvestorBuyPropertyAlert', 'entityID');
  }
}
