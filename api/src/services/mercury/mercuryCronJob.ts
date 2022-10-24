import syncMercuryTransactions from 'services/mercury/syncMercuryTransactions';
import { getMercuryParam } from 'services/mercury/defs';

export default async (): Promise<void> => {
  const param = await getMercuryParam();
  if (param.enabled) await syncMercuryTransactions(param);
};
// updateBalances()
