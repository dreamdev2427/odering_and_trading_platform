import { MigrationInterface, QueryRunner } from 'typeorm';
import { Translations } from 'entities';

const translations: Partial<Translations>[] = [
  {
    key: 'api-kyc-required',
    locale: 'en',
    translation: 'Investor did not pass the KYC process',
  },
  {
    key: 'api-wrong-investing-entity-ID',
    locale: 'en',
    translation: 'Wrong investing entity ID',
  },
  {
    key: 'api-missing-investor-ID',
    locale: 'en',
    translation: 'Missing investor ID',
  },
  {
    key: 'AlertItem-status-KycRequired',
    locale: 'en',
    translation: 'KYC Required',
  },
  {
    key: 'AlertItem-Button-KycRequired',
    locale: 'en',
    translation: 'Complete KYC',
  },
  {
    key: 'AlertItem-PopUp-AllSigned',
    locale: 'en',
    translation: 'All Signed',
  },
  {
    key: 'Portfolio-PopUp-Title',
    locale: 'en',
    translation: 'Status updated',
  },
  {
    key: 'Portfolio-PopUp-Message',
    locale: 'en',
    translation: 'The Administrator viewed your request',
  },
];

export class insertKycRequirementTranslations1657798861389 implements MigrationInterface {
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
