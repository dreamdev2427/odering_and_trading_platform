import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InvoiceTableCreation1651155008277 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'InvestorInvoices',
        columns: [
          {
            name: 'ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'investorID',
            type: 'int',
          },
          {
            name: 'shareTypeID',
            type: 'int',
          },
          {
            name: 'stoID',
            type: 'int',
          },
          {
            name: 'buyAlertID',
            type: 'int',
          },
          {
            name: 'paymentChannelID',
            type: 'int',
          },
          {
            name: 'shares',
            type: 'decimal',
          },
          {
            name: 'status',
            type: 'int',
            default: 0,
          },
          {
            name: 'amountToPay',
            type: 'decimal',
          },
          {
            name: 'isBlockchain',
            type: 'tinyint',
          },
          {
            name: 'dateCreated',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'invoiceDescription',
            type: 'text',
          },
          {
            name: 'investorWallet',
            type: 'tinytext',
            isNullable: true,
          },
          {
            name: 'dateUpdated',
            type: 'datetime',
            isNullable: true,
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('InvestorInvoices');
  }
}
