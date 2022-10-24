import { mercuryEndpoint } from 'services/mercury/defs';
import { MercuryAccount, MercuryConfig } from 'services/mercury/types';
import got from 'got';

export default async (config: MercuryConfig): Promise<MercuryAccount> =>
  got<MercuryAccount>(`${mercuryEndpoint}/account/${config.accountID}`, {
    method: 'GET',
    responseType: 'json',
    headers: {
      Authorization: `Bearer ${config.APIKey}`,
    },
  }).then((response) => response.body);
