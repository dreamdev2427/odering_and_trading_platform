import React from 'react';
import { Badge } from 'reactstrap';
import styled from 'styled-components';

import { useGetUnreadMessagesCountQuery, SenderType } from 'services/apollo';
import { useActiveSto } from 'hooks';

interface MessagesBadgeProps {
  sender: SenderType;
}

const MessagesBadge: React.FC<MessagesBadgeProps> = ({ sender }) => {
  const { sto } = useActiveSto();

  const queryVariables = { sender, stoID: 0 };
  if (sender === SenderType.Admin) {
    queryVariables.stoID = sto;
  }
  const { data } = useGetUnreadMessagesCountQuery({
    variables: queryVariables,
    fetchPolicy: 'network-only',
  });

  return data?.getUnreadMessagesCount !== 0 ? (
    <NotificationBadge pill>{data?.getUnreadMessagesCount}</NotificationBadge>
  ) : null;
};

export default MessagesBadge;

export const NotificationBadge = styled(Badge)`
  font-size: 12px;
  background: #ff0036;
  border: none;
  margin-left: 0.5rem;
`;
