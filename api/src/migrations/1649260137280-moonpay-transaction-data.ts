import { MOONPAY_TRANSACTION as MT } from 'services/moonpay/entities/moonpay-transaction-data';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class moonpayTransactionData1649260137280 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'MoonpayTransactionData',
        columns: [
          {
            name: 'ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'rawData',
            type: 'blob',
          },
          {
            name: 'salt',
            type: 'varbinary',
            length: '32',
          },
          {
            name: 'objectType',
            type: 'varchar',
            length: '64',
          },
          {
            name: 'dateCreated',
            type: 'datetime',
            length: '3',
          },
          {
            name: 'dateUpdated',
            type: 'datetime',
            length: '3',
          },
          {
            name: 'localStatus',
            type: 'enum',
            enum: [
              MT.ReservedID,
              MT.Pending,
              MT.HadResult,
              MT.Failed,
              MT.ToBeProcessed,
              MT.Processing,
              MT.Processed,
              MT.UnknownTransactionID,
              MT.NotFoundLocally,
              MT.NotFoundOnRemote,
              MT.DoesNotExist,
            ],
            default: `'${MT.ReservedID}'`,
          },
          {
            name: 'referenceID',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'investorID',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'shareTypeID',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('MoonpayTransactionData');
  }
}
