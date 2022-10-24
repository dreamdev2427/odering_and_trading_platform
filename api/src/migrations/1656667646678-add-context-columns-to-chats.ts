import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addContextColumnsToChats1656667646678 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'chats',
      new TableColumn({
        name: 'context',
        type: 'enum',
        enum: ['EXCHANGE ORDER'],
        enumName: 'contextEnum',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'chats',
      new TableColumn({
        name: 'contextID',
        type: 'int',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'chats',
      new TableColumn({
        name: 'contextReceiverID',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('chats', 'context');
    await queryRunner.dropColumn('chats', 'contextID');
    await queryRunner.dropColumn('chats', 'contextReceiverID');
  }
}
