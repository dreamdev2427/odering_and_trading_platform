import { MercuryConfig, MercuryRecipient } from 'services/mercury/types';
import { mercuryEndpoint } from 'services/mercury/defs';
import got from 'got';
import { fetchInvestorById } from '../investor/find';

export default async (
  config: MercuryConfig,
  investorID: number,
): Promise<MercuryRecipient | null> =>
  fetchInvestorById(investorID).then((investor) =>
    investor.mercuryID
      ? got<MercuryRecipient>(`${mercuryEndpoint}/recipient/${investor.mercuryID}`, {
          method: 'GET',
          responseType: 'json',
          headers: {
            Authorization: `Bearer ${config.APIKey}`,
          },
        }).then((response) => response.body)
      : null,
  );

// 60*60*1000);// 1x per hour
