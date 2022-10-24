import { MigrationInterface, QueryRunner } from 'typeorm';
import { Translations } from 'entities';

const names = [
  'layout-settings',
  'predefined-theme',
  'nav-menu-bar',
  'extend-nav-menu-bar',
  'background',
  'font-color',
  'font-color-active-item',
  'font-weight',
  'application',
  'corner-type',
  'font-color-controls',
  'controls-colors',
  'background-app-color',
];
export class themingParamTranslationChange1658408885385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('params')
      .values({
        param: 'toggleThemeEditor',
        isGlobal: 1,
        dataType: 2,
        intValue: 0,
        stringValue: '',
      })
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .update(Translations)
      .set({ translation: '"Legal Name"' })
      .where('key = "entityItemRowLegalEntityNameLabel"')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('translations')
      .values([
        {
          key: 'Layout-settings',
          locale: 'en',
          translation: 'Layout settings',
        },
        {
          key: 'predefined-theme',
          locale: 'en',
          translation: 'Select a predefined theme',
        },
        {
          key: 'background',
          locale: 'en',
          translation: 'Background',
        },
        {
          key: 'nav-menu-bar',
          locale: 'en',
          translation: 'Navigation menu bar',
        },
        {
          key: 'extend-nav-menu-bar',
          locale: 'en',
          translation: 'Extend navigation bar',
        },
        {
          key: 'font-color',
          locale: 'en',
          translation: 'Font Color',
        },
        {
          key: 'font-color-active-item',
          locale: 'en',
          translation: 'Font color active item',
        },
        {
          key: 'font-weight',
          locale: 'en',
          translation: 'Font Weight',
        },
        {
          key: 'application',
          locale: 'en',
          translation: 'Application',
        },
        {
          key: 'corner-type',
          locale: 'en',
          translation: 'Corner type',
        },
        {
          key: 'font-color-controls',
          locale: 'en',
          translation: 'Font color controls',
        },
        {
          key: 'controls-colors',
          locale: 'en',
          translation: 'Controls colors',
        },
        {
          key: 'background-app-color',
          locale: 'en',
          translation: 'Background App color',
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('params')
      .where('param = "toggleThemeEditor"')
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .update(Translations)
      .set({ translation: '"Legal Entity Name"' })
      .where('key = "entityItemRowLegalEntityNameLabel"')
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
