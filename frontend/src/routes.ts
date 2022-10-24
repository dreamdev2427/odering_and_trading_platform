import React from 'react';

import { isMulti } from 'services/core/helpers';

import ActiveProperties from 'pages/active-properties/ActiveProperties';
import CompanyUpdates from 'pages/company-updates/CompanyUpdates';
import Chat from 'pages/chat/Chat';
import Support from 'pages/chat/Support';
import PriceNegotiationList from 'pages/chat/PriceNegotiationList';
import PriceNegotiation from 'pages/chat/PriceNegotiation';
import ContractDocuments from 'pages/contracts-documents';
import Voting from 'pages/voting/Voting';
import InvestorOwnership from 'pages/investor-ownership/InvestorOwnership';
import Settings from 'pages/settings/Settings';
import TellFriends from 'pages/tell-friend/TellFriends';
import CompanyUpdatesDetailed from 'pages/company-updates/CompanyUpdatesDetailed';
import NewMessage from 'pages/inbox/components/NewMessage';
import ViewMessage from 'pages/inbox/components/ViewMessage';
import Wallet from 'pages/wallet/Wallet';
import Portfolio from 'pages/my-portfolio/Portfolio';
import MarketSpacePropertyDetail from 'pages/active-properties/MarketSpacePropertyDetail';
import Contract from 'pages/contracts-documents/contract/Contract';
import SignedContract from 'pages/contracts-documents/contract/SignedContract';
import BuyProperty from 'pages/active-properties/BuyProperty';
import SellProperty from 'pages/active-properties/SellProperty';
import MoonpayReceiver from 'pages/moonpay/components/MoonpayReceiver';
import MeetingDetails from 'pages/voting/MeetingDetails';
import VotingDetails from 'pages/voting/VotingDetails';
import SharePurchaseSigning from './pages/share-purchasing/SharePurchaseSigning';
import SharePurchasingDocusignReturn from './pages/share-purchasing-contract/SharePurchasingDocusignReturn';
import DocuSignSharePurchasingContract from './pages/share-purchasing-contract/DocuSignSharePurchasingContract';
import HelloSignSharePurchasingContract from './pages/share-purchasing-contract/HelloSignSharePurchasingContract';
import SharePurchasingContractModeDecision from './pages/share-purchasing-contract/SharePurchasingContractModeDecision';
import InternalSignSharePurchasingContract from './pages/share-purchasing-contract/InternalSignSharePurchasingContract';
import InvoiceReview from './pages/share-purchasing/InvoiceReview';
// trading
import TradingPage from './pages/exchange/TradingPage';
import NewBuyOrderPage from './pages/exchange/NewBuyOrderPage';
import NewSellOrderPage from './pages/exchange/NewSellOrderPage';
import OfferDetailPage from './pages/exchange/OfferDetailPage';
import OrderDetailPage from './pages/exchange/OrderDetailPage';
import AtomicSwap from './pages/exchange/AtomicSwap';

export interface MenuRoute {
  path: string;
  name: string;
  component: React.ReactElement | Function;
  layout: string;
  icon?: string;
  show?: () => boolean;
  featureFlagName?: string;
}

// resently we dont use profile menu components
// right now KYC process and profile its same
// and if we need to split profile and kyc process in future
// paste a components this variable
// export const ProfileMenuRoutes;

export const IntermalRoutes = (): MenuRoute[] => [
  {
    path: '/company-update/:_id',
    name: 'company-update-details',
    component: CompanyUpdatesDetailed,
    layout: '/investor',
  },
  {
    path: '/new-message',
    name: 'inbox-new-message',
    component: NewMessage,
    layout: '/investor',
  },
  {
    path: '/details-message/:id',
    name: 'inbox-message-detailed',
    component: ViewMessage,
    layout: '/investor',
  },
  {
    path: '/detail-property/:_id',
    name: 'active-property-detail',
    component: MarketSpacePropertyDetail,
    layout: '/investor',
  },
  {
    path: '/buy-property/:_id',
    name: 'active-property-buy',
    component: BuyProperty,
    layout: '/investor',
  },
  {
    path: '/moonpay-receive',
    name: 'moonpay-receive',
    component: MoonpayReceiver,
    layout: '/investor',
  },
  {
    path: '/sell-property/:_id',
    name: 'active-property-buy',
    component: SellProperty,
    layout: '/investor',
    featureFlagName: 'isSellBackEnabled',
  },
  {
    path: '/contract/:id',
    name: 'contract',
    component: Contract,
    layout: '/investor',
  },
  {
    path: '/signed-contract/:id',
    name: 'signed-contract',
    component: SignedContract,
    layout: '/investor',
  },
  {
    path: '/share-purchase-signing/:id',
    name: 'share-purchase-signing',
    component: SharePurchaseSigning,
    layout: '/investor',
  },
  {
    path: '/invoice/:id',
    name: 'invoice',
    component: InvoiceReview,
    layout: '/investor',
  },
  {
    path: '/share-purchase-contract-mode/:sharepurchaseid/:documentid',
    name: 'share-purchase-contract-mode-redirect',
    component: SharePurchasingContractModeDecision,
    layout: '/investor',
  },
  {
    path: '/internal-sign-share-purchase-contract/:sharepurchaseid/:documentid',
    name: 'internal-sign-share-purchase-contract',
    component: InternalSignSharePurchasingContract,
    layout: '/investor',
  },
  {
    path: '/docu-sign-share-purchase-contract/:sharepurchaseid/:documentid',
    name: 'docu-sign-share-purchase-contract',
    component: DocuSignSharePurchasingContract,
    layout: '/investor',
  },
  {
    path: '/hello-sign-share-purchase-contract/:sharepurchaseid/:documentid',
    name: 'hello-sign-share-purchase-contract',
    component: HelloSignSharePurchasingContract,
    layout: '/investor',
  },
  {
    path: '/share-purchase-docu-sign-return',
    name: 'share-purchase-docu-sign-return',
    component: SharePurchasingDocusignReturn,
    layout: '/investor',
  },
  {
    path: '/sell-order/:shareID',
    name: 'sell-order',
    component: NewSellOrderPage,
    layout: '/investor',
  },
  {
    path: '/order-detail/:orderID',
    name: 'view-order-detail',
    component: OrderDetailPage,
    layout: '/investor',
  },
  {
    path: '/offer-detail/:orderID',
    name: 'view-offer-detail',
    component: OfferDetailPage,
    layout: '/investor',
  },
  {
    path: '/new-buy-order',
    name: 'trading-new-buy-order',
    component: NewBuyOrderPage,
    layout: '/investor',
  },
  {
    path: '/price-negotiation-list/:orderID',
    name: 'exchange-order-price-negotiation-list',
    component: PriceNegotiationList,
    layout: '/investor',
  },
  {
    path: '/price-negotiation/:orderID/:counterpartID',
    name: 'exchange-order-price-negotiation',
    component: PriceNegotiation,
    layout: '/investor',
  },
  {
    path: '/meeting-view/:_id',
    name: 'meeting-view',
    component: MeetingDetails,
    layout: '/investor',
  },
  {
    path: '/voting-view/:_id',
    name: 'voting-view',
    component: VotingDetails,
    layout: '/investor',
  },
  {
    path: '/atomic-swap/:orderID',
    name: 'atomic-swap',
    component: AtomicSwap,
    layout: '/investor',
  },
];

