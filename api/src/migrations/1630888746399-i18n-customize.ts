import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class I18nCustomize1630888746399 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'translations',
        columns: [
          {
            name: 'ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'key',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'locale',
            type: 'varchar',
            length: '2',
          },
          {
            name: 'translation',
            type: 'text',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('translations');
  }
}
