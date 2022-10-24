import { TableColumn, MigrationInterface, QueryRunner } from 'typeorm';

export class addSellBackInFeeType1646818623154 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const changeColumnNew = new TableColumn({
      name: 'type',
      type: 'enum',
      enum: ['REGISTRATION', 'DEPOSIT', 'BUY SHARES', 'EXCHANGE', 'SELL BACK'],
      enumName: 'typeEnum',
      isNullable: false,
    });
    await queryRunner.changeColumn('fees', 'type', changeColumnNew);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const changeColumnOld = new TableColumn({
      name: 'type',
      type: 'enum',
      enum: ['REGISTRATION', 'DEPOSIT', 'BUY SHARES', 'EXCHANGE'],
      enumName: 'typeEnum',
      isNullable: false,
    });
    await queryRunner.changeColumn('fees', 'type', changeColumnOld);
  }
}
