import fsPromises from 'fs/promises';
import { Currency, Investor, Shares, Sharetypes, Stos } from '../../../../../Schema';
import AbstractSqlService from '../../../../generic/AbstractSqlService';

export interface Seed {
    metadata: {
        title: string,
        createdAt: Date,
    }
    stos: Stos[];
    investors: Investor[];
    currency: Currency[];
    shareTypes: Sharetypes[];
    shares: Shares[];
}

export interface ISeeder {
    seed(seed: Seed): Promise<void>;
    unseed(seed: Seed): Promise<void>;
}

export class SqlSeeder extends AbstractSqlService implements ISeeder {
    // I know this can be made more generic, but I'll do that later
    async seed(seed: Seed): Promise<void> {
        try {
            await this.insertMany<Stos>(seed.stos, "stos");
            await this.insertMany<Investor>(seed.investors, "investor");
            await this.insertMany<Currency>(seed.currency, "currency");
            await this.insertMany<Sharetypes>(seed.shareTypes, "sharetypes");
            await this.insertMany<Shares>(seed.shares, "shares");
            await this.saveSeed(seed);
        } catch (e) {
            throw new Error(`Error in SQL Seeder:\n${(e as Error).stack}`);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async unseed(seed: Seed): Promise<void> {
        try {
            await this.clearTables("stos", "investor", "shares", "sharetypes", "currency");
        } catch (e) {
            throw new Error(`Error in SQL Seeder:\n${(e as Error).stack}`);
        }
    }
    /** Writes the seed to a file */
    // eslint-disable-next-line class-methods-use-this
    async saveSeed(seed: Seed): Promise<void> {
        return fsPromises.writeFile(
            `temp/${seed.metadata.title.toLowerCase().replace(' ', '_')}.seed.spec.json`,
            JSON.stringify(seed, null, 4));
    }
}
