import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AtomicSwapStatus, useDeleteOfferMutation } from 'services/apollo';
import { InvestorExchangeOffer } from 'services/apollo/exchange';

import { BsSwal, Button, Label } from 'atoms';
import { Cell } from 'react-table';

const MyBuyOfferActionCell: React.FC<Cell<InvestorExchangeOffer>> = ({ row: { original } }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [deleteOffer] = useDeleteOfferMutation();

  const { ID, atomicSwapAcceptable: swap, atomicSwapCurrentStatus: status } = original.exchangeOrder;

  const handleDetails = (): void => {
    history.push(`/investor/offer-detail/${ID}`);
  };

  const handleDelete = (): Promise<void> => {
    return deleteOffer({ variables: { orderID: ID } })
      .then(() => {
        history.go(0);
      })
      .catch((err) => {
        BsSwal.fire({
          icon: 'error',
          title: err.message,
        });
      });
  };

  if (swap && status === AtomicSwapStatus.NotInitialized) {
    return (
      <Button size="sm" onClick={handleDelete}>
        {t('tradingComponentsMyBuyOffersDeleteOfferButton')}
      </Button>
    );
  }

  if (status === AtomicSwapStatus.Processed) {
    return (
      <>
        <Label>{t('tradingComponentsMyBuyOffersSwapCompleteMessage')}</Label>
        <Button size="sm" onClick={handleDelete}>
          {t('tradingComponentsMyBuyOffersDeleteOfferButton')}
        </Button>
      </>
    );
  }

  const swapInProgress = [
    AtomicSwapStatus.NotInitialized,
    AtomicSwapStatus.Accepted,
    AtomicSwapStatus.BuyerCompleted,
  ].includes(status);

  return (
    <>
      <Button size="sm" onClick={handleDetails}>
        {swapInProgress
          ? t('tradingComponentsMyBuyOffersViewSwapButton')
          : t('tradingComponentsMyBuyOffersViewSwapInProgressButton')}
      </Button>
      <Button size="sm" onClick={handleDelete}>
        {t('tradingComponentsMyBuyOffersDeleteOfferButton')}
      </Button>
    </>
  );
};

export default MyBuyOfferActionCell;
