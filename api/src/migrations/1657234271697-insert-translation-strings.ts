import { MigrationInterface, QueryRunner } from 'typeorm';

const names = [
  'api-internal-server-error',
  'api-not-enough-balance',
  'api-not-enough-shares',
  'api-purchase-request-already-open',
  'api-below-minimum-request',
  'Trading-Left-Side-Menu',
  'Active-Projects',
  'My-Portfolio',
  'Wallet-Management',
  'ActiveProperty-ViewDetails',
  'ActiveProperty-Buy',
];

export class insertTranslationStrings1657234271697 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('translations')
      .values([
        {
          key: 'api-internal-server-error',
          locale: 'en',
          translation: 'There has been an server error, try again.',
        },
        {
          key: 'api-not-enough-balance',
          locale: 'en',
          translation: 'There is not enough balance on your account.',
        },
        {
          key: 'api-not-enough-shares',
          locale: 'en',
          translation: 'There is not enough shares to buy right now.',
        },
        {
          key: 'api-purchase-request-already-open',
          locale: 'en',
          translation:
            'You already have an order open in this class of share. Please review your previous request.',
        },
        {
          key: 'api-below-minimum-request',
          locale: 'en',
          translation: 'Please enter a number greater than or equal to the minimum shares.',
        },
        {
          key: 'Trading-Left-Side-Menu',
          locale: 'en',
          translation: 'Trading',
        },
        {
          key: 'Active-Projects',
          locale: 'en',
          translation: 'Active Projects',
        },
        {
          key: 'My-Portfolio',
          locale: 'en',
          translation: 'My Portfolio',
        },
        {
          key: 'Wallet-Management',
          locale: 'en',
          translation: 'Wallet Management',
        },
        {
          key: 'ActiveProperty-ViewDetails',
          locale: 'en',
          translation: 'View Details',
        },
        {
          key: 'ActiveProperty-Buy',
          locale: 'en',
          translation: 'Buy',
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const condition = `key = "${names.join('" || key = "')}"`;

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('translations')
      .where(condition)
      .execute();
  }
}
