import React from 'react';
import { Cell } from 'react-table';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { InvestorExchangeOrder } from 'services/apollo/exchange';
import { AtomicSwapStatus, useDeleteOrderMutation } from 'services/apollo';

import { Label, Button, BsSwal } from 'atoms';

const MyBuyOrderActionCell: React.FC<Cell<InvestorExchangeOrder>> = ({ row: { original } }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [deleteOrder] = useDeleteOrderMutation();

  const handleDetails = (): void => {
    history.push(`/investor/order-detail/${original.ID}`);
  };

  const handleDelete = (): Promise<void> => {
    return deleteOrder({ variables: { orderID: original.ID } })
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

  if (original.atomicSwapCurrentStatus === AtomicSwapStatus.Processed) {
    return (
      <>
        <Label>{t('tradingComponentsMyBuyOrdersSwapCompleteMessage')}</Label>
        <Button size="sm" onClick={handleDelete}>
          {t('tradingComponentsMyBuyOrdersDeleteOfferButton')}
        </Button>
      </>
    );
  }

  return (
    <>
      <Button size="sm" onClick={handleDetails}>
        {t('tradingComponentsMyBuyOrdersViewOfferButton')}
      </Button>
      <Button size="sm" onClick={handleDelete}>
        {t('tradingComponentsMyBuyOrdersDeleteOfferButton')}
      </Button>
    </>
  );
};

export default MyBuyOrderActionCell;
