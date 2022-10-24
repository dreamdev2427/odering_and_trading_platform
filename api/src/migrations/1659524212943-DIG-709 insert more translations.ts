import { MigrationInterface, QueryRunner } from 'typeorm';
import { Translations } from 'entities';

const translations: Partial<Translations>[] = [
  {
    key: 'BuyProperty-card-header-text',
    locale: 'en',
    translation: 'Submit your Investment Offer',
  },
  {
    key: 'BuyProperty-card-caption',
    locale: 'en',
    translation: 'Enter share purchase details and send your request to administration',
  },
  {
    key: 'BuyProperty-balancesTitle',
    locale: 'en',
    translation: 'Balances',
  },
  {
    key: 'BuyProperty-currentBalanceLabel',
    locale: 'en',
    translation: 'Your current balance in project account',
  },
  {
    key: 'BuyProperty-noBalance',
    locale: 'en',
    translation: 'No balance found',
  },
  {
    key: 'BuyProperty-depositFundsLabel',
    locale: 'en',
    translation: 'Click to deposit more funds to purchase shares',
  },
  {
    key: 'BuyProperty-shareClassTitle',
    locale: 'en',
    translation: 'Share Class:',
  },
  {
    key: 'BuyProperty-investorEntityLabel',
    locale: 'en',
    translation: 'Investor Entity',
  },
  {
    key: 'BuyProperty-send-button',
    locale: 'en',
    translation: 'Send Buy Shares Request',
  },
  {
    key: 'BuyPropertyShare-missingInvestingEntity-popUp-title',
    locale: 'en',
    translation: 'Please create an investing entity first',
  },
  {
    key: 'BuyPropertyShare-createNewEntity-popUp-title',
    locale: 'en',
    translation: 'Create new entity',
  },
  {
    key: 'BuyPropertyShare-missingFundsInWallet-popUp-title',
    locale: 'en',
    translation: 'Please fund your wallet first',
  },
  {
    key: 'BuyPropertyShare-fundWallet-popUp-title',
    locale: 'en',
    translation: 'Fund Wallet',
  },
  {
    key: 'BuyPropertyShare-missingSharesNumber-popUp-title',
    locale: 'en',
    translation: 'Please enter number of shares to buy',
  },
  {
    key: 'BuyPropertyShare-success-popUp-title',
    locale: 'en',
    translation: 'Your Buy Request has been sent',
  },
  {
    key: 'BuyPropertyShare-SharesAvailable',
    locale: 'en',
    translation: 'Shares Available',
  },
  {
    key: 'BuyPropertyShare-price/share',
    locale: 'en',
    translation: 'Price / Share',
  },
  {
    key: 'BuyPropertyShare-TransactionFee',
    locale: 'en',
    translation: 'Transaction Fee',
  },
  {
    key: 'BuyPropertyShare-minimumShareQuantityLabel',
    locale: 'en',
    translation: 'Minimum Shares to Purchase',
  },
  {
    key: 'BuyPropertyShare-numberOfSharesToBuy',
    locale: 'en',
    translation: 'Number of shares to buy',
  },
  {
    key: 'BuyPropertyShare-adminMessage',
    locale: 'en',
    translation: 'Enter message to administration',
  },
  {
    key: 'BuyPropertyShare-totalPrice',
    locale: 'en',
    translation: 'Total Price',
  },
  {
    key: 'BuyPropertyShare-popUp-continuePurchase',
    locale: 'en',
    translation: 'Resume Purchase',
  },
  {
    key: 'BuyPropertyShare-investmentAmount',
    locale: 'en',
    translation: 'Offer Amount',
  },
  {
    key: 'BuyPropertyShare-minimumInvestment',
    locale: 'en',
    translation: 'Minimum Investment Amount',
  },
];

export class DIG709InsertMoreTranslations1659524212943 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('translations')
      .values(translations)
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('translations')
      .where(`key = "Number of shares to buy" or key = "Send Buy Shares Request"`)
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
