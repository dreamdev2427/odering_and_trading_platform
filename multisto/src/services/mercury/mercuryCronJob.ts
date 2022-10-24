import syncMercuryTransactions from './syncMercuryTransactions';
import {getMercuryParam} from './defs';

module.exports = {
    sync: async (): Promise<void> => {
        const param = await getMercuryParam();
        if (param.enabled)
            await syncMercuryTransactions(param)
                .catch((e: any) => console.log(`${e} ${JSON.stringify(e?.response?.body)} - error occurred in mercuryCronJob`));
    }
}
