import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from 'atoms';

const InternalExchangeActionCell: React.FC<{ value: number }> = ({ value }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const onSellClick = (): void => {
    history.push(`/investor/sell-order/${value}`);
  };

  return (
    <div>
      <Button size="sm" onClick={onSellClick}>
        {t('tradingComponentsInternalExchangeTableBodySellButton')}
      </Button>
    </div>
  );
};

export default InternalExchangeActionCell;
