import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const TABLE = 'MoonpayBuyAlerts';

export class moonpayBuyalerts1651749090477 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE,
        columns: [
          {
            name: 'transactionID',
            type: 'int',
          },
          {
            name: 'alertID',
            type: 'int',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE);
  }
}
