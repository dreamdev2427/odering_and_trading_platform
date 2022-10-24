import React from 'react';
import { useTranslation } from 'react-i18next';

import { InvestorBuyPropertyBalance } from 'services/apollo/multisto';

interface BalanceItemProps {
  account: InvestorBuyPropertyBalance;
}

const AccountItem: React.FC<BalanceItemProps> = ({ account }) => {
  const { i18n } = useTranslation();
  return (
    <p>
      <b className="mr-4" style={{ fontSize: '16px' }}>
        {account.currency.abbreviation}
      </b>
      {account.currency.symbol}{' '}
      {(account.amount ?? 0).toLocaleString(i18n.language, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </p>
  );
};

export default AccountItem;
