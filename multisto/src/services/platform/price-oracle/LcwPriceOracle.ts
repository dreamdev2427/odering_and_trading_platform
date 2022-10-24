import logger from '../../../logger';
import { send } from '../../../modules/httpsHandler';
import { getLcwAccessToken } from './config';
import { LcwRequestCoinList, LcwResponseCoin } from './dto/livecoinwatch';
import PriceOracle, { ConversionRate, ConversionRelation, ConversionTypes } from './PriceOracle';

/**
 * This is an implementation for LiveCoinWatch
 */
export default class LcwPriceOracle extends PriceOracle {
    readonly meta = {
        relation: ConversionRelation.MANY_ONE,
        conversionTypes: ConversionTypes.FIAT_AND_CRYPTO,
    }
    protected pathSingle = '/coins/single';
    protected pathList = '/coins/list';

    protected httpOptions = {
        port: 443,
        host: 'api.livecoinwatch.com',
        headers: {
            'x-api-key' : getLcwAccessToken(),
            'content-type': 'application/json',
        },
        path: this.pathList,
        method: 'POST',
        logResponseErrors: true,
        useHttps: true,
    }

    private static vendor = 'LiveCoinWatch';
    private vendor = LcwPriceOracle.vendor;

    getVendor(): string {
        return this.vendor;
    }

    protected printStartingMessage(): void {
        logger.info(`Started Price Oracle worker [${this.currencyCodesFrom} => ${this.currencyCodesTo}] vendor: ${LcwPriceOracle.vendor}`);
    }

    /**
     * Fetches the rate of selected currenceis using LCW.
     *
     * Note: This request only fetches the 50 top ranked coins but it fits the use case.
     * If you are in the future and this is not relevant anymore because doge-based coins
     * have taken over the world (and the Moon) but you still support BTC, you have probably
     * experienced an error that your specific conversion rate could not be found.
     * Review the Live Coin Watch API docs and modify the request below. Maybe add limit: 100,
     * or switch to a specific single-coin fetch.
     */
    protected async fetchRates(): Promise<ConversionRate[]> {
        this._validateRelation(this.meta);
        await this.getCurrencyIds();
        const req: LcwRequestCoinList = {
            currency: this.currencyCodesTo[0],
            meta: false,
            sort: "rank",
            order: "ascending",
        };
        try {
            const res = await send<LcwResponseCoin[]>(this.httpOptions, req);
            console.log(`Fetching Rate [${this.currenciesFrom.map(c => c.Abbreviation)} => ${this.currenciesTo.map(c => c.Abbreviation)}]`);
            return res.body.map(coin => ({
                from: coin.code,
                to: this.currencyCodesTo[0],
                rate: coin.rate,
            }));
        } catch (e) {
            logger.error(`${(e as Error).stack}`);
            return [];
        }
    }
}
