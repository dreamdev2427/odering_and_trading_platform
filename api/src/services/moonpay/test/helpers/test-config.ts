import { MoonpayConfig } from 'services/moonpay/moonpay.config';

export const MP_USDC = 100;
/**
 * These keys could potentially change in the future. Make sure to update them then.
 */
export const testCfg: MoonpayConfig = {
  enabled: true,
  publishableKey: `pk_test_`,
  secretKey: `sk_test_`,
  webhookKey: `wk_test_`,
  stoWallets: [
    {
      stoID: 0,
      walletAddress: '0x000123',
    },
  ],
  defaultCurrency: 'usdc',
  defaultCurrencyID: MP_USDC,
  liveMode: false,
  liveUrl: 'https://buy-sandbox.moonpay.com',
  sandboxUrl: 'https://buy-sandbox.moonpay.com',
};

export default testCfg;
