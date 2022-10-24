import React from 'react';
import { Cell } from 'react-table';

import { ExchangeOrderItem } from 'services/apollo/exchange';
import { ExchangeType } from 'services/apollo';

import { WrapIcon } from 'atoms';

const ExchangeOrderTypeCell: React.FC<Cell<ExchangeOrderItem>> = ({ row: { original } }) => {
  if (original.type === ExchangeType.Sell) {
    return (
      <>
        <WrapIcon color="green" pill>
          S
        </WrapIcon>
        Sell
      </>
    );
  }

  if (original.type === ExchangeType.Buy) {
    return (
      <>
        <WrapIcon color="red" pill>
          B
        </WrapIcon>
        Buy
      </>
    );
  }

  return <></>;
};

export default ExchangeOrderTypeCell;
