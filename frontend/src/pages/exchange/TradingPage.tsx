import React from 'react';

import InternalExchange from './components/internal-exchange/InternalExchange';
import MyBuyOrders from './components/my-orders/MyBuyOrders';
import MySellOrders from './components/my-orders/MySellOrders';
import MyBuyOffers from './components/my-offers/MyBuyOffers';
import MySellOffers from './components/my-offers/MySellOffers';
import ExchangeOrders from './components/trading/ExchangeOrders';

const TradingPage: React.FC = () => (
  <div className="content">
    <InternalExchange />
    <MyBuyOrders />
    <MySellOrders />
    <MyBuyOffers />
    <MySellOffers />
    <ExchangeOrders />
  </div>
);

export default TradingPage;
