import React from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { useGetExchangeOfferDetailQuery, ExchangeType, AtomicSwapStatus } from 'services/apollo';
import Auth from 'services/core/auth';

import { Card, CardBody, Loading, Col, BrandIcon } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import NewOffer from './components/offer-details/NewOffer';
import AtomicSwapComponent from './components/offer-details/AtomicSwapComponent';
import OrderDetail from './components/offer-details/OrderDetail';
import ExistingOffer from './components/offer-details/ExistingOffer';

const OfferDetailPage: React.FC = () => {
  const params = useParams<{ orderID: string }>();
  const orderID = parseInt(params.orderID, 10);
  const history = useHistory();
  const { t } = useTranslation();

  const { loading, data } = useGetExchangeOfferDetailQuery({ variables: { orderID } });

  if (loading || !data) {
    return <Loading />;
  }

  const { getExchangeOrder: order, getExchangeOffer: offer } = data;

  if (Auth.payload.ID === order.investorID) {
    history.push(`/investor/order-detail/${orderID}`);
  }

  let showAtomicSwapComponent = false;
  if (order.type === ExchangeType.Sell) {
    showAtomicSwapComponent = [AtomicSwapStatus.SellerSent].includes(order.atomicSwapCurrentStatus);
  }
  if (order.type === ExchangeType.Buy) {
    showAtomicSwapComponent = [AtomicSwapStatus.BuyerCompleted].includes(order.atomicSwapCurrentStatus);
  }

  return (
    <Col className="content">
      <OrderDetail order={order} />

      <Card>
        <CardHeader
          text={t('tradingComponentsOfferDetailsOffersCardHeader')}
          caption={
            t('tradingComponentsOfferDetailsOffersCardCaption') +
            t(`tradingComponentsOfferDetailsBuyOrSellLabelComponent_${order.type}`)
          }
          icon={<BrandIcon icon="info" color="cyan" pill />}
        />
        <CardBody>
          {offer ? <ExistingOffer order={order} offer={offer} /> : <NewOffer order={order} />}
          {order.atomicSwapAcceptable && showAtomicSwapComponent ? (
            <AtomicSwapComponent order={order} offer={offer} />
          ) : null}
        </CardBody>
      </Card>
    </Col>
  );
};

export default OfferDetailPage;
