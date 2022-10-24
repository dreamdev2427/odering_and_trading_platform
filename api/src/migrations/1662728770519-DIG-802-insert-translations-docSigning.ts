import { Translations } from 'entities';
import { MigrationInterface, QueryRunner } from 'typeorm';

const translations: Partial<Translations>[] = [
  {
    key: 'helloSignSharePurchasingContract-helloSignErrorMessage',
    locale: 'en',
    translation:
      'An error has occured while loading the HelloSign document, please try again in a while. Otherwise please notify an administrator of this issue if the problem persists.',
  },
  {
    key: 'helloSignSharePurchasingContract-helloSignWarnMessage',
    locale: 'en',
    translation: `You have either closed or cancelled the HelloSign document, signing process. You can return and sign the document at any time. These pending documents can be found under the Contracts/Documents page.`,
  },
  {
    key: 'AlertItem-status-PendingDocuments',
    locale: 'en',
    translation: 'Signature(s) Required',
  },
  {
    key: 'DocuSignReturn-SuccessMessage',
    locale: 'en',
    translation: 'Document signed',
  },
  {
    key: 'DocuSignReturn-InternalErrorMessage',
    locale: 'en',
    translation: 'An unexpected internal error has occured, please try again later.',
  },
  {
    key: 'DocuSignReturn-NotSignedTitle',
    locale: 'en',
    translation: 'Documents not signed',
  },
  {
    key: 'DocuSignReturn-NotSignedMessage',
    locale: 'en',
    translation: 'We could not confirm that you have signed the document at DocuSign',
  },
];

export class DIG802InsertTranslationsDocSigning1662728770519 implements MigrationInterface {
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
