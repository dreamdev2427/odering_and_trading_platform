/* eslint-disable class-methods-use-this */
import mysql from "../../../../modules/mysql";
import { findMany, findOne } from "../../../../modules/db";
import { Stos, StosMetaKeys } from "../../../../Schema";
import IStoService from "./IStoService";

export default class StoSqlService implements IStoService {
  async getStos(): Promise<Stos[]> {
    return findMany<Stos>(`SELECT * FROM stos;`);
  }

  async getInvestableStos(): Promise<Stos[]> {
    return findMany<Stos>(
      `SELECT * FROM stos WHERE ID <> 0 AND isICOShareTypeCompany = 0`
    );
  }

  async getStoIds(): Promise<number[]> {
    const results = await findMany<Stos>(`SELECT ID from stos;`);
    return results.map((row) => row.ID);
  }

  async getAffiliateShareTypeId(stoId: number): Promise<number | undefined> {
    const result = await findOne<Stos>(
      `SELECT affiliateShareTypeId FROM stos WHERE id = ?`,
      [stoId]
    );
    return result?.affiliateShareTypeId || undefined;
  }

  async getStoExists(stoId: number): Promise<boolean> {
    const result = await findOne<Stos>(`SELECT 1 FROM stos WHERE id = ?`, [
      stoId,
    ]);
    return !!result;
  }

  async getSto(stoId: number): Promise<Stos | null> {
    return findOne<Stos>(`SELECT * FROM stos WHERE id = ?`, [stoId]);
  }

  async copyStoParameters(
    copySettingsStoId: number,
    pasteSettingsStoId: number,
    fieldsToBeCopied: string[]
  ): Promise<void> {
    const searchFieldsDictionary: any = {
      disclamerText: "disclamer",
      emailFooterText: "emailFooterText",
      registrationtextText: "registrationtext",
      registrationsuccesstextText: "registrationsuccesstext",
      EmailTxtInvestorBulkUploadText: "EmailTxtInvestorBulkUpload",
      SMTP_Host: "SMTP_Host",
      SMTP_Port: "SMTP_Port",
      SMTP_User: "SMTP_User",
      SMTP_Password: "SMTP_Password",
      SMTP_FromAddress: "SMTP_FromAddress",
    };
    let stmt = "UPDATE stos pasteTable, stos copyTable SET ";
    fieldsToBeCopied.forEach((field) => {
      if (field in searchFieldsDictionary) {
        stmt += ` pasteTable.${searchFieldsDictionary[field]} = copyTable.${searchFieldsDictionary[field]},`;
      }
    });
    stmt = stmt.slice(0, -1); // removing the last , as its not needed
    stmt += " WHERE pasteTable.ID = ? AND copyTable.ID = ? ";
    await mysql.executeSQLStatement(stmt, [
      pasteSettingsStoId,
      copySettingsStoId,
    ]);
  }

  async updateLogoLink(stoId: number, logoLink: string): Promise<void> {
    const sql = `UPDATE stos SET logo = ? WHERE ID = ?`;
    await mysql.executeSQLStatement(sql, [logoLink, stoId]);
  }

  async updateParameter(
    stoId: number,
    column: string,
    value: string
  ): Promise<void> {
    const sql = `UPDATE stos SET ${column} = ? WHERE ID = ?`;
    await mysql.executeSQLStatement(sql, [value, stoId]);
  }

  async updateMetadata(
    stoId: number,
    metadata: { [id: string]: string }
  ): Promise<void> {
    const sql = `SELECT * FROM stosMetaKeys;`;
    const metadataKeys = (await mysql.executeSQLStatement(sql, [
      stoId,
    ])) as StosMetaKeys[];
    const updatePromises = metadataKeys
      .map((keyObject) => keyObject.key)
      .map((metadataKey) =>
        mysql.executeSQLStatement(
          `REPLACE INTO \`stosMetaValues\` (\`stoID\`, \`key\`, \`value\`) VALUES (?, ?, ?)`,
          [stoId, metadataKey, metadata[metadataKey] ?? ""]
        )
      );
    await Promise.all(updatePromises);
  }
}
