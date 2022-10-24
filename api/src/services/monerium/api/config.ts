import { findOne } from 'core/mysql';
import { Params } from 'DBSchema';

let config: MoneriumConfig | undefined = undefined;
const developmentConfig: MoneriumConfig = {
  dev: true,
  enabled: true,
  url: 'http://127.0.0.1:3034/api',
  headers: {
    Authentication: 'Bearer none',
  },
  /* REALLY need to improve this. */
  clients: {
    '0': {
      moneriumClientId: '0000-0000-0000-0000',
      moneriumProfileId: '0000-0000-0000-0000',
      clientSecret: 'client-secret',
      ethAddress: '0x246A5c395A408De02fE87CBa174D6a2566C5095B',
      signature: '0x00',
    },
  },
  getAccessToken: {
    path: 'auth/token',
    method: 'POST',
  },
  getRefreshToken: {
    path: 'auth/token',
    method: 'POST',
  },
  makeIssueOrder: {
    path: 'orders/makeOrder',
    method: 'POST',
  },
  makeRedeemOrder: {
    path: 'redeemOrder',
    method: 'POST',
  },
  getAllOrders: {
    path: 'orders',
    method: 'GET',
  },
  getProfile: {
    path: 'profile/:profile',
    method: 'GET',
  },
};
const fetchConfigFromDb = async (): Promise<void> => {
  try {
    const cfgParam: Params | null = await findOne<Params>(
      `SELECT * FROM params WHERE param='moneriumConfig'`,
    );
    if (cfgParam) {
      config = JSON.parse(cfgParam.stringValue as string);
    }
  } catch (error) {
    console.error(`Error on retreiving Monerium configuration:\n${error}`);
  }
};
export const loadConfig = async (): Promise<MoneriumConfig> => {
  if (!config) {
    await fetchConfigFromDb();
  }
  if (config) {
    return config;
  }
  console.warn('Using Monerium test configuration');
  return Promise.resolve(developmentConfig);
};

export interface ApiAction {
  path: string;
  method: string;
  /** Allow extra parameters, which can be placed in the path */
  [key: string]: string;
}
/**
 * Insert all path params from the object into the path field
 * @param action contains params in path and as keys such as path/:param
 * @returns new ApiAction object with the path parameters inserted
 */
export const fillApiActionParams = (action: ApiAction): ApiAction => {
  const regex = new RegExp(/(?<=\/:).*(?=\/)/g);
  const newAction = action;

  action.path.match(regex)?.forEach((match): void => {
    const param = action[match];
    if (!param) {
      throw new Error(
        `Communication: ApiAction object with path '${action.path}' does not contain a value for parameter '${match}'`,
      );
    }
    newAction.path.replace(`:${match}`, param);
  });
  return newAction;
};
export interface ApiConfig {
  url: string;
  headers: {
    Authentication?: string;
  };
}
export interface MoneriumClientConfig {
  moneriumClientId: string;
  moneriumProfileId: string;
  ethAddress: string;
  clientSecret: string;
  signature: string;
}
export interface MoneriumConfig extends ApiConfig {
  dev?: boolean;
  enabled: boolean;
  clients?: {
    [localId: string]: MoneriumClientConfig;
  };
  getAccessToken: ApiAction;
  getRefreshToken: ApiAction;
  makeIssueOrder: ApiAction;
  makeRedeemOrder: ApiAction;
  getAllOrders: ApiAction;
  getProfile: ApiAction;
}
