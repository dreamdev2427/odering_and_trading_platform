import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class KycCustom1630893652249 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'kyc_pages',
        columns: [
          {
            name: 'ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'pageID',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'icon',
            type: 'varchar',
            length: '30',
            isNullable: true,
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'kyc_fields',
        columns: [
          {
            name: 'ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'pageID',
            type: 'int',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'label',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'placeholder',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'error',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'required',
            type: 'boolean',
            default: 0,
          },
          {
            name: 'type',
            type: 'varchar',
            length: '30',
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'kyc_field_values',
        columns: [
          {
            name: 'ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'fieldID',
            type: 'int',
          },
          {
            name: 'value',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'label',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'kyc_pages',
      new TableForeignKey({
        name: 'FC_page_cards',
        columnNames: ['pageID'],
        referencedColumnNames: ['ID'],
        referencedTableName: 'kyc_pages',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'kyc_fields',
      new TableForeignKey({
        name: 'FC_page_fields',
        columnNames: ['pageID'],
        referencedColumnNames: ['ID'],
        referencedTableName: 'kyc_pages',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'kyc_field_values',
      new TableForeignKey({
        name: 'FC_field_values',
        columnNames: ['fieldID'],
        referencedColumnNames: ['ID'],
        referencedTableName: 'kyc_fields',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('kyc_pages', 'FC_page_cards');
    await queryRunner.dropForeignKey('kyc_field_values', 'FC_field_values');
    await queryRunner.dropForeignKey('kyc_fields', 'FC_page_fields');
    await queryRunner.dropTable('kyc_pages');
    await queryRunner.dropTable('kyc_fields');
    await queryRunner.dropTable('kyc_field_values');
  }
}
