import { PriceOracleDefinition } from './config';
import FixerPriceOracle from './FixerPriceOracle';
import LcwPriceOracle from './LcwPriceOracle';
import PriceOracle from './PriceOracle';

/** Used for setup */
const processMultiCurrencyInput = (currency: string | string[]): string[] => {
    if (!Array.isArray(currency)) {
        return [currency.toUpperCase()];
    }
    return currency.map(item => item.toUpperCase());
}
// I define this interface in here as it has no real reason to move
/**
 * Determines which price oracle to launch from a definition
 */
export interface IPriceOracleFactory {
    get(def: PriceOracleDefinition): PriceOracle;
}
export default class PriceOracleFactory implements IPriceOracleFactory {
    currenciesFrom: string[] = [];
    currenciesTo: string[] = [];

    get(def: PriceOracleDefinition): PriceOracle {
        this.currenciesFrom = processMultiCurrencyInput(def.from);
        this.currenciesTo = processMultiCurrencyInput(def.to);
        switch(def.vendor) {
            case 'livecoinwatch':
            default:
                return new LcwPriceOracle(this.currenciesFrom, this.currenciesTo, def.interval);
            case 'fixer':
            case 'fixer.io':
                return new FixerPriceOracle(this.currenciesFrom, this.currenciesTo, def.interval);
        }
    }

}
