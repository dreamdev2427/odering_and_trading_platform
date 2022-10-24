import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Spinner } from 'reactstrap';

import {
  useGetChatsQuery,
  GetChatsDocument,
  SenderType,
  ReceiverType,
  MessageType,
  ChatBetween,
  useMeQuery,
  useMessageCreateMutation,
  useGetStoInfoQuery,
  useUpdateChatsToSeenMutation,
  GetUnreadMessagesCountDocument,
  useUploadMutation,
} from 'services/apollo';
import { useActiveSto } from 'hooks';

import { Button, Card, CardBody, BrandIcon, Col, Input, Row, Loading } from 'atoms';
import { BsSwal } from 'atoms/Swal';
import { CardHeader } from 'components/card-header/CardHeader';
import Messages from './components/Messages';

const Chat: React.FC = () => {
  const { t } = useTranslation();

  const [messageText, setMessageText] = useState('');

  const inputEl = useRef<HTMLInputElement>(null);
  const onAttachmentClick = () => inputEl.current?.click();

  const [attachFile, { loading: uploading }] = useUploadMutation();

  const { sto } = useActiveSto();
  const { data: stoData } = useGetStoInfoQuery({
    variables: { stoID: sto },
    fetchPolicy: 'network-only',
  });

  const [updateChatsToSeen] = useUpdateChatsToSeenMutation({
    refetchQueries: [{ query: GetUnreadMessagesCountDocument, variables: { sender: SenderType.Admin, stoID: sto } }],
  });

  useEffect(() => {
    updateChatsToSeen({ variables: { sender: SenderType.Admin, stoID: sto } });
  }, [sto, updateChatsToSeen]);

  const { data: meData } = useMeQuery({ fetchPolicy: 'network-only' });
  const { investor } = meData?.investorUser || {};

  const { data, loading } = useGetChatsQuery({
    variables: { chatBetween: ChatBetween.InvestorAdmin, stoID: sto },
    fetchPolicy: 'network-only',
  });

  const [createMessage] = useMessageCreateMutation({
    refetchQueries: [{ query: GetChatsDocument, variables: { chatBetween: ChatBetween.InvestorAdmin, stoID: sto } }],
  });

  if (loading || !data) {
    return <Loading />;
  }

  const { getChats: chatData } = data;

  const sendMessage = () => {
    const newData = {
      sender: SenderType.Investor,
      receiver: ReceiverType.Admin,
      investorID: Number(investor?.ID),
      adminID: 0,
      stoID: sto,
      message: messageText,
    };
    if (messageText.length > 0) {
      createMessage({ variables: { data: newData } }).then(() => setMessageText(''));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const startUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (uploading || !files || !files.length) {
      return;
    }
    const file = files.item(0);
    if ((file?.size || 0) / 1024 / 1024 > 10) {
      BsSwal.fire({
        title: t('Maximum-Upload-File-Size'),
        icon: 'error',
      });
      return;
    }
    return attachFile({ variables: { file } })
      .then(({ data: fileData }) => {
        if (fileData) {
          const fileInfo = {
            link: fileData.fileUpload.link,
            name: fileData.fileUpload.name,
            type: file?.type,
            originalName: file?.name,
          };
          const newData = {
            sender: SenderType.Investor,
            receiver: ReceiverType.Admin,
            investorID: Number(investor?.ID),
            adminID: 0,
            stoID: sto,
            type: MessageType.File,
            message: JSON.stringify(fileInfo),
          };
          if (fileData.fileUpload) {
            createMessage({ variables: { data: newData } });
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Col className="content">
      <Card>
        <CardHeader
          text={t('Chat-Header-With-Project-Name') + stoData?.findSto?.title}
          icon={<BrandIcon icon="comment" color="cyan" pill />}
        />
        <CardBody>
          <Messages data={chatData} investorName={`${investor?.firstName} ${investor?.lastName}`} />
          <Row className="d-flex align-items-center">
            <Col xs="auto" md={9}>
              <Input
                autoComplete="off"
                required
                maxLength="2000"
                name="message"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageText(e.currentTarget.value || '')}
                onKeyDown={handleKeyDown}
                value={messageText}
                placeholder={t('Enter-Message-Here')}
              />
            </Col>
            <Col xs="auto" md={1}>
              <>
                <Wrap onClick={onAttachmentClick}>
                  {uploading ? <Spinner size="sm" color="dark" /> : <i className="ti-plus" />}
                </Wrap>
                <input className="d-none" ref={inputEl} type="file" onChange={startUpload} />
              </>
            </Col>
            <Col xs="auto" md={2}>
              <Button size="lg" block onClick={sendMessage}>
                {t('Chat-Send')}
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

const Wrap = styled.div`
  font-size: 20px;
  text-align: center;
  padding: 8px;
  border-radius: 10px / 30px;
  background: #bada55;
`;

export default Chat;
