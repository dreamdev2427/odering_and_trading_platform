import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
} from 'typeorm';

export class addStoIdExchangeOrderOffer1647541058983 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('exchangeoffers', new TableColumn({
      name: 'stoID',
      type: 'int',
      default: 0,
    }));

    await queryRunner.addColumn('exchangeorders', new TableColumn({
      name: 'stoID',
      type: 'int',
      default: 0,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('exchangeoffers', 'stoID');
    await queryRunner.dropColumn('exchangeorders', 'stoID');
  }

}
