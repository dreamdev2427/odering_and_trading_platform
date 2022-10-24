import React from 'react';
import { Cell } from 'react-table';
import { useTranslation } from 'react-i18next';

import { InvestorExchangeOrder } from 'services/apollo/exchange';

const MyBuyOrderTypeCell: React.FC<Cell<InvestorExchangeOrder>> = ({ row: { original } }) => {
  const { t } = useTranslation();

  if (original.atomicSwapAcceptable) {
    return (
      <>
        {original.rateFrom} {t('tradingComponentsMyBuyOrdersToken', { count: original.rateFrom })}
      </>
    );
  }

  return (
    <>
      {original.shareType.currency.symbol} {original.rateFrom}
    </>
  );
};

export default MyBuyOrderTypeCell;
