import { DeepPartial } from 'utils';
import { MercuryConfig, MercuryRecipient } from 'services/mercury/types';
import { update } from 'core/mysql';
import { Investor } from 'DBSchema';
import { mercuryEndpoint } from 'services/mercury/defs';
import got from 'got';
import { fetchInvestorById } from '../investor/find';

const updateMercuryRecipientEndpoint = async (
  config: MercuryConfig,
  recipient: { id: string } & DeepPartial<MercuryRecipient>,
): Promise<void> =>
  got<MercuryRecipient>(`${mercuryEndpoint}/recipient/${recipient.id}`, {
    method: 'POST',
    responseType: 'json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.APIKey}`,
    },
    body: JSON.stringify(recipient),
  }).then((response) => {
    if (response.statusCode !== 200) {
      throw new Error(`returned status code ${response.statusCode}`);
    }
  });

const addMercuryIDToInvestor = (investorID: number) => (mercuryID: string) =>
  update('UPDATE investor set mercuryID=? WHERE ID =?', [mercuryID, investorID]);

const createRecipientEndpoint = async (
  config: MercuryConfig,
  recipient: Omit<MercuryRecipient, 'id'>,
): Promise<string> =>
  got<MercuryRecipient>(`${mercuryEndpoint}/recipients`, {
    method: 'POST',
    responseType: 'json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.APIKey}`,
    },
    body: JSON.stringify({
      ...recipient,
      paymentMethod: 'electronic',
    }),
  }).then((response) => {
    if (response.statusCode !== 200) {
      throw new Error(`returned status code ${response.statusCode}`);
    }
    return response.body.id;
  });

const recipientObject = (
  investor: Investor,
  accountNumber: string,
  routingNumber: string,
): Omit<MercuryRecipient, 'id'> => ({
  electronicRoutingInfo: {
    routingNumber,
    accountNumber,
    electronicAccountType: investor.investorType === 0 ? 'personalChecking' : 'businessChecking',
    address: {
      address1: investor.Address ?? '',
      city: investor.town ?? '',
      region: investor.state ?? '',
      postalCode: investor.zip ?? '',
      country: investor.country ?? '',
    },
  },
  name:
    investor.investorType === 0
      ? `${investor.FirstName} ${investor.LastName}`
      : investor.CompanyName ?? '',
  emails: [investor.email],
  paymentMethod: 'electronic',
});

export default async (
  config: MercuryConfig,
  investorID: number,
  accountNumber: string,
  routingNumber: string,
): Promise<any> => {
  const investor: Investor = await fetchInvestorById(investorID);
  const recipientData = recipientObject(investor, accountNumber, routingNumber);
  return investor.mercuryID
    ? updateMercuryRecipientEndpoint(config, { id: investor.mercuryID, ...recipientData })
    : createRecipientEndpoint(config, recipientData).then(addMercuryIDToInvestor(investor.ID));
};
