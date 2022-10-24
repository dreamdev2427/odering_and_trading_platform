import React from 'react';
import { Cell } from 'react-table';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { PriceNegotiationListItem, useGetPriceNegotiationUnreadMessagesCountQuery, ChatContext } from 'services/apollo';

import { Button } from 'atoms';
import { NotificationBadge } from 'components/MessagesBadge';

const PriceNegotiationListActionCell: React.FC<Cell<PriceNegotiationListItem>> = ({ row: { original } }) => {
  const history = useHistory();

  const { data } = useGetPriceNegotiationUnreadMessagesCountQuery({
    variables: {
      context: ChatContext.ExchangeOrder,
      contextID: original.orderID,
      counterpartID: original.counterpartID,
    },
    fetchPolicy: 'network-only',
  });

  const openChatBox = (): void => {
    history.push(`/investor/price-negotiation/${original.orderID}/${original.counterpartID}`);
  };

  return (
    <ChatListButton size="sm" onClick={openChatBox}>
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

export default PriceNegotiationListActionCell;
