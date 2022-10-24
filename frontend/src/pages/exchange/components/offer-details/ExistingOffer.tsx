import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AtomicSwapStatus, GetExchangeOfferDetailDocument, useDeleteOfferMutation } from 'services/apollo';
import { ExchangeOfferDetail, ExchangeOfferDetailOrder } from 'services/apollo/exchange';

import { BsSwal, Button, Label } from 'atoms';

interface ExistingOfferProps {
  order: ExchangeOfferDetailOrder;
  offer: ExchangeOfferDetail;
}

const ExistingOffer: React.FC<ExistingOfferProps> = ({ order, offer }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [deleteOffer] = useDeleteOfferMutation({
    refetchQueries: [{ query: GetExchangeOfferDetailDocument, variables: { orderID: order.ID } }]
  });

  const handleDelete = () => {
    return deleteOffer({ variables: { orderID: order.ID } })
      .then(({ data: res }) => {
        history.push('/investor/trading');
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
      <b className="d-block">{t('tradingComponentsOfferDetailsOffersCardOfferOfferRecFound')}</b>
      <Label>{t('tradingComponentsOfferDetailsOffersCardOfferSharesToBuy')}</Label>
      {offer.sharesPartial.toFixed(2)}
      {order.atomicSwapAcceptable ? (
        <>
          <Label>{t('tradingComponentsOfferDetailsOffersCardOfferedPriceLabel')}</Label>
          {offer.rateFrom.toFixed(2)}{t('tradingComponentsOrderDetailsUSDCLabel')}
        </>
      ) : (
        <>
          <Label>{t('tradingComponentsOfferDetailsOffersCardOfferedAmountLabel')}</Label>
          {order.shareType.currency.symbol} {offer.rateFrom.toFixed(2)}
        </>
      )}
      <br/>
      {order.atomicSwapCurrentStatus === AtomicSwapStatus.NotInitialized ? (
        <Button size="sm" onClick={handleDelete}>
          {t('tradingComponentsOfferDetailsOffersCardDeleteOfferButton')}
        </Button>
      ) : null}
    </div>
  );
};

export default ExistingOffer;
