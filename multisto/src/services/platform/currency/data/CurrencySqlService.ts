import { insert, findOne, findMany } from "../../../../modules/db";
import ICurrencyService from "./ICurrencyService";
import QueryObjectDto from "../../../investorClient/investor/dto/QueryObjectDto";
import { Currency } from "../../../../Schema";

export default class CurrencySqlService implements ICurrencyService {
  queryDictionary: any = {
    searchId: " ID LIKE ? ",
    searchCountry: " Country LIKE ? ",
    searchCurrency: " Currency LIKE ? ",
    searchAbbreviation: " Abbreviation LIKE ? ",
    searchSymbol: " Symbol LIKE ? ",
    searchIsBlockchainBased: " isBlockchainBased LIKE ? ",
    orderId: " ID ",
    orderCountry: " Country ",
    orderCurrency: " Currency ",
    orderAbbreviation: " Abbreviation ",
    orderSymbol: " Symbol ",
    orderIsBlockchainBased: " isBlockchainBased ",
  };
  countCurrencies = async (
    searchQueryObjects: QueryObjectDto[]
  ): Promise<number> => {
    let sql = `SELECT count(*) as count FROM currency WHERE ID > 0 `;
    const data: any = [];
    if (searchQueryObjects && searchQueryObjects?.length > 0) {
      searchQueryObjects.forEach((query: QueryObjectDto) => {
        if (this.queryDictionary[query.name]) {
          sql += ` AND ${this.queryDictionary[query.name]} `;
          data.push(`%${query.data}%`);
        }
      });
    }
    const result = await findOne<{ count: number }>(sql, data);
    return result?.count || 0;
  };
  getCurrencies = (
    recordsPage?: number,
    searchQueryObjects?: QueryObjectDto[],
    orderQueryObjects?: QueryObjectDto[]
  ): Promise<Currency[]> => {
    let sql = `SELECT * FROM currency WHERE ID > 0  `;
    const data = [];
    if (searchQueryObjects && searchQueryObjects?.length > 0) {
      searchQueryObjects.forEach((query: QueryObjectDto) => {
        if (this.queryDictionary[query.name]) {
          sql += ` AND ${this.queryDictionary[query.name]} `;
          data.push(`%${query.data}%`);
        }
      });
    }
    if (orderQueryObjects && orderQueryObjects?.length > 0) {
      sql += ` ORDER BY true`;
      orderQueryObjects.forEach((query: QueryObjectDto) => {
        if (this.queryDictionary[query.name]) {
          sql += `, ${this.queryDictionary[query.name]} ${query.data}`;
        }
      });
    }

    if (recordsPage !== undefined) {
      const globalObj: any = global as any; // Fetch global object
      const offset = globalObj.config.RecordsPerPaging;
      sql += ` LIMIT ?, ?`;
      data.push((recordsPage - 1) * offset);
      data.push(offset);
    }
    return findMany<Currency>(sql, data);
  };
  addOrUpdateCurrency = (currency: Currency): Promise<void> => {
    const sql = `INSERT INTO currency(ID, Country, Currency, Abbreviation, Symbol, isBlockchainBased)
                VALUES (?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE  
                    Country = VALUES(Country), 
                    Currency = VALUES(Currency), 
                    Abbreviation = VALUES(Abbreviation), 
                    Symbol = VALUES(Symbol),
                    isBlockchainBased = VALUES(isBlockchainBased);`;
    return insert(sql, [
      currency.ID,
      currency.Country,
      currency.Currency,
      currency.Abbreviation,
      currency.Symbol,
      currency.isBlockchainBased,
    ]);
  };
  findById = async (currencyID: number): Promise<Currency | null> => {
    const sql = `SELECT * FROM currency WHERE ID = ?`;
    return findOne<Currency>(sql, [currencyID]);
  };
}
