import { GraphQLJSON } from 'graphql-scalars';
import { Field, Float, InputType, Int, ObjectType } from 'type-graphql';
import { MoonpayTransactionData } from '../entities';
import { MoonpayConfig, StoWallet } from '../moonpay.config';
import { MoonpayTransaction } from '../moonpay.types';

@InputType('MoonpayStoWalletInput')
@ObjectType('MoonpayStoWallet')
export class MoonpayStoWallet implements StoWallet {
  @Field(() => Int, {
    description:
      'We will use the wallet for this STO ID only, and prefer it over any default wallet. Set stoID to 0 to set as global default wallet, used in case the current STO (when the payment is happening) has no set wallet.',
  })
  stoID: number;

  @Field(() => String, {
    description: 'Use this to configure a single wallet address',
  })
  walletAddress: string;

  @Field(() => String, {
    nullable: true,
    description:
      '(optional) The secondary cryptocurrency wallet address identifier for coins such as EOS, XRP and XMR',
  })
  walletAddressTag?: string;
}

@InputType('MoonpayConfigInput')
@ObjectType('MoonpayConfig')
/**
 * GQL requires an object but I prefer to keep the interface solution when parsing a param.
 */
export class MoonpayConfigGql implements Partial<MoonpayConfig> {
  @Field(() => Boolean, {
    nullable: true,
    description: 'Enable/disable Moonpay as payment processor.',
  })
  enabled?: boolean;

  @Field(() => String, {
    nullable: true,
    description: 'Parameter from your Moonpay company account.',
  })
  publishableKey?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Parameter from your Moonpay company account.',
  })
  secretKey?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Parameter from your Moonpay company account.',
  })
  webhookKey?: string;

  @Field(() => String, {
    nullable: true,
    description: 'MoonPay will redirect here on payment completion.',
  })
  redirectUrl?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Will price shares to this cryptocurrency.',
  })
  defaultCurrency?: string;

  @Field(() => String, {
    nullable: true,
    description:
      "Can not be set manually. It's the ID of the platform currency automatically matching defaultCurrency.",
  })
  defaultCurrencyID?: number;

  @Field(() => [MoonpayStoWallet], {
    nullable: true,
    description:
      'Set up wallets for your company Moonpay crypto. Can set one global and/or multiple STO-specific wallets. The system will detect the STO and match it to a wallet when a payment is performed.',
  })
  stoWallets?: StoWallet[];

  @Field(() => String, {
    nullable: true,
    description:
      'Preferred highlight color for the widget as specified in the MoonPay documentation',
  })
  colorCode?: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'As specified in the MoonPay documentation',
  })
  lockAmount?: boolean;

  @Field(() => String, {
    nullable: true,
    description: 'The MoonPay base URL for live-data transactions',
  })
  liveUrl?: string;

  @Field(() => String, {
    nullable: true,
    description: 'The MoonPay base URL for sandboxed transactions',
  })
  sandboxUrl?: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Use live data. CAUTION',
  })
  liveMode?: boolean;

  @Field(() => Float, {
    nullable: true,
    description:
      'Value between 0-1. Will round up purchased shares whose fractional remainder is above this value.',
  })
  doRoundUpOn?: number;

  @Field(() => Float, {
    nullable: true,
    description:
      'Value between 0-1. Will round down purchased shares whose fractional remainder is below this value.',
  })
  doRoundDownOn?: number;

  @Field(() => String, {
    nullable: true,
    description:
      "ISO 639-1 standard language code. Without this, the language used is the user's browser default.",
  })
  language?: string;
}

@ObjectType()
export class MoonpayTransactionJSON {
  @Field(() => GraphQLJSON, {
    nullable: true,
    description: 'JSON as gotten from MoonPay. If we have it locally.',
  })
  transactionJSON?: Partial<MoonpayTransaction>;

  @Field(() => MoonpayTransactionData, {
    description:
      'Our own data for this transaction. Also contains `object` which == transactionJSON',
  })
  localData: MoonpayTransactionData;
}
