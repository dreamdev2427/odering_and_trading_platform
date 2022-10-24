import { Translations } from "../../../Schema";

export default interface ITranslationService {
  /**
   * Get all Translations records
   * @param language - string
   */
  getTranslations(language?: string): Promise<Translations[]>;

  /**
   * Get locales
   */
  getLocales(): Promise<string[]>;
  /**
   * Create new translation locale
   * @param locale - string
   */
  create(locale: string): Promise<void>;
  /**
   * Update translation record
   * @param locale - string
   * @param key - string
   * @param translation - string
   */
  update(locale: string, key: string, translation: string): Promise<void>;
}
