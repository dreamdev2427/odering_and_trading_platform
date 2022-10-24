import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class AddingHistoricalDataTable1646161533022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sharesHistoricalData',
        columns: [
          {
            name: 'ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
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
            name: 'premiumValue',
            type: 'decimal',
          },
          {
            name: 'dateOfChange',
            type: 'datetime',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'sharesHistoricalData',
      new TableForeignKey({
        name: 'FC_shares_type_id',
        columnNames: ['shareTypeID'],
        referencedColumnNames: ['ID'],
        referencedTableName: 'sharetypes',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const member = await queryRunner.getTable('sharesHistoricalData');
    if (member) {
      await Promise.all(member.foreignKeys.map((key) => queryRunner.dropForeignKey(member, key)));
    }
    await queryRunner.dropTable('sharesHistoricalData');
  }
}
