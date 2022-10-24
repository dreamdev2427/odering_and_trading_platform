import React from 'react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { SenderType, MessageType } from 'services/apollo';
import { ChatItem } from 'services/apollo/chat';
import { Chip } from 'atoms';

interface MessagesProps {
  data: ChatItem[];
  investorName: string;
}

const Messages: React.FC<MessagesProps> = ({ data, investorName }) => {
  const { t } = useTranslation();

  if (!data) {
    return null;
  }

  const dateTimeFormat = 'yyyy-MM-dd HH:mm:ss';

  return (
    <ChatPanel className="mb-3 overflow-auto d-flex flex-column-reverse">
      <div>
        {data.map(({ ID, dateSent, message, sender, type }) => {
          return (
            <div key={ID} className={sender === SenderType.Investor ? 'text-right m-3' : 'text-left m-3'}>
              <p className="mb-2">
                <strong>{sender === SenderType.Investor ? investorName : t('Admin')}</strong>
                {'  '}
                <small className="text-primary">
                  {t('At')} {format(dateSent, dateTimeFormat)}
                </small>
              </p>
              {type === MessageType.Message ? (
                <Chip color={sender === SenderType.Investor ? '#e4f5ef' : '#dedbb4'}>{message}</Chip>
              ) : (
                <Chip color={sender === SenderType.Investor ? '#e4f5ef' : '#dedbb4'}>
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

export default Messages;
