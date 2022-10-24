import got from 'got';
import logger from '../../logger';
import { mercuryEndpoint } from './defs';
import { MercuryAccount, MercuryConfig } from './types';

export default async (config: MercuryConfig): Promise<MercuryAccount | void> => {
  return got<MercuryAccount>(`${mercuryEndpoint}/account/${config.accountID}`, {
    method: "GET",
    responseType: "json",
    headers: {
      Authorization: `Bearer ${config.APIKey}`
    }
  }).then((response) => response.body)
      .catch((error) => {
          logger.error(`${error} - error occurred in getMercuryAccountInfo`);
      });
}
