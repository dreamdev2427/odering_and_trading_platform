import { PARAM } from 'core/envs';
import { Params } from 'entities';
import { Jobs } from '../services';
import { MoonpayConfig } from '../moonpay.config';

/*
    A sub-service to moonpay.config
*/

/**
 * Check what is missing from config-like object
 * @param cfg Partial config input
 */
export const _getMissingRequiredKeys = (cfg: Partial<MoonpayConfig>): string[] => {
  /**
   * Please update this object with placeholder values whenever you update the config interface
   */
  const prototype: MoonpayConfig = {
    enabled: true,
    publishableKey: '',
    secretKey: '',
    webhookKey: '',
    stoWallets: [],
    defaultCurrency: '',
    defaultCurrencyID: 0,
  };
  const required = Object.keys(prototype);
  const keys = Object.keys(cfg);
  const missing = required.filter((requiredKey) => !keys.includes(requiredKey));
  if (cfg.stoWallets?.length === 0) missing.push('stoWallets');
  return missing;
};

/**
 * Update config param
 */
export const _updateConfig = async (
  input: Partial<MoonpayConfig>,
  param: Params,
): Promise<void> => {
  try {
    // Attempt to correct any errors in existing config
    // Malformed JSON will throw an error
    // Missing keys will get cross-referenced with input and will also throw error if all are not provided
    const existingCfg = JSON.parse(param.stringValue) as MoonpayConfig;
    // const missingInParam = _getMissingRequiredKeys(existingCfg);

    // Remove undefined fields as they will overwrite existing fields
    Object.keys(input).forEach(
      (key) =>
        (input[key as keyof MoonpayConfig] === undefined ||
          input[key as keyof MoonpayConfig] === null) &&
        delete input[key as keyof MoonpayConfig],
    );

    const newCfg = {
      ...existingCfg,
      ...input,
    };

    const missing = _getMissingRequiredKeys(newCfg);

    if (missing.length) {
      throw new Error(
        `Attempted to update Moonpay config but these required keys are currently not set: ${JSON.stringify(
          missing,
        )}`,
      );
    }
    param.stringValue = JSON.stringify(newCfg);

    if (newCfg.enabled === false) {
      Jobs.stopJobs();
    }
  } catch (e) {
    // On malformed existing param, take all from input
    const missing = _getMissingRequiredKeys(input);
    if (missing.length) {
      throw new Error(
        `Attempted to configure Moonpay but the original config is missing: ${JSON.stringify(
          missing,
        )}`,
      );
    }

    param.stringValue = JSON.stringify(input);
  }
  await param.save();
};

/**
 * Add config param
 */
export const _createConfig = async (cfg: Partial<MoonpayConfig>): Promise<void> => {
  const missing = _getMissingRequiredKeys(cfg);
  if (missing.length) {
    throw new Error(
      `Attempted to create new Moonpay configuration but it's missing required keys: ${JSON.stringify(
        missing,
      )}`,
    );
  }
  const param = Params.create({
    param: PARAM.MOONPAY_CONFIG,
    dataType: 3,
    isGlobal: 1,
    stringValue: JSON.stringify(cfg),
  });
  await param.save();
};
