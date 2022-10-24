import logger from '../../../logger';
import { getLcwAccessToken, PriceOracleDefinition } from './config';
import PriceOracle from './PriceOracle';
import PriceOracleFactory, { IPriceOracleFactory } from './PriceOracleFactory';

/** Give up after this many errors */
const errorTolerance = 5; // total errors per all jobs
let errors = 0;
let jobs: NodeJS.Timeout[];
let oracleSvcs: PriceOracle[];

/** Stops all intervals from executing further, notifies of too many errors if appropriate. */
export const terminateAllOracles = () => {
    jobs.forEach(job => {
        clearInterval(job);
    });
    logger.warn(`All Price Oracle jobs have been terminated ${(errors >= errorTolerance) ? 'because error limit was reached' : ''}.`);
}
/** A repeating step in the interval */
export const updatePriceOracle = async (oracle: PriceOracle): Promise<void> => {
    try {
        const success = await oracle.updateAllRates();
        if (errors < errorTolerance && !success) {
            errors += 1;
            logger.warn(`Price Oracle has encountered ${errors} error${(errors > 1) ? 's' : ''} out of ${errorTolerance} permitted.`);
        }
        if (errors >= errorTolerance) {
            terminateAllOracles();
        }
    } catch (e) {
        const error = new Error(`${e}`);
        logger.error(`Terminating all price oracles due to uncaught error.`);
        logger.error(`Price Oracle Worker ------------------------\n${error.stack}\n------------------------`);
        terminateAllOracles();
    }
}
/** A factory for the factory, useful for testing */
const getPriceOracleFactory = (): IPriceOracleFactory => new PriceOracleFactory();
/** Set up the intervals for updating price oracles */
export const startPriceOracles = async (oracles: PriceOracleDefinition[]): Promise<void> => {
    try {
        if (!getLcwAccessToken()) {
            throw new Error(`Price Oracle not started due to a missing config value: lcwAccessToken`);
        }
        if (oracles === undefined) {
            return;
        }
        const factory = getPriceOracleFactory();
        oracleSvcs = oracles.map(def =>
            factory.get(def));
            // We can support multiple providers if we implement a factory or set up some DI
            // new LcwPriceOracle(processMultiCurrencyInput(def.from), processMultiCurrencyInput(def.to), def.interval));
        jobs = await Promise.all(oracleSvcs.map(async oracle => {
            await updatePriceOracle(oracle);
            return setInterval(async () => {
                await updatePriceOracle(oracle);
            }, oracle.interval)
        }));
    } catch (e) {
        const error = new Error(`${e}`);
        logger.error(`Price Oracle Worker ------------------------\n${error.stack}\n------------------------`);
    }
}
/** Scans all oracles and tries to retrieve a rate of the specified conversion type */
export const getRate = (from: string, to: string): string | undefined => {
    const relevantSvcs = oracleSvcs.filter(svc =>
        svc.from().includes(from.toUpperCase()) &&
        svc.to().includes(to.toUpperCase()) &&
        svc.getLatestRate(from, to) !== undefined
    );
    return relevantSvcs[0]?.getLatestRate(from, to) ?? undefined;

};
export default startPriceOracles;
