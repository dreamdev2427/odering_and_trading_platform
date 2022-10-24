import React from 'react';
import { Cell } from 'react-table';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { AtomicSwapStatus, useDeleteOrderMutation, useUpdateOrderStatusMutation } from 'services/apollo';
import { InvestorExchangeOrder } from 'services/apollo/exchange';

import { Button, BsSwal, Label } from 'atoms';

const MySellOrderActionCell: React.FC<Cell<InvestorExchangeOrder>> = ({ row: { original } }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const { ID, atomicSwapAcceptable: swap, atomicSwapCurrentStatus: status, dateTo: expirationDate } = original;

  const currentDate = new Date().toISOString().slice(0, 10);

  const swapInProgress = [
    AtomicSwapStatus.NotInitialized,
    AtomicSwapStatus.Accepted,
    AtomicSwapStatus.SellerCommitted,
    AtomicSwapStatus.SellerSent,
    AtomicSwapStatus.BuyerCommitted,
  ].includes(status);

  const handleDetails = (): void => {
    history.push(`/investor/order-detail/${ID}`);
  };

  const handleInProgressSwap = (): void => {
    history.push(`/investor/atomic-swap/${ID}`);
  };

  const handleDelete = (): Promise<void> => {
    return deleteOrder({ variables: { orderID: ID } })
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

  const handleMarkAsProcessed = (): Promise<void> => {
    return updateOrderStatus({ variables: { orderId: ID, atomicSwapCurrentStatus: AtomicSwapStatus.Processed } })
      .then(() => {
        BsSwal.fire({
          title: t('tradingComponentsMySellOrdersMarkSellAsSuccessfulTitle'),
          icon: 'success',
        });
        history.go(0);
      })
      .catch((err) => {
        BsSwal.fire({
          icon: 'error',
          title: err.message,
        });
      });
  };

  const handleMarkAsUnsuccessful = (): Promise<void> => {
    /* Some Post Actions Need to be Implemented When This Scenario Happens */
    return updateOrderStatus({ variables: { orderId: ID, atomicSwapCurrentStatus: AtomicSwapStatus.Unsuccessful } })
      .then(() => {
        BsSwal.fire({
          title: t('tradingComponentsMySellOrdersMarkSellAsExpiredTitle'),
          icon: 'success',
        });
        history.go(0);
      })
      .catch((err) => {
        BsSwal.fire({
          icon: 'error',
          title: err.message,
        });
      });
  };

  const renderSwap = (): React.ReactElement => {
    if (!swap) {
      return <></>;
    }

    if (status === AtomicSwapStatus.NotInitialized) {
      return (
        <Button size="sm" onClick={handleDetails}>
          {t('tradingComponentsMySellOrdersViewSellDetails')}
        </Button>
      );
    }

    if (currentDate > expirationDate && swapInProgress) {
      return (
        <Button size="sm" onClick={handleMarkAsUnsuccessful}>
          {t('tradingComponentsMySellOrdersMarkSellAsExpired')}
        </Button>
      );
    }

    if (status === AtomicSwapStatus.BuyerCompleted) {
      return (
        <Button size="sm" onClick={handleMarkAsProcessed}>
          {t('tradingComponentsMySellOrdersMarkSellAsSuccessful')}
        </Button>
      );
    }

    return (
      <Button size="sm" onClick={handleInProgressSwap}>
        {status === AtomicSwapStatus.Processed || status === AtomicSwapStatus.Unsuccessful
          ? t('tradingComponentsMySellOrdersViewSwapButton')
          : t('tradingComponentsMySellOrdersViewSwapInProgressButton')}
      </Button>
    );
  };

  const renderNotSwap = (): React.ReactElement => {
    if (swap) {
      return <></>;
    }

    if (status === AtomicSwapStatus.Processed) {
      return (
        <>
          <Label>{t('tradingComponentsMyBuyOrdersSwapCompleteMessage')}</Label>
          <Button size="sm" onClick={handleDelete}>
            {t('tradingComponentsMySellOrdersDeleteOfferButton')}
          </Button>
        </>
      );
    }

    return (
      <Button size="sm" onClick={handleDetails}>
        {t('tradingComponentsMySellOrdersViewSellDetails')}
      </Button>
    );
  };

  return (
    <>
      {renderSwap()}
      {renderNotSwap()}
      {status === AtomicSwapStatus.NotInitialized ? (
        <Button size="sm" onClick={handleDelete}>
          {t('tradingComponentsMySellOrdersDeleteOfferButton')}
        </Button>
      ) : null}
    </>
  );
};

export default MySellOrderActionCell;
