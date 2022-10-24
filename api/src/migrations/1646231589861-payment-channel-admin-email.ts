import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class PaymentChannelAdminEmail1646231589861 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'paymentchannels',
      new TableColumn({
        name: 'adminEmailHeader',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'paymentchannels',
      new TableColumn({
        name: 'adminEmailBody',
        type: 'varchar',
        length: '2048',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'paymentchannels',
      new TableColumn({
        name: 'sendAdminEmail',
        type: 'tinyint',
        default: 1,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('paymentchannels', 'adminEmailHeader');
    await queryRunner.dropColumn('paymentchannels', 'adminEmailBody');
    await queryRunner.dropColumn('paymentchannels', 'sendAdminEmail');
  }
}