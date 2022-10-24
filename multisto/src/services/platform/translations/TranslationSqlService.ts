/* eslint-disable class-methods-use-this */
import { findMany, findOne, insert, update } from "../../../modules/db";
import { Translations } from "../../../Schema";
import ITranslationService from "./ITranslationService";

export default class TranslationsSqlService implements ITranslationService {
  async getTranslations(language?: string): Promise<Translations[]> {
    const sql = "SELECT * FROM translations;";
    if (language === undefined || language === "All") {
      return findMany(sql);
    }
    return findMany("SELECT * FROM translations WHERE `locale` = ?;", [
      language,
    ]);
  }

  async getLocales(): Promise<string[]> {
    const sql = "SELECT DISTINCT locale FROM translations;";
    return findMany(sql);
  }

  async create(locale: string): Promise<void> {
    let sql = "INSERT INTO translations(`key`,`locale`,`translation`) VALUES ";
    const baseTranslations = await findMany<Translations>(
      "SELECT * FROM translations WHERE `locale` = 'en';"
    );
    baseTranslations.forEach((element: { key: any }) => {
      sql += `\n('${element.key.replace("'", "\\'")}','${locale}',''),`;
    });
    sql = sql.slice(0, sql.length - 1);
    sql += ";";
    return insert(sql);
  }

  async update(
    locale: string,
    key: string,
    translation: string
  ): Promise<void> {
    const sql = "SELECT * FROM translations WHERE `key` = ? AND `locale` = ?";
    const rec = await findOne(sql, [key, locale]);
    if (!rec) {
      const sqlInsert =
        "INSERT INTO translations(`key`,`locale`,`translation`) VALUES (?,?,?);";
      return insert(sqlInsert, [key, locale, translation]);
    }

    const sqlUpdate =
      "UPDATE translations SET translation = ? WHERE `key` = ? AND `locale` = ?";
    return update(sqlUpdate, [translation, key, locale]);
  }
}
