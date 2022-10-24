import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addTellAFriendFeeType1648144807085 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const newColumn = new TableColumn({
      name: 'type',
      type: 'enum',
      enum: ['REGISTRATION', 'DEPOSIT', 'BUY SHARES', 'EXCHANGE', 'SELL BACK', 'TELL FRIEND'],
      enumName: 'typeEnum',
      isNullable: false,
    });
    await queryRunner.changeColumn('fees', 'type', newColumn);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const oldColumn = new TableColumn({
      name: 'type',
      type: 'enum',
      enum: ['REGISTRATION', 'DEPOSIT', 'BUY SHARES', 'EXCHANGE', 'SELL BACK'],
      enumName: 'typeEnum',
      isNullable: false,
    });
    await queryRunner.changeColumn('fees', 'type', oldColumn);
  }
}
