import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetExchangeOfferDetailQuery, useGetAcceptedExchangeOfferQuery } from 'services/apollo';

import { Card, CardBody, Row, Loading, Col } from 'atoms';
import { useTranslation } from 'react-i18next';
import AtomicSwapComponent from './components/offer-details/AtomicSwapComponent';

const AtomicSwap: React.FC = () => {
  const params = useParams<{ orderID: string }>();
  const orderID = parseInt(params.orderID, 10);
  const { t } = useTranslation();

  const { loading: load1, data } = useGetExchangeOfferDetailQuery({ variables: { orderID } });
  const { loading: load2, data: offerData } = useGetAcceptedExchangeOfferQuery({ variables: { orderID } });

  if (load1 || load2 || !data || !offerData) {
    return <Loading />;
  }

  const { getExchangeOrder: order } = data;
  const { getAcceptedExchangeOffer: offer } = offerData;

  return (
    <div className="content">
      <Card>
        <CardBody>
          <h5>{t('tradingComponentsAtomicSwapLabel')}</h5>
          <Row>
            <Col md={3}>{t('tradingComponentsAtomicSwapNumberOfSharesLabel')}</Col>
            <Col md={2}>{order.shares}</Col>
          </Row>
          <Row>
            <Col md={3}>{t('tradingComponentsAtomicSwapPricePayedLabel')}</Col>
            <Col md={2}>
              {order.shareType.currency.symbol}
              {offer ? offer.rateFrom : null}
            </Col>
          </Row>
          <hr />
          <AtomicSwapComponent order={order} offer={offer} />
        </CardBody>
      </Card>
    </div>
  );
};

export default AtomicSwap;
