import { MigrationInterface, QueryRunner } from 'typeorm';
import { Translations } from 'entities';

const translations: Partial<Translations>[] = [
  {
    key: 'ChannelItem-download-document-title',
    locale: 'en',
    translation: 'Deposit Instructions',
  },
  {
    key: 'ChannelItem-download-button',
    locale: 'en',
    translation: 'Download Deposit Instructions',
  },
];
export class DIG734ModifyPaymentChannelDetailsColumn1660071116299 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // using SQL because TypeOrm would drop the column before changing its type
    await queryRunner.query('ALTER TABLE `paymentchannels` MODIFY COLUMN paymentDetails TEXT');

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('translations')
      .values(translations)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // going down on this will most likely result in data loss on the payment channel details
    await queryRunner.query(
      'ALTER TABLE `paymentchannels` MODIFY COLUMN paymentDetails varchar(4000)',
    );

    const keys: string[] = translations.map((t) => t.key ?? '');
    const condition = `key = "${keys.join('" || key = "')}"`;
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('translations')
      .where(condition)
      .execute();
  }
}
