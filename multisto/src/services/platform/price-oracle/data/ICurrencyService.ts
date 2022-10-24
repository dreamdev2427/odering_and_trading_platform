import { Currency } from '../../../../Schema';

export default interface ICurrencyService {
    fetchCurrenciesByCode(code: string[]): Promise<Currency[]>;
}
