import { Currency } from '../../../../Schema';
import AbstractSqlService from '../../../generic/AbstractSqlService';
import ICurrencyService from './ICurrencyService';

export default class CurrencySqlService extends AbstractSqlService implements ICurrencyService {
    fetchCurrenciesByCode(code: string[]): Promise<Currency[]> {
        if (!code.length) {
            throw new Error(`Invalid empty array as argument`);
        }
        const qArgs = this.arrayAsSqlArguments(code);
        return this.runSql(`SELECT * FROM currency WHERE Abbreviation IN (${qArgs})`, code);
    }
}
