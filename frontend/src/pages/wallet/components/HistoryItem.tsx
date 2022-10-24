import React from 'react';
import { useTranslation } from 'react-i18next';

import { InvestorWalletHistory } from 'services/apollo/multisto';
import { useLocalDate } from 'hooks';

import { TD, TR } from 'atoms';

interface HistoryItemProps {
  history: InvestorWalletHistory;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ history }) => {
  const { i18n } = useTranslation();
  const toLocalDate = useLocalDate();

  return (
    <TR>
      <TD min="200px">{toLocalDate(history.dateReceived)}</TD>
      <TD min="160px">
        {history.currency.symbol}{' '}
        {(history.amount ?? 0).toLocaleString(i18n.language, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </TD>
      <TD min="120px">
        {history.isApproved ? (
          <>
            {toLocalDate(history.dateApproved)} <br />
            {history.isApproved === 1 && (
              <span style={{ color: 'green' }}>
                <b>Approved</b> Added in Investor Balance
              </span>
            )}
            {history.isApproved === 2 && (
              <span style={{ color: 'red' }}>
                <b>Declined</b>
              </span>
            )}
            {history.isApproved === 3 && (
              <span style={{ color: 'green' }}>
                <b>Increased by Admin</b>
              </span>
            )}
            {history.isApproved === 4 && (
              <span style={{ color: 'red' }}>
                <b>Reduced by Admin</b>
              </span>
            )}
            {history.isApproved === 5 && (
              <span style={{ color: 'green' }}>
                <b>Share Transfer</b>
              </span>
            )}
          </>
        ) : (
          <span style={{ color: 'black' }}>
            <b>Pending Approval</b>
          </span>
        )}
      </TD>
      <TD min="120px">{history.details}</TD>
    </TR>
  );
};

export default HistoryItem;
