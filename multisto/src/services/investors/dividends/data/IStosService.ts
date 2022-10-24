import { Currency } from "../../../../Schema";

export default interface IStosService {
  getDefaultCurrency(stoID: number): Promise<Currency>;
  getDefaultCurrencyID(stoID: number): Promise<number>;
}