const MainMenuRoutes = (t: (name: string) => string): MenuRoute[] => [
  {
    path: '/wallet',
    name: t('Wallet-Management'),
    icon: 'ti-wallet',
    component: Wallet,
    layout: '/investor',
    show: isMulti,
    featureFlagName: 'isWalletManagementModuleEnabled',
  },
  {
    path: '/Portfolio',
    name: t('My-Portfolio'),
    icon: 'ti-layout-grid3',
    component: Portfolio,
    layout: '/investor',
    show: isMulti,
    featureFlagName: 'isMyPortfolioModuleEnabled',
  },
  {
    path: '/active-properties',
    name: t('Active-Projects'),
    icon: 'ti-home',
    component: ActiveProperties,
    layout: '/investor',
    show: isMulti,
    featureFlagName: 'isActiveOfferingsModuleEnabled',
  },
  {
    path: '/company-updates',
    name: t('Company-Updates'),
    icon: 'ti-volume',
    component: CompanyUpdates,
    layout: '/investor',
    featureFlagName: 'isNewsModuleEnabled',
  },
  {
    path: '/contracts-documents',
    name: t('Contracts-Documents'),
    icon: 'ti-agenda',
    component: ContractDocuments,
    layout: '/investor',
    // show: isSingle,
    featureFlagName: 'isContractsModuleEnabled',
  },
  {
    path: '/voting',
    name: t('Voting'),
    icon: 'ti-stamp',
    component: Voting,
    layout: '/investor',
    featureFlagName: 'isCorporateActionsModuleEnabled',
  },
  {
    path: '/trading',
    name: t('Trading-Left-Side-Menu'),
    icon: 'ti-fullscreen',
    component: TradingPage,
    layout: '/investor',
    featureFlagName: 'isTradingModuleEnabled',
  },
  /*
  {
    path: '/inbox',
    name: t('Inbox'),
    icon: 'ti-email',
    component: Inbox,
    layout: '/investor',
  },
  */
  {
    path: '/chat',
    name: t('Messages'),
    icon: 'ti-comments-smiley',
    component: Chat,
    layout: '/investor',
    featureFlagName: 'isChatModuleEnabled',
  },
  {
    path: '/support',
    name: t('Customer-Support'),
    icon: 'ti-headphone-alt',
    component: Support,
    layout: '/investor',
    featureFlagName: 'isSupportModuleEnabled',
  },
  {
    path: '/investor-ownership',
    name: t('Investor-Ownership'),
    icon: 'ti-pin2',
    component: InvestorOwnership,
    layout: '/investor',
    featureFlagName: 'isInvestorOwnershipModuleEnabled',
  },
  {
    path: '/my-settings',
    name: t('My-Settings'),
    icon: 'ti-settings',
    component: Settings,
    layout: '/investor',
    featureFlagName: 'isSettingsModuleEnabled',
  },
  {
    path: '/tell-friend',
    name: t('Tell-A-Friend'),
    icon: 'ti-location-arrow',
    component: TellFriends,
    layout: '/investor',
    featureFlagName: 'isTellAFriendModuleEnabled',
  },
  // {
  //   path: '/translations',
  //   name: 'Translations',
  //   icon: 'ti-smallcap',
  //   component: TranslationsView,
  //   layout: '/investor',
  // },
];

export default MainMenuRoutes;
