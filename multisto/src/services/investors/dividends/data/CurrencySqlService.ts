import { Currency } from "../../../../Schema";
import AbstractSqlService from "../../../generic/AbstractSqlService";
import ICurrencyService from "./ICurrencyService";

export class CurrencySqlService
  extends AbstractSqlService
  implements ICurrencyService {
  async list(): Promise<Currency[]> {
    return (await this.runSql(`SELECT * FROM currency`)) as Currency[];
  }
}

const svc = new CurrencySqlService();
export default svc;
