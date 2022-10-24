import { MigrationInterface, QueryRunner } from 'typeorm';
import { Translations } from '../entities';

const translations: Partial<Translations>[] = [
  {
    key: 'AlertItem-marketspace-PopUp-title',
    locale: 'en',
    translation:
      'Final step: Verify your status as an accredited investor through our secure, third-party software Accredd',
  },
  {
    key: 'AlertItem-marketspace-PopUp-confirm',
    locale: 'en',
    translation: 'Go To Accredd',
  },
  {
    key: 'AlertItem-marketspace-PopUp-cancel',
    locale: 'en',
    translation: 'Maybe Later',
  },
  {
    key: 'Accredd-bsswal-title',
    locale: 'en',
    translation:
      "You will now be directed to Accredd's portal, in a new tab, to verify your accredited investor status.",
  },
  {
    key: 'Accredd-bsswal-confirm',
    locale: 'en',
    translation: 'Ok',
  },
  {
    key: 'Accredd-bsswal-cancel',
    locale: 'en',
    translation: 'Cancel',
  },
  {
    key: 'BuyProperty-add-new-entity-select-option',
    locale: 'en',
    translation: '+ Create new entity',
  },
  {
    key: 'AletItem-PopUp-Alternate-AllSigned',
    locale: 'en',
    translation:
      'Thank you for subscribing to the offering. Your executed documents will be uploaded to the portal within the "Investor Documentation" menu.',
  },
  {
    key: 'BuyPropertyShare-popUp-continuePurchase',
    locale: 'en',
    translation: 'Resume Purchase',
  },
];

export class DIG6871658699747800 implements MigrationInterface {
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
