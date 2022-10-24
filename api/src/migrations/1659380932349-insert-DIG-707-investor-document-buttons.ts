import { MigrationInterface, QueryRunner } from 'typeorm';
import { Translations } from '../entities';

const translations: Partial<Translations>[] = [
  {
    key: 'ViewDocumentButton-View',
    locale: 'en',
    translation: 'View',
  },
  {
    key: 'ViewDocumentButton-Download',
    locale: 'en',
    translation: 'Download',
  },
  {
    key: 'ViewDocumentButton-NoLinkFound',
    locale: 'en',
    translation: 'Document is no longer available',
  },
  {
    key: 'Document-Provider-Internal',
    locale: 'en',
    translation: 'Internal Documents',
  },
  {
    key: 'Document-Provider-HelloSign',
    locale: 'en',
    translation: 'HelloSign',
  },
  {
    key: 'Document-Provider-DocuSign',
    locale: 'en',
    translation: 'DocuSign',
  },
  {
    key: 'contract-documents-Index-thead-title',
    locale: 'en',
    translation: 'Title',
  },
  {
    key: 'contract-documents-Index-thead-date',
    locale: 'en',
    translation: 'Signed On',
  },
  {
    key: 'contract-documents-Index-thead-provider',
    locale: 'en',
    translation: 'Provider',
  },
  {
    key: 'contract-documents-Index-thead-buttons',
    locale: 'en',
    translation: '',
  },
];

export class insertDIG707InvestorDocumentButtons1659380932349 implements MigrationInterface {
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
