import QueryObjectDto from "../../../investorClient/investor/dto/QueryObjectDto";
import { Currency } from "../../../../Schema";

export default interface ICurrencyService {
  /**
   * Counts the number of records that match the given query
   * @param searchQueryObjects
   */
  countCurrencies(searchQueryObjects?: QueryObjectDto[]): Promise<number>;
  /**
   * gets all the currencies that match the search criteria, as well as ordering them based on the order criteria
   * @param recordsPage the navigation page
   * @param searchQueryObjects
   * @param orderQueryObjects
   */
  getCurrencies(
    recordsPage?: number,
    searchQueryObjects?: QueryObjectDto[],
    orderQueryObjects?: QueryObjectDto[]
  ): Promise<Currency[]>;

  /**
   * adds or updates the provided currency object. Distinction made through the ID
   * @param currency
   */
  addOrUpdateCurrency(currency: Currency): Promise<void>;

  /**
   * get currency by ID
   * @param currencyID
   */
  findById(currencyID: number): Promise<Currency | null>;
}
