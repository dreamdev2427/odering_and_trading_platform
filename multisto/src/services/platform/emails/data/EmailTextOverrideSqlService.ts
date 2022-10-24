import { EmailTextOverrides } from "../../../../Schema";
import AbstractSqlService from "../../../generic/AbstractSqlService";

export default class EmailTextOverrideSqlService extends AbstractSqlService {
  protected tableName = "EmailTextOverrides";

  async getKeys(locale: string = "en"): Promise<EmailTextOverrides[]> {
    const keys = await this.findByRecords<EmailTextOverrides>([{ locale }]);
    return keys.map((key) => ({
      ...key,
      // This is a hack and doesn't conform to the correct type (string) from Schema
      value:
        key.value === "text" || key.value.startsWith("[")
          ? JSON.parse(key.value)
          : key.value,
    }));
  }
}
