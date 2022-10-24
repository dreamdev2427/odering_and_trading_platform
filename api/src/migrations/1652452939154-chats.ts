import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class chats1652452939154 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'chats',
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
            enum: ['INVESTOR', 'ADMIN'],
            enumName: 'senderEnum',
            isNullable: false,
          },
          {
            name: 'investorID',
            type: 'int',
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
            name: 'type',
            type: 'enum',
            enum: ['MESSAGE', 'FILE'],
            enumName: 'typeEnum',
            default: '"MESSAGE"',
            isNullable: false,
          },
          {
            name: 'dateSent',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'isRead',
            type: 'tinyint',
            width: 1,
            default: 0,
          },
          {
            name: 'dateRead',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'isEdited',
            type: 'tinyint',
            width: 1,
            default: 0,
          },
          {
            name: 'location',
            type: 'varchar',
            length: '128',
            isNullable: true,
          },
          {
            name: 'isDeleted',
            type: 'tinyint',
            width: 1,
            default: 0,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('chats');
  }
}
