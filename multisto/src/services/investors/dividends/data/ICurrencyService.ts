import { Currency } from "../../../../Schema";

export default interface ICurrencyService {
  list(): Promise<Currency[]>;
}
