import { MigrationInterface, QueryRunner } from 'typeorm';
import { SENDER_TYPE, RECEIVER_TYPE } from 'entities/chats';

export class updateExistingChatsData1654785640513 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.update(
      'chats',
      {
        sender: SENDER_TYPE.Investor,
      },
      {
        receiver: RECEIVER_TYPE.Admin,
      },
    );

    await queryRunner.manager.update(
      'chats',
      {
        sender: SENDER_TYPE.Admin,
      },
      {
        receiver: RECEIVER_TYPE.Investor,
      },
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.update(
      'chats',
      {
        sender: SENDER_TYPE.Investor,
      },
      {
        receiver: RECEIVER_TYPE.Admin,
      },
    );

    await queryRunner.manager.update(
      'chats',
      {
        sender: SENDER_TYPE.Admin,
      },
      {
        receiver: RECEIVER_TYPE.Investor,
      },
    );
  }
}
