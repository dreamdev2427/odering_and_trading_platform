import { MigrationInterface, QueryRunner } from 'typeorm';
import { Translations } from 'entities';

const translations: Partial<Translations>[] = [
  {
    key: 'shareItem-sellToCompany',
    locale: 'en',
    translation: 'Sell to company',
  },
  {
    key: 'shareItem-toolTip-sellDisabled',
    locale: 'en',
    translation: 'This type of shares is currently not accepted in the buyback program.',
  },
  {
    key: 'shareItem-toolTip-sellEnabled',
    locale: 'en',
    translation: 'Sell shares to the company',
  },
  {
    key: 'SellProperty-CardHeader-text',
    locale: 'en',
    translation: 'Sell property shares back to the company',
  },
  {
    key: 'SellProperty-CardHeader-caption',
    locale: 'en',
    translation:
      'Here you can notify the project administrators of your wish to sell shares back to them',
  },
  {
    key: 'SellProperty-TableHeader-shareTitle',
    locale: 'en',
    translation: 'Share title',
  },
  {
    key: 'SellProperty-TableHeader-shareCount',
    locale: 'en',
    translation: 'Amount Owned',
  },
  {
    key: 'SellPropertyShare-success-popUp-title',
    locale: 'en',
    translation: 'Your sell request has been sent.',
  },
  {
    key: 'SellShareForm-CardHeader-text',
    locale: 'en',
    translation: 'Sell shares to company',
  },
  {
    key: 'SellShareForm-CardHeader-caption',
    locale: 'en',
    translation: 'Please insert the details required below',
  },
  {
    key: 'SellShareForm-CardHeader-warning',
    locale: 'en',
    translation: 'NOTE: your shares will be sold at the Sell Price price and NOT the Market Value',
  },
  {
    key: 'SellShareForm-Label-marketValue',
    locale: 'en',
    translation: 'Market Value',
  },
  {
    key: 'SellShareForm-Label-SellPrice',
    locale: 'en',
    translation: 'Sell Price',
  },
  {
    key: 'SellShareForm-Input-tokensToTransfer',
    locale: 'en',
    translation: 'Amount of tokens',
  },
  {
    key: 'SellShareForm-Input-certificateNos',
    locale: 'en',
    translation: 'Certificate Nos',
  },
  {
    key: 'SellShareFrom-Input-shareNos',
    locale: 'en',
    translation: 'Share Nos',
  },
  {
    key: 'SellShareForm-Button-sellShares',
    locale: 'en',
    translation: 'Sell Shares',
  },
  {
    key: 'SellShareForm-Error-tooManyToSell',
    locale: 'en',
    translation: 'You cannot sell more shares than you currently own',
  },
  {
    key: 'SellShareForm-Error-tooFewToSell',
    locale: 'en',
    translation:
      'Your total balance is negative. You must sell more shares for a successful transaction',
  },
  {
    key: 'Fees Breakdown',
    locale: 'en',
    translation: 'Fees Breakdown',
  },
  {
    key: 'api-sell-request-already-open',
    locale: 'en',
    translation:
      'You already have an open order to SELL this class of shares back to the company. Please open your portfolio and review your request.',
  },
  {
    key: 'Portfolio-AlertItem-Title',
    locale: 'en',
    translation: 'Transaction Requests',
  },
  {
    key: 'Portfolio-AlertItem',
    locale: 'en',
    translation:
      'You have previous transaction requests, the company administration is in the process of reviewing these requests.\nAs soon as the administrator approves your transaction requests, you will receive an email and your portfolio will be updated accordingly.\nYou can delete your requests if you so desire.',
  },
];

export class sellbackTranslations1661290271989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('translations')
      .values(translations)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
