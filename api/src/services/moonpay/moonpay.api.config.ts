import { ApiConfig, Endpoint } from './helpers/api-integration';
import { DEFAULT_GOT_TIMEOUT } from './helpers/api-integration-internal';
import { MoonpayConfig } from './moonpay.config';
import { MoonpayCurrency, MoonpayError, MoonpayTransaction } from './moonpay.types';

export class MoonpayApiConfig {
  /**
   * Supported Moonpay API version.
   */
  readonly version: number = 3;

  protected config?: MoonpayConfig;

  constructor(config?: MoonpayConfig) {
    this.config = config;
  }

  /** Check an error, see if the resource is not found and return undefined, otherwise throw the error. */
  undefinedOrThrow(error: MoonpayError): undefined {
    if (error.type === 'NotFoundError' || error.name === 'NotFoundError') return undefined;
    throw new Error(JSON.stringify(error));
  }

  /** This URL is only used for the widget and not the MoonPay API. */
  widgetUrl: string = 'https://buy-sandbox.moonpay.com';

  base: ApiConfig = {
    baseUrl: 'https://api.moonpay.com',
    httpSettings: {
      timeout: DEFAULT_GOT_TIMEOUT,
      /** Auto throw rare HTTP errors automatically as to not handle them inside each fetch */
      throwOnHttpError: true,
      throwOnHttpErrorResponse: false,
    },
    // errorPrototype: {
    //   name: `BadRequestError`,
    //   errors: JSON.parse(`[]`),
    //   message: ``,
    // },
  };

  getAllCurrencies: Endpoint<void, MoonpayCurrency> = {
    method: 'GET',
    path: '/v3/currencies',
    query: {
      apiKey: this.config?.publishableKey ?? '',
    },
  };

  /** Retrieve a transaction by its `externalTransactionId` using "Client-side" API. Potentially returns more than 1. */
  getTransaction: Endpoint<void, MoonpayTransaction[]> = {
    method: 'GET',
    path: '/v1/transactions/ext/:id',
    query: {
      apiKey: this.config?.publishableKey ?? '',
    },
    urlParams: {
      id: `0`,
    },
  };

  /** Retrieve a transaction by its `id` on MoonPay using "Client-side" API. Returns 1 object only always, unlike the other ones. */
  getTransactionRemoteID: Endpoint<void, MoonpayTransaction> = {
    method: 'GET',
    path: '/v1/transactions/:id',
    query: {
      apiKey: this.config?.publishableKey ?? '',
    },
    urlParams: {
      id: `0`,
    },
  };

  /**
   * Retrieve a transaction by its `externalTransactionId`.
   * This is the identifier you assigned the transaction when creating it.
   */
  listTransactions: Endpoint<void, MoonpayTransaction[]> = {
    method: 'GET',
    path: '/v1/transactions',
    modifyHeaders: {
      Authorization: `Api-Key ${this.config?.secretKey}`,
    },
    exampleQuery: {
      externalTransactionId: `number`,
      customerId: `uuid`,
      externalCustomerId: `number`,
      startDate: `YYYY-MM-DD`,
      endDate: `YYYY-MM-DD`,
      /** Max 50 */
      limit: `number`,
      /** Start at record number `offset` from newest to oldest. */
      offset: `number`,
    },
  };

  getSellTransaction: Endpoint<void, MoonpayTransaction> = {
    method: 'GET',
    path: '/v1/sell_transactions/ext/:id',
    query: {
      apiKey: this.config?.publishableKey ?? '',
    },
    urlParams: {
      id: `0`,
    },
  };
}
