import { MigrationInterface, QueryRunner } from 'typeorm';

const names = ['ContactCompany-FeedBackEditor-placeholder', 'ContactCompany-Title-placeholder'];

export class insertIsContactTheSponsorFontSwitchEnabledParamAndTranslations1657564169927
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'isContactTheSponsorFontSwitchEnabled',
        isGlobal: 1,
        dataType: 2,
        intValue: 1,
      })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('translations')
      .values([
        {
          key: 'ContactCompany-FeedBackEditor-placeholder',
          locale: 'en',
          translation: 'Enter your message here',
        },
        {
          key: 'ContactCompany-Title-placeholder',
          locale: 'en',
          translation: 'Title',
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "isContactTheSponsorFontSwitchEnabled"')
      .execute();

    const condition = `key = "${names.join('" || key = "')}"`;

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('translations')
      .where(condition)
      .execute();
  }
}
