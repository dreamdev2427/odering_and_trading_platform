import { Params, Translations } from 'entities';
import { MigrationInterface, QueryRunner } from 'typeorm';

const translations: Partial<Translations>[] = [
  {
    key: 'ActiveProperty-Buy',
    locale: 'en',
    translation: 'Purchase More Shares',
  },
  {
    key: 'ActiveProperty-BsSwal-OngoingTransaction-NotSigned-Title',
    locale: 'en',
    translation: 'Ongoing transaction',
  },
  {
    key: 'ActiveProperty-BsSwal-OngoingTransaction-NotSigned-Text',
    locale: 'en',
    translation:
      'There is already an ongoing transaction for this property, you will be redirected to continue the transaction process, you may also click the confirm button to redirect right away.',
  },
  {
    key: 'ActiveProperty-BsSwal-OngoingTransaction-Signed-Title',
    locale: 'en',
    translation: 'Ongoing transaction.',
  },
  {
    key: 'ActiveProperty-BsSwal-OngoingTransaction-Signed-Text',
    locale: 'en',
    translation:
      'There is already an ongoing transaction for this property, for which you have signed all necessary documents. This transaction needs to be processed first before opening a new one of the same type.',
  },
];

export class DIG803UpdateTranslationAndDefaultParamValue1663097481919
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .update(Params)
      .set({ intValue: 1 })
      .where('param = "isAllDocumentsSignedPopUpEnabled"')
      .execute();
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
    await queryRunner.manager
      .createQueryBuilder()
      .update(Params)
      .set({ intValue: 0 })
      .where('param = "isAllDocumentsSignedPopUpEnabled"')
      .execute();
  }
}
