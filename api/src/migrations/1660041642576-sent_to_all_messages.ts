import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class sentToAllMessages1660041642576 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sent_to_all_messages',
        columns: [
          {
            name: 'ID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'sender',
            type: 'enum',
            enum: ['ADMIN', 'PLATFORM'],
            enumName: 'senderEnum',
            isNullable: false,
          },
          {
            name: 'adminID',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'stoID',
            type: 'int',
            isNullable: false,
            default: '0',
          },
          {
            name: 'message',
            type: 'varchar',
            length: '2000',
            isNullable: false,
          },
          {
            name: 'dateSent',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sent_to_all_messages');
  }
}
