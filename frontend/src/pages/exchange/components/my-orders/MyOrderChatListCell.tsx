import React from 'react';
import { Cell } from 'react-table';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { useGetPriceNegotiationUnreadMessagesCountQuery, ChatContext } from 'services/apollo';
import { InvestorExchangeOrder } from 'services/apollo/exchange';

import { Button } from 'atoms';
import { NotificationBadge } from 'components/MessagesBadge';

const MyOrderChatListCell: React.FC<Cell<InvestorExchangeOrder>> = ({ row: { original } }) => {
  const history = useHistory();

  const { data } = useGetPriceNegotiationUnreadMessagesCountQuery({
    variables: {
      context: ChatContext.ExchangeOrder,
      contextID: original.ID,
    },
    fetchPolicy: 'network-only',
  });

  const openChatList = (): void => {
    history.push(`/investor/price-negotiation-list/${original.ID}`);
  };

  return (
    <ChatListButton size="sm" onClick={openChatList}>
      <div className="d-flex align-items-center">
        <i className="ti-email" />
        {data?.getPriceNegotiationUnreadMessagesCount !== 0 ? (
          <NotificationBadge pill>{data?.getPriceNegotiationUnreadMessagesCount}</NotificationBadge>
        ) : null}
      </div>
    </ChatListButton>
  );
};

const ChatListButton = styled(Button)`
  color: black;
  font-size: 18px;
  background: #bada55;
`;

export default MyOrderChatListCell;
