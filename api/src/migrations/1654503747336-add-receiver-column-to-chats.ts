import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addReceiverColumnToChats1654503747336 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'chats',
      new TableColumn({
        name: 'receiver',
        type: 'enum',
        enum: ['INVESTOR', 'ADMIN', 'PLATFORM'],
        enumName: 'receiverEnum',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('chats', 'receiver');
  }
}
