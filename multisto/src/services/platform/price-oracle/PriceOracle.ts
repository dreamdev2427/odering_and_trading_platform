import logger from '../../../logger';
import { Currency } from '../../../Schema';
import CurrencySqlService from './data/CurrencySqlService';
import ICurrencyService from './data/ICurrencyService';
import IPaymentChannelService from './data/IPaymentChannelService';
import PaymentChannelSqlService from './data/PaymentChannelSqlService';

export type ConversionRate = { from: string; to: string; rate: string; };
export enum ConversionRelation { ONE_ONE, ONE_MANY, MANY_ONE, MANY_MANY };
export enum ConversionTypes { FIAT_ONLY, CRYPTO_ONLY, FIAT_AND_CRYPTO };
export type PriceOracleMeta = {
    relation: ConversionRelation;
    conversionTypes: ConversionTypes;
};

/**
 * The Price Oracle is an object that traces a given set of conversion rates per single API request,
 * and then saves those conversion rates in payment channels if they are needed. If the rates aren't
 * used in any payment channel, the API call is aborted until it detects that it's needed again.
 * The API call happens in fetchRate(), which is the key method that needs to be extended by any API
 * integration (see LcwPriceOracle for an example).
 *
 * It is suggested to use one price oracle per API integration used.
 *
 * The Price Oracle accepts as constructor parameters an array of currencies to watch, where a
 * many-to-one relationship is possible. Example from: ["BTC","ETH"] to: ["EUR"]. These conversion
 * rate definitions reside in a database parameter called priceOracles, look for its interface in config.ts
 * Note that many-to-one conversions are not currently feasible per single API call; use multiple oracles.
 */
export default abstract class PriceOracle {
    protected channelSvc: IPaymentChannelService;
    protected currencySvc: ICurrencyService;
    protected currencyCodesFrom: string[];
    protected currencyCodesTo: string[];
    protected currenciesFrom: Currency[] = [];
    protected currenciesTo: Currency[] = [];
    interval = 10000;

    logUpdates: boolean = false;

    private noChannelsWarningIssued: boolean = false;
    protected latestRate?: string;
    protected latestRates: ConversionRate[] = [];

    readonly abstract meta: PriceOracleMeta;

    constructor(currenciesFrom: string[], currenciesTo: string[], interval?: number) {
        this.channelSvc = new PaymentChannelSqlService();
        this.currencySvc = new CurrencySqlService();
        this.currencyCodesFrom = currenciesFrom;
        this.currencyCodesTo = currenciesTo;
        this.interval = interval ?? 10000;

        this.printStartingMessage();
    }

    protected _validateRelation(meta: PriceOracleMeta): void {
        switch(meta.relation) {
            case ConversionRelation.ONE_ONE:
                if (this.currencyCodesFrom.length > 1 || this.currencyCodesTo.length) {
                    logger.warn(`Price Oracle: vendor: '${this.getVendor()}': Is defined as one-to-one, but is configured to [${this.currencyCodesFrom} => ${this.currencyCodesTo}]`);
                }
                break;
            case ConversionRelation.ONE_MANY:
                if (this.currencyCodesFrom.length > 1) {
                    logger.warn(`Price Oracle: vendor: '${this.getVendor()}': Is defined as one-to-many, but is configured to [${this.currencyCodesFrom} => ${this.currencyCodesTo}]`);
                }
                break;
            case ConversionRelation.MANY_ONE:
                if (this.currencyCodesTo.length > 1) {
                    logger.warn(`Price Oracle: vendor: '${this.getVendor()}': Is defined as many-to-one, but is configured to [${this.currencyCodesFrom} => ${this.currencyCodesTo}]`);
                }
                break;
            default: break;
        }
    }

    /** Metadata about service vendor */
    abstract getVendor(): string;
    protected abstract printStartingMessage(): void;

    getLatestRate(from: string, to: string): string | undefined {
        return this.latestRates.find(rate => rate.from === from && rate.to === to)?.rate;
    }

    /** Makes sure the currency IDs are loaded in the object. Does not work if a currency ID changes dynamically! */
    protected async getCurrencyIds() {
        if (!this.currenciesFrom.length) {
            const currencies = await this.currencySvc.fetchCurrenciesByCode(this.currencyCodesFrom);
            this.currenciesFrom = currencies;
        }
        if (!this.currenciesTo.length) {
            const currencies = await this.currencySvc.fetchCurrenciesByCode(this.currencyCodesTo);
            if (currencies) this.currenciesTo = currencies;
        }
        if (!this.currenciesFrom.length || !this.currenciesTo.length) {
            throw new Error(`Price Oracle currency names are misconfigured. From:'${this.currencyCodesFrom}',id:'${this.currenciesFrom}', To:'${this.currencyCodesTo},id:${this.currenciesTo}'`);
        }
    }

    private logUpdate(): void {
        if (this.logUpdates) {
            logger.info(`Updated conversion rate of ${JSON.stringify(this.currencyCodesFrom)} to ${this.currencyCodesTo} as ${JSON.stringify(this.latestRates)}`);
        }
    }

    /** override this method in concrete implementations */
    protected abstract fetchRates(): Promise<ConversionRate[]>;

    private async fetchRatesCoalesced(): Promise<ConversionRate[]> {
        const rates = await this.fetchRates();
        if (rates === undefined || !rates.length) {
            throw new Error(`Could not fetch rate [${JSON.stringify(this.currencyCodesFrom)} => ${this.currencyCodesTo}] using vendor "${this.getVendor()}""`);
        }
        return rates;
    }

    protected async checkIfChannelsExist(): Promise<boolean> {
        const channels = await this.channelSvc.fetchPaymentChannelsWithConversion(this.currencyCodesFrom, this.currencyCodesTo);
        if (channels.length === 0) {
            if (!this.noChannelsWarningIssued) {
                logger.info(`Price Oracle: Temporarily aborting to update conversion rate [${this.currencyCodesFrom} => ${this.currencyCodesTo}] as no such payment channels exist at the moment.`);
                this.noChannelsWarningIssued = true;
            }
            return false;
        }
        this.noChannelsWarningIssued = true;
        return true;
    }

    async updateAllRates(): Promise<boolean> {
        try {
            if (!await this.checkIfChannelsExist()) {
                // Skip update, since we don't want to waste potential API calls
                return true;
            }

            await this.getCurrencyIds();
            this.latestRates = await this.fetchRatesCoalesced();
            const promises = this.currenciesFrom.map(from =>
                this.currenciesTo.map(to => {
                    const currentRate = this.latestRates.find(rate => rate.from === from.Abbreviation)?.rate;
                    if (currentRate === undefined) {
                        throw new Error(`Unavailable currency conversion rate [${from.Abbreviation} => ${to.Abbreviation}]. Currently stored rates: ${JSON.stringify(this.latestRates)}`);
                    }
                    return this.channelSvc.updateAllConversionRatesFor(from.ID, to.ID, currentRate);
                })
            );
            await Promise.all(promises);
            this.logUpdate();
            return true;
        } catch (e) {
            const err = new Error(`${e}`);
            logger.error(`Price Oracle ------------------------\n${err.stack}\n------------------------`);
            return false;
        }
    }

    from(): string[] {
        return this.currencyCodesFrom;
    }

    to(): string[] {
        return this.currencyCodesTo;
    }
}
