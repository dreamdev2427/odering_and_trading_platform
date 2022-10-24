import { DEFAULT_PROJECT_TYPE_ENUM, PARAM } from 'core/envs';
import { Params } from 'entities';

export interface PlatformConfigurationDefaults {
  [PARAM.IS_BANK_DETAILS_ENABLED]: Partial<Params>;
  [PARAM.IS_BLOCKCHAIN_ADDRESS_ENABLED]: Partial<Params>;
  [PARAM.DEFAULT_PROJECT_TYPE]: Partial<Params>;
  [PARAM.IS_PRIVATE_MODULE_ENABLED]: Partial<Params>;
  [PARAM.IS_AUTOMATIC_SHARE_CLASS_SETTINGS_ENABLED]: Partial<Params>;
  [PARAM.DO_AUTOMATIC_PURCHASE]: Partial<Params>;
  [PARAM.INTERNAL_WALLET_MODE]: Partial<Params>;
  [PARAM.IS_INVOICING_ENABLED]: Partial<Params>;
  [PARAM.DEFAULT_CURRENCY_TYPE]: Partial<Params>;
}

export const walletDefaults: PlatformConfigurationDefaults = {
  [PARAM.IS_BANK_DETAILS_ENABLED]: {
    intValue: 0,
  },
  [PARAM.IS_BLOCKCHAIN_ADDRESS_ENABLED]: {
    intValue: 1,
  },
  [PARAM.DEFAULT_PROJECT_TYPE]: {
    intValue: DEFAULT_PROJECT_TYPE_ENUM.Tokenized,
  },
  [PARAM.IS_PRIVATE_MODULE_ENABLED]: {
    intValue: 1,
  },
  [PARAM.IS_AUTOMATIC_SHARE_CLASS_SETTINGS_ENABLED]: {
    intValue: 1,
  },
  [PARAM.DO_AUTOMATIC_PURCHASE]: {
    intValue: 1,
  },
  [PARAM.INTERNAL_WALLET_MODE]: {
    intValue: 3,
  },
  [PARAM.IS_INVOICING_ENABLED]: {
    intValue: 1,
  },
  [PARAM.DEFAULT_CURRENCY_TYPE]: {
    intValue: 2,
  },
};

export const accountDefaults: PlatformConfigurationDefaults = {
  [PARAM.IS_BLOCKCHAIN_ADDRESS_ENABLED]: {
    intValue: 0,
  },
  [PARAM.IS_BANK_DETAILS_ENABLED]: {
    intValue: 1,
  },
  [PARAM.DEFAULT_PROJECT_TYPE]: {
    intValue: DEFAULT_PROJECT_TYPE_ENUM.NonTokenized,
  },
  [PARAM.IS_PRIVATE_MODULE_ENABLED]: {
    intValue: 0,
  },
  [PARAM.IS_AUTOMATIC_SHARE_CLASS_SETTINGS_ENABLED]: {
    intValue: 0,
  },
  [PARAM.DO_AUTOMATIC_PURCHASE]: {
    intValue: 0,
  },
  [PARAM.INTERNAL_WALLET_MODE]: {
    intValue: 3,
  },
  [PARAM.IS_INVOICING_ENABLED]: {
    intValue: 1,
  },
  [PARAM.DEFAULT_CURRENCY_TYPE]: {
    intValue: 1,
  },
};

export const custodyDefaults: PlatformConfigurationDefaults = {
  [PARAM.IS_BLOCKCHAIN_ADDRESS_ENABLED]: {
    intValue: 1,
  },
  [PARAM.IS_BANK_DETAILS_ENABLED]: {
    intValue: 1,
  },
  [PARAM.DEFAULT_PROJECT_TYPE]: {
    intValue: DEFAULT_PROJECT_TYPE_ENUM.Combined,
  },
  [PARAM.IS_PRIVATE_MODULE_ENABLED]: {
    intValue: 1,
  },
  [PARAM.IS_AUTOMATIC_SHARE_CLASS_SETTINGS_ENABLED]: {
    intValue: 1,
  },
  [PARAM.DO_AUTOMATIC_PURCHASE]: {
    intValue: 0,
  },
  [PARAM.INTERNAL_WALLET_MODE]: {
    intValue: 2,
  },
  [PARAM.IS_INVOICING_ENABLED]: {
    intValue: 0,
  },
  [PARAM.DEFAULT_CURRENCY_TYPE]: {
    intValue: 3,
  },
};
