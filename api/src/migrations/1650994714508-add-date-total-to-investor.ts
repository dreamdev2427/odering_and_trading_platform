import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addDateTotalToInvestor1650994714508 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'investor',
      new TableColumn({
        name: 'investmentLimitUpdateDate',
        type: 'datetime',
        default: 'CURRENT_TIMESTAMP',
      }),
    );
    await queryRunner.addColumn(
      'investor',
      new TableColumn({
        name: 'allowedTotalInvestment',
        type: 'int',
        default: 0,
      }),
    );
    await queryRunner.addColumn(
      'investor',
      new TableColumn({
        name: 'yearlyTotalInvestment',
        type: 'int',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('investor', [
      'investmentLimitUpdateDate',
      'allowedTotalInvestment',
      'yearlyTotalInvestment',
    ]);
  }
}
