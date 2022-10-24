import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class emailTextOverrides1644943643558 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'EmailTextOverrides',
        columns: [
          {
            name: 'ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'stoID',
            type: 'int',
            // Use as gobal fallback setting
            default: '0',
          },
          {
            name: 'locale',
            type: 'varchar',
            isNullable: false,
            default: "'en'",
            // ca-ES-valencia is the longest locale I've found
            length: '14',
          },
          {
            name: 'emailKey',
            type: 'varchar',
            length: '128',
          },
          {
            name: 'key',
            type: 'varchar',
            length: '128',
          },
          {
            name: 'value',
            type: 'varchar',
            length: '2048',
            charset: 'utf8mb4',
            collation: 'utf8mb4_unicode_ci',
          },
        ],
      }),
    );
    // Must define this composite unique constraint so that upsert function works outside of typeorm
    await queryRunner.query(
      'ALTER TABLE `EmailTextOverrides` ADD UNIQUE `email_key`(`stoID`,`locale`,`emailKey`,`key`)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('EmailTextOverrides');
  }
}
