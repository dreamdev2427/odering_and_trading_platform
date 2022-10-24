import { MigrationInterface, QueryRunner } from 'typeorm';
import { Translations } from 'entities';

const translations: Partial<Translations>[] = [
  {
    key: 'InvoiceItem-Review',
    locale: 'en',
    translation: 'Review',
  },
  {
    key: 'InvoiceReview-CardHeader-Title',
    locale: 'en',
    translation: 'Payment Request',
  },
  {
    key: 'InvoiceReview-CardHeader-Caption',
    locale: 'en',
    translation: 'Overview of your share purchase',
  },
  {
    key: 'InvoiceReview-PaymentTo',
    locale: 'en',
    translation: 'Payment Request to:',
  },
  {
    key: 'InvoiceReview-Date',
    locale: 'en',
    translation: 'Date:',
  },
  {
    key: 'InvoiceReview-Shares',
    locale: 'en',
    translation: 'Shares:',
  },
  {
    key: 'InvoiceReview-PricePerShare',
    locale: 'en',
    translation: 'Price per Share',
  },
  {
    key: 'InvoiceReview-Quantity',
    locale: 'en',
    translation: 'Quantity:',
  },
  {
    key: 'InvoiceReview-Total',
    locale: 'en',
    translation: 'Total',
  },
  {
    key: 'Login-Title',
    locale: 'en',
    translation: 'Investor Login',
  },
  {
    key: 'Login-SubTitle',
    locale: 'en',
    translation: 'Please enter your user name and password',
  },
  {
    key: 'Login-LoginButton',
    locale: 'en',
    translation: 'Login',
  },
  {
    key: 'Login-Register-Label',
    locale: 'en',
    translation: "Don't have an investor login ?",
  },
];
export class DIG747InsertTranslations1660217036813 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('translations')
      .values(translations)
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values([
        {
          param: 'allowInvestorsToRegister',
          isGlobal: 1,
          dataType: 2,
          intValue: 1,
        },
        {
          param: 'hideContractsTilPostPurchase',
          isGlobal: 1,
          dataType: 2,
          intValue: 0,
        },
      ])
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

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "allowInvestorsToRegister" OR param = "hideContractsTilPostPurchase"')
      .execute();
  }
}
