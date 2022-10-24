import type { MoonpayStoWalletInput } from ".";

/*
 * This input type is not interface, because interfaces
 * do not satisfy the constraint 'SerializableParam' of recoil
 */
export type MoonpayConfigInput = {
  readonly enabled?: boolean;
  readonly publishableKey?: string;
  readonly secretKey?: string;
  readonly webhookKey?: string;
  readonly redirectUrl?: string;
  readonly defaultCurrency?: string;
  readonly defaultCurrencyID?: string;
  readonly stoWallets?: readonly MoonpayStoWalletInput[];
  readonly colorCode?: string;
  readonly lockAmount?: boolean;
  readonly liveUrl?: string;
  readonly sandboxUrl?: string;
  readonly liveMode?: boolean;
  readonly doRoundUpOn?: number;
  readonly doRoundDownOn?: number;
  readonly language?: string;
};
