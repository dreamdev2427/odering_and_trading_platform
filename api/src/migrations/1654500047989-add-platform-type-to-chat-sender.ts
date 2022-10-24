import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addPlatformTypeToChatSender1654500047989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const newColumn = new TableColumn({
      name: 'sender',
      type: 'enum',
      enum: ['INVESTOR', 'ADMIN', 'PLATFORM'],
      enumName: 'senderEnum',
      isNullable: false,
    });
    await queryRunner.changeColumn('chats', 'sender', newColumn);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const oldColumn = new TableColumn({
      name: 'sender',
      type: 'enum',
      enum: ['INVESTOR', 'ADMIN'],
      enumName: 'senderEnum',
      isNullable: false,
    });
    await queryRunner.changeColumn('chats', 'sender', oldColumn);
  }
}
