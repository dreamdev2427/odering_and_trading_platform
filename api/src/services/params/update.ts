import { Params } from 'entities';
import { PLATFORM_CONFIGURATION_ENUM } from 'core/envs';
import {
  accountDefaults,
  custodyDefaults,
  PlatformConfigurationDefaults,
  walletDefaults,
} from './platformConfigurationDefaults';

const updateParam = async (
  param: string,
  stringValue: string,
  intValue: number,
): Promise<number> => {
  const p = await Params.findOneOrFail({ where: { param } });
  if (intValue !== null) {
    p.intValue = intValue;
  }
  if (stringValue !== null) {
    p.stringValue = stringValue;
  }
  await p.save();
  return p.ID;
};

const doUpdate = async (defaults: PlatformConfigurationDefaults) => {
  for (const [name, partial] of Object.entries(defaults)) {
    await updateParam(name, partial.stringValue ?? '', partial.intValue ?? 0);
  }
};

const updatePlatformConfiguration = async (intValue: number): Promise<boolean> => {
  switch (intValue as PLATFORM_CONFIGURATION_ENUM) {
    case PLATFORM_CONFIGURATION_ENUM.Custody:
      await doUpdate(custodyDefaults);
      break;
    case PLATFORM_CONFIGURATION_ENUM.Wallet:
      await doUpdate(walletDefaults);
      break;
    case PLATFORM_CONFIGURATION_ENUM.Account:
      await doUpdate(accountDefaults);
      break;
  }
  return true;
};

export { updateParam, updatePlatformConfiguration };
