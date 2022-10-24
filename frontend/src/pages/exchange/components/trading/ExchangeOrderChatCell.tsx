import React from 'react';
import { Cell } from 'react-table';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { useMeQuery, useGetPriceNegotiationUnreadMessagesCountQuery, ChatContext } from 'services/apollo';
import { ExchangeOrderItem } from 'services/apollo/exchange';

import { Button } from 'atoms';
import { NotificationBadge } from 'components/MessagesBadge';

const ExchangeOrderChatCell: React.FC<Cell<ExchangeOrderItem>> = ({ row: { original } }) => {
  const history = useHistory();

  const { data: meData } = useMeQuery({ fetchPolicy: 'network-only' });
  const { investor } = meData?.investorUser || {};

  const { data } = useGetPriceNegotiationUnreadMessagesCountQuery({
    variables: {
      context: ChatContext.ExchangeOrder,
      contextID: original.ID,
      counterpartID: Number(investor?.ID),
    },
    fetchPolicy: 'network-only',
  });

  const startNegotiation = (): void => {
    history.push(`/investor/price-negotiation/${original.ID}/${investor?.ID}`);
  };

  return (
    <ChatButton size="sm" onClick={startNegotiation}>
      <div className="d-flex align-items-center">
        <i className="ti-comment-alt" />
        {data?.getPriceNegotiationUnreadMessagesCount !== 0 ? (
          <NotificationBadge pill>{data?.getPriceNegotiationUnreadMessagesCount}</NotificationBadge>
        ) : null}
      </div>
    </ChatButton>
  );
};

const ChatButton = styled(Button)`
  color: black;
  font-size: 18px;
  background: #bada55;
`;

export default ExchangeOrderChatCell;
