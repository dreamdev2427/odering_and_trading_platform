import React from 'react';
import { Cell } from 'react-table';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ExchangeOrderItem } from 'services/apollo/exchange';

import { Button } from 'atoms';

const ExchangeOrderActionCell: React.FC<Cell<ExchangeOrderItem>> = ({ row: { original } }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const handleDetails = (): void => {
    history.push(`/investor/offer-detail/${original.ID}`);
  };

  return (
    <Button size="sm" onClick={handleDetails}>
      {t('tradingComponentsExchangeOrdersDetailsButton')}
    </Button>
  );
};

export default ExchangeOrderActionCell;
