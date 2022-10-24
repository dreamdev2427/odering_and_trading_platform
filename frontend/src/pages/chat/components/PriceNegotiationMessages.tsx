import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Chat, MessageType, useGetLastChatRecordSubscription } from 'services/apollo';
import { ChatItem } from 'services/apollo/chat';
import { Chip } from 'atoms';

interface PriceNegotiationMessagesProps {
  data: ChatItem[];
  currentUserID: number;
  setMessages: (messages: Chat[]) => void;
}

const PriceNegotiationMessages: React.FC<PriceNegotiationMessagesProps> = ({ data, currentUserID, setMessages }) => {
  const { t } = useTranslation();

  const { data: subscriptionData } = useGetLastChatRecordSubscription();
  const newChat: Chat | undefined = subscriptionData?.getLastChatRecord;

  useEffect(() => {
    if (newChat && newChat.ID !== data[data.length - 1].ID) {
      setMessages([...data, newChat]);
    }
  }, [data, newChat, setMessages]);

  if (!data) {
    return null;
  }

  const dateTimeFormat = 'yyyy-MM-dd HH:mm:ss';

  return (
    <ChatPanel className="mb-3 overflow-auto d-flex flex-column-reverse">
      <div>
        {data.map(({ ID, dateSent, message, type, investorID }) => {
          return (
            <div key={ID} className={investorID === currentUserID ? 'text-right m-3' : 'text-left m-3'}>
              <p className="mb-2">
                <strong>
                  {investorID === currentUserID ? t('Price-Negotiation-You-Label') : t('Price-Negotiation-Guest-Label')}
                </strong>
                {'  '}
                <small className="text-primary">
                  {t('At')} {format(dateSent, dateTimeFormat)}
                </small>
              </p>
              {type === MessageType.Message ? (
                <Chip color={investorID === currentUserID ? '#e4f5ef' : '#dedbb4'}>{message}</Chip>
              ) : (
                <Chip color={investorID === currentUserID ? '#e4f5ef' : '#dedbb4'}>
                  <i className="ti-import" />
                  <FileLink target="_blank" href={JSON.parse(message).link} download={JSON.parse(message).originalName}>
                    {JSON.parse(message).originalName}
                  </FileLink>
                </Chip>
              )}
            </div>
          );
        })}
      </div>
    </ChatPanel>
  );
};

const ChatPanel = styled.div`
  height: 380px;
  max-height: 380px;
`;

const FileLink = styled.a`
  text-decoration: none;
  color: #017698;
  margin-left: 15px;
`;

export default PriceNegotiationMessages;
