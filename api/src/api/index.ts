import MoonpayResolvers from '../services/moonpay/gql/moonpay.resolvers';
import BuyAlertResolvers from './buy-alert/buy-alert.resolvers';
import DepositAlertResolvers from './deposit-alert/deposit-alert.resolvers';
import InvestingEntityResolvers from './investing-entity/investing-entity.resolvers';
import MarketSpaceResolvers from './market-space/market-space.resolvers';
import MeetingResolvers from './meetings/meeting.resolvers';
import MercuryResolver from './mercury/mercury.resolvers';
import CoreResolvers from './core.resolvers';
import CurrencyResolvers from './currency.resolvers';
import DocumentsResolver from './document.resolvers';
import InboxResolvers from './inbox.resolvers';
import InvestorResolvers from './investor/investor.resolvers';
import InvestorBalancesResolvers from './investor/investor-balances.resolvers';
import InvestorStoResolvers from './investor/investor-sto.resolvers';
import KycResolvers from './kyc.resolvers';
import PaymentChannelsResolvers from './payment-channel.resolvers';
import PublicKeyResolvers from './public-key.resolvers';
import ShareTypesResolvers from './share-types.resolvers';
import InvestorDividendsResolvers from './investor/investor-dividends.resolvers';
import SharesResolvers from './shares.resolvers';
import StosResolvers from './stos.resolvers';
import UpdatesResolvers from './updates.resolvers';
import AdminResolvers from './admin';
import VerifyInvestorResolvers from './accreditation/verifyInvestor.resolvers';
import BlockchainResolvers from './crypto/blockchain.resolvers';
import VerifierResolvers from './crypto/verifyer.resolver';
import FeeResolvers from './fee/fee.resolvers';
import FeeCommissionResolvers from './fee-commission/fee-commission.resolvers';
import ExternalKycResolvers from './external-kyc/external-kyc.resolvers';
import ExchangeResolvers from './exchange';
import SharesWalletResolvers from './shares-wallet/shares-wallet.resolvers';
import SwapTokenResolvers from './swap-token/swap-token.resolvers';
import InvestorTypeResolver from './investor/investor-type.resolvers';
import BlockchainTransactionTransferResolvers from './crypto/blockchain-transaction-transfer.resolvers';
import InvoiceAlertResolvers from './invoice-alert/invoice-alert.resolvers';
import ChatResolvers from './chat/chat.resolvers';
import UserResolvers from './user/user.resolvers';
import InvestorBanksResolvers from './investor/investor-bank-accounts.resolvers';
import TranslationsResolvers from './translations.resolvers';
import ComponentCustomizationResolvers from './component-customization/component-customization.resolvers';

const resolvers = [
  BuyAlertResolvers,
  DepositAlertResolvers,
  InvestingEntityResolvers,
  MarketSpaceResolvers,
  MeetingResolvers,
  MercuryResolver,
  BuyAlertResolvers,
  CoreResolvers,
  CurrencyResolvers,
  DepositAlertResolvers,
  DocumentsResolver,
  InboxResolvers,
  InvestorResolvers,
  InvestorBalancesResolvers,
  InvestorStoResolvers,
  KycResolvers,
  MarketSpaceResolvers,
  PaymentChannelsResolvers,
  PublicKeyResolvers,
  ShareTypesResolvers,
  InvestorDividendsResolvers,
  SharesResolvers,
  StosResolvers,
  UpdatesResolvers,
  ...AdminResolvers,
  VerifyInvestorResolvers,
  BlockchainResolvers,
  VerifierResolvers,
  FeeResolvers,
  FeeCommissionResolvers,
  ExternalKycResolvers,
  SharesWalletResolvers,
  SwapTokenResolvers,
  InvestorTypeResolver,
  ...ExchangeResolvers,
  MoonpayResolvers,
  BlockchainTransactionTransferResolvers,
  InvoiceAlertResolvers,
  ChatResolvers,
  UserResolvers,
  InvestorBanksResolvers,
  TranslationsResolvers,
  ComponentCustomizationResolvers,
] as const;

export default resolvers;
