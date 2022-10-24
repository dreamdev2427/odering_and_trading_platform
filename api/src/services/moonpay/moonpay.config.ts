import { ValidationError } from 'apollo-server-core';
import { PARAM } from 'core/envs';
import { Params } from 'entities';
import { _createConfig, _updateConfig } from './helpers/moonpay.config.internal';

/*
  A comlementary service that handles Moonpay's config
*/

/**
 * Expected shape of moonpay config
 */
export interface MoonpayConfig {
  enabled: boolean;
  publishableKey: string;
  secretKey: string;
  webhookKey: string;
  stoWallets: StoWallet[];
  defaultCurrency: string;
  defaultCurrencyID: number;
  lockAmount?: boolean;
  colorCode?: string;
  liveMode?: boolean;
  liveUrl?: string;
  sandboxUrl?: string;
  doRoundUpOn?: number;
  doRoundDownOn?: number;
  language?: string;
  redirectUrl?: string;
}

export interface StoWallet {
  stoID: number;
  walletAddress: string;
  walletAddressTag?: string;
}

/**
 * Load Moonpay configuration from params
 */
export const loadConfig = async (): Promise<MoonpayConfig | null> => {
  const param = await Params.getParam(PARAM.MOONPAY_CONFIG);
  if (!param) return null;
  return JSON.parse(param?.stringValue);
};

/**
 * Load Moonpay configuration from params
 * @param requireEnabled throw error if not enabled
 */
export const loadConfigOrFail = async (requireEnabled?: boolean): Promise<MoonpayConfig> => {
  const config = await loadConfig();
  if (!config) throw new ValidationError(`Moonpay not configured on host`);
  if (requireEnabled && config.enabled !== true)
    throw new ValidationError(`Moonpay is disabled by configuration.`);
  return config;
};

/**
 * Set Moonpay configuration in params
 * @returns create or update status
 * @throws error if have to create config but the input is not full
 */
export const setConfig = async (cfg: Partial<MoonpayConfig>): Promise<'create' | 'update'> => {
  const param = await Params.findOne({ where: { param: PARAM.MOONPAY_CONFIG } });

  if (param) {
    await _updateConfig(cfg, param);
    return 'update';
  } else {
    await _createConfig(cfg);
    return 'create';
  }
};
export default {
  loadConfig,
  loadConfigOrFail,
  setConfig,
};
