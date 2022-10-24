import React from 'react';
import { useTranslation } from 'react-i18next';

import { ExchangeOfferDetailOrder } from 'services/apollo/exchange';

import { CardHeader } from 'components/card-header/CardHeader';
import { Card, CardBody, Label, BrandIcon } from 'atoms';

const OrderDetail: React.FC<{ order: ExchangeOfferDetailOrder }> = ({ order }) => {
  const { t } = useTranslation();

  const type = t(`tradingComponentsOfferDetailsBuyOrSellLabelComponent_${order.type}`);

  return (
    <Card>
      <CardHeader
        text={`${type} ${t('tradingComponentsOfferDetailsTradeCardHeader')}`}
        icon={<BrandIcon icon="info" color="cyan" pill />}
        caption={t('tradingComponentsOfferDetailsTradeCardCaption')}
      />
      <CardBody>
        <Label>{t('tradingComponentsOrderDetailsShareTypeLabel')}</Label>
        {order.shareType.title}
        <Label className="mr-1">{t('tradingComponentsOrderDetailsDatesLabel')}</Label>
        {order.dateFrom} - {order.dateTo}
        {order.atomicSwapAcceptable ? (
          <>
            <Label>
              {t('tradingComponentsOfferDetailsTradeCardOfferedShareCount')} {type}
            </Label>
            {order.shares.toFixed(2)}
            <Label>{t('tradingComponentsOrderDetailsAskingAmountLabel')}</Label>
            {order.rateFrom.toFixed(2)}
            {t('tradingComponentsOrderDetailsUSDCLabel')}
          </>
        ) : (
          <>
            <b className="d-block">{t('tradingComponentsOrderDetailsAtomicSwapFalseLabel')}</b>
            <Label>
              {t('tradingComponentsOfferDetailsTradeCardOfferedShareCount')} {type}
            </Label>
            {order.shares.toFixed(2)}
            <Label>{t('tradingComponentsOrderDetailsAskingAmountLabel')}</Label>
            {order.shareType.currency.symbol} {order.rateFrom.toFixed(2)}
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default OrderDetail;
