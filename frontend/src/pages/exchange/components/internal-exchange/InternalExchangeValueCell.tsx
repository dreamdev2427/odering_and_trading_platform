import React from 'react';
import { Cell } from 'react-table';

import { InvestorShares } from 'services/apollo/shares';

import { BadgeIcon } from 'atoms';

const InternalExchangeValueCell: React.FC<Cell<InvestorShares>> = ({ row: { original } }) => {
  if (original.shareType.nominalValue > 0) {
    return (
      <>
        <BadgeIcon color="cyan" pill>
          N
        </BadgeIcon>
        {original.shareType.currency.symbol} {original.shareType.nominalValue}
      </>
    );
  }
  return (
    <>
      <BadgeIcon color="pink" pill>
        P
      </BadgeIcon>
      {original.shareType.currency.symbol} {original.shareType.premiumValue}
    </>
  );
};

export default InternalExchangeValueCell;
