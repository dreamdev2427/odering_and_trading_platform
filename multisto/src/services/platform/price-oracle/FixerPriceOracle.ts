import logger from '../../../logger';
import { send } from '../../../modules/httpsHandler';
import { getFixerAccessToken } from './config';
import { FixerResponse } from './dto/fixer';
import PriceOracle, { ConversionRate, ConversionRelation, ConversionTypes } from './PriceOracle';

export default class FixerPriceOracle extends PriceOracle {
    readonly meta = {
        relation: ConversionRelation.ONE_MANY,
        conversionTypes: ConversionTypes.FIAT_ONLY,
    }

    private static vendor ='FixerPriceOracle';
    private vendor  = FixerPriceOracle.vendor;

    protected httpOptions = {
        port: 80,
        host: 'data.fixer.io',
        headers: {

        },
        path: `/latest?access_key=${getFixerAccessToken()}`,
        method: 'GET',
        logResponseErrors: true,
        useHttps: false,
        useHttp: true,
    }

    getVendor(): string {
        return this.vendor;
    }

    protected printStartingMessage(): void {
        logger.info(`Started Price Oracle worker [${this.currencyCodesFrom} => ${this.currencyCodesTo}] vendor: ${FixerPriceOracle.vendor}`);
    }

    protected async fetchRates(): Promise<ConversionRate[]> {
        this._validateRelation(this.meta);
        await this.getCurrencyIds();
        try {
            const res = await send<FixerResponse>({
                ...this.httpOptions,
                path: `${this.httpOptions.path}&base=${this.currenciesFrom[0].Abbreviation}&symbols=${this.currenciesTo.map(c => c.Abbreviation).join()}`,
            });
            if(!res.body.success) {
                throw new Error(`Fixer.io: ${JSON.stringify(res.body)}`);
            }
            console.log(`Fetching Rate [${this.currenciesFrom.map(c => c.Abbreviation)} => ${this.currenciesTo.map(c => c.Abbreviation)}]`);
            return Object.entries(res.body.rates).map(([code, rate]) => ({
                from: this.currencyCodesFrom[0],
                to: code,
                rate: rate.toString(),
            }));
        } catch (e) {
            logger.error(`${(e as Error).stack}`);
            return [];
        }
    }
}
