import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  GetExchangeOrderDetailDocument,
  useAcceptInternalSwapMutation,
  useGetExchangeOrderDetailQuery,
  useStartSwapMutation,
} from 'services/apollo';

import { CardHeader } from 'components/card-header/CardHeader';
import { Card, CardBody, Row, Loading, Col, Label, Button, BsSwal, BrandIcon } from 'atoms';

const OrderDetailPage: React.FC = () => {
  const params = useParams<{ orderID: string }>();
  const orderID = parseInt(params.orderID, 10);
  const history = useHistory();
  const { t } = useTranslation();

  const refetchQueries = [{ query: GetExchangeOrderDetailDocument, variables: { orderID } }];

  const [startSwap] = useStartSwapMutation({ refetchQueries });
  const [acceptSwap] = useAcceptInternalSwapMutation({ refetchQueries });

  const { data, loading } = useGetExchangeOrderDetailQuery({ variables: { orderID } });

  if (loading || !data) {
    return <Loading />;
  }
  const { getExchangeOrder: order, getExchangeOrderOffers: offers } = data;

  const onStartSwap = (offerID: number): Promise<void> => {
    return startSwap({ variables: { offerID } })
      .then(() => {
        history.push(`/investor/atomic-swap/${order.ID}`);
      })
      .catch((err) => {
        BsSwal.fire({
          icon: 'error',
          text: err.message,
        });
      });
  };

  const onAcceptSwap = (offerID: number): Promise<void> => {
    return acceptSwap({ variables: { offerID } })
      .then(() => {
        history.push(`/investor/trading`);
      })
      .catch((err) => {
        BsSwal.fire({
          icon: 'error',
          text: err.message,
        });
      });
  };

  return (
    <div className="content">
      <Card>
        <CardHeader
          text={t('tradingComponentsOrderDetailsOrderCardHeader')}
          icon={<BrandIcon icon="info" color="cyan" pill />}
        />
        <CardBody>
          <Label>{t('tradingComponentsOrderDetailsShareTypeLabel')}</Label>
          {order.shareType.title}
          <Label className="mr-1">{t('tradingComponentsOrderDetailsDatesLabel')}</Label>
          {order.dateFrom} - {order.dateTo}
          {order.atomicSwapAcceptable ? (
            <>
              <Label>{t('tradingComponentsOrderDetailsSharesOfferedLabel')}</Label>
              {order.shares.toFixed(2)}
              <Label>{t('tradingComponentsOrderDetailsPriceLabel')}</Label>
              {order.rateFrom.toFixed(2)}
              {t('tradingComponentsOrderDetailsUSDCLabel')}
            </>
          ) : (
            <>
              <b className="d-block">{t('tradingComponentsOrderDetailsAtomicSwapFalseLabel')}</b>
              <Label>{t('tradingComponentsOrderDetailsSharesOfferedLabel')}</Label>
              {order.shares.toFixed(2)}
              <Label>{t('tradingComponentsOrderDetailsAskingAmountLabel')}</Label>
              {order.shareType.currency.symbol} {order.rateFrom.toFixed(2)}
            </>
          )}
        </CardBody>
      </Card>
      <Card>
        <CardHeader
          text={t('tradingComponentsOrderDetailsOffersCardHeader')}
          caption={t('tradingComponentsOrderDetailsOffersCountLabel', { offersCount: offers.length })}
          icon={<BrandIcon icon="info" color="cyan" pill />}
        />
        <CardBody>
          {offers.map((offer, index) => (
            <Row key={offer.ID}>
              <Col>
                <Row>
                  <Col>
                    <b>{t('tradingComponentsOrderDetailsOffersIndexLabel', { index: index + 1 })}</b>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label>{t('tradingComponentsOrderDetailsOffersSellShareCountLabel')}</Label>
                  </Col>
                  <Col>
                    <b>{offer.sharesPartial.toFixed(2)}</b>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label>{t('tradingComponentsOrderDetailsOffersSellShareOfferedPriceLabel')}</Label>
                  </Col>
                  <Col>
                    <b>
                      {order.shareType.currency.symbol} {offer.rateFrom.toFixed(2)}
                    </b>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {order.atomicSwapAcceptable ? (
                      <Button size="sm" onClick={() => onStartSwap(offer.ID)}>
                        {t('tradingComponentsOrderDetailsOffersSellShareAtomicSwapTrueButton')}
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => onAcceptSwap(offer.ID)}>
                        {t('tradingComponentsOrderDetailsOffersSellShareAtomicSwapFalseButton')}
                      </Button>
                    )}
                  </Col>
                </Row>
                <hr />
              </Col>
            </Row>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};

export default OrderDetailPage;
