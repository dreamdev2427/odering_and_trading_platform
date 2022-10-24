import { Currency } from "../../../../Schema";
import AbstractSqlService from "../../../generic/AbstractSqlService";
import IStosService from "./IStosService";

export class StosSqlService extends AbstractSqlService implements IStosService {
  async getDefaultCurrencyID(stoID: number): Promise<number> {
    const [stoSettingsRaw] = await this.runSql(
      `SELECT settings FROM stos WHERE ID = ${stoID}`
    );
    const stoSettings = JSON.parse(stoSettingsRaw.settings);
    return +stoSettings.DefaultSTOCurreny;
  }

  async getDefaultCurrency(stoID: number): Promise<Currency> {
    const ID = await this.getDefaultCurrencyID(stoID);
    return this.runSql(`SELECT * FROM currency WHERE ID = ?`, ID);
  }
}

const svc: IStosService = new StosSqlService();
export default svc;
