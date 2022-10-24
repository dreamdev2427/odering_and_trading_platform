/* eslint-disable class-methods-use-this */
import { findMany, findOne, insert, update } from "../../../modules/db";
import { StosMetaKeys } from "../../../Schema";
import IStosMetaKeysService from "./IStosMetaKeysService";

export default class StosMetaKeysSqlService implements IStosMetaKeysService {
  async getStosMetaKeys(): Promise<StosMetaKeys[]> {
    return findMany<StosMetaKeys>(`SELECT * FROM stosMetaKeys;`);
  }

  async update(
    key: string,
    type: string,
    order: number,
    display: number
  ): Promise<void> {
    const sql = "SELECT * FROM stosMetaKeys WHERE `key` = ?";
    const rec = await findOne<StosMetaKeys>(sql, [key]);
    if (!rec) {
      const sqlInsert =
        "INSERT INTO stosMetaKeys(`key`,`type`,`order`, `display`) VALUES (?,?,?,?);";
      return insert(sqlInsert, [key, type, order, display]);
    }

    const sqlUpdate =
      "UPDATE stosMetaKeys SET `type` = ?, `order` = ?, `display` = ? WHERE `key` = ?";
    return update(sqlUpdate, [type, order, display, key]);
  }

  async remove(key: string): Promise<void> {
    const sqlValues = "DELETE FROM stosMetaValues WHERE `key` = ?";
    const sqlKeys = "DELETE FROM stosMetaKeys WHERE `key` = ?";
    await insert(sqlValues, [key]);
    return insert(sqlKeys, [key]);
  }
}
