import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
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
  ChatContext,
  useMeQuery,
  useMessageCreateMutation,
  useUpdatePriceNegotiationChatsToSeenMutation,
  GetPriceNegotiationUnreadMessagesCountDocument,
  useUploadMutation,
  useGetExchangeOrderDetailQuery,
  Chat,
} from 'services/apollo';

import { Button, Card, CardBody, BrandIcon, Col, Input, Row, Loading } from 'atoms';
import { BsSwal } from 'atoms/Swal';
import { CardHeader } from 'components/card-header/CardHeader';
import PriceNegotiationMessages from './components/PriceNegotiationMessages';

const PriceNegotiation: React.FC = () => {
  const params = useParams<{ orderID: string; counterpartID: string }>();
  const orderID = parseInt(params.orderID, 10);
  const counterpartID = parseInt(params.counterpartID, 10);

  const { t } = useTranslation();

  const [messageText, setMessageText] = useState('');

  const messagesInitialValue: Chat[] = [];
  const [messages, setMessages] = useState(messagesInitialValue);

  const inputEl = useRef<HTMLInputElement>(null);
  const onAttachmentClick = () => inputEl.current?.click();

  const [attachFile, { loading: uploading }] = useUploadMutation();

  const { data: meData } = useMeQuery({ fetchPolicy: 'network-only' });
  const { investor } = meData?.investorUser || {};

  const { data: orderData, loading: orderLoading } = useGetExchangeOrderDetailQuery({
    variables: { orderID },
    fetchPolicy: 'network-only',
  });
  const { getExchangeOrder: order } = orderData || {};
  const orderOwnerID = Number(order?.investorID);

  const [updatePriceNegotiationChatsToSeen] = useUpdatePriceNegotiationChatsToSeenMutation({
    refetchQueries: [
      {
        query: GetPriceNegotiationUnreadMessagesCountDocument,
        variables: {
          context: ChatContext.ExchangeOrder,
          contextID: orderID,
          counterpartID,
        },
      },
    ],
  });

  const { data, loading } = useGetChatsQuery({
    variables: {
      chatBetween: ChatBetween.InvestorInvestor,
      context: ChatContext.ExchangeOrder,
      contextID: orderID,
      counterpartID,
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    updatePriceNegotiationChatsToSeen({
      variables: {
        context: ChatContext.ExchangeOrder,
        contextID: orderID,
        counterpartID,
      },
    });
    if (data && data.getChats.length) {
      setMessages(data.getChats);
    }
  }, [updatePriceNegotiationChatsToSeen, orderID, counterpartID, data]);

  const [createMessage] = useMessageCreateMutation({
    refetchQueries: [
      {
        query: GetChatsDocument,
        variables: {
          chatBetween: ChatBetween.InvestorInvestor,
          context: ChatContext.ExchangeOrder,
          contextID: orderID,
          counterpartID,
        },
      },
    ],
  });
  if (loading || !data || orderLoading || !orderData) {
    return <Loading />;
  }

  const sendMessage = () => {
    const newData = {
      sender: SenderType.Investor,
      receiver: ReceiverType.Investor,
      investorID: Number(investor?.ID),
      adminID: 0,
      stoID: Number(order?.stoID),
      message: messageText,
      context: ChatContext.ExchangeOrder,
      contextID: orderID,
      contextReceiverID: Number(investor?.ID) === orderOwnerID ? counterpartID : orderOwnerID,
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
            receiver: ReceiverType.Investor,
            investorID: Number(investor?.ID),
            adminID: 0,
            stoID: Number(order?.stoID),
            type: MessageType.File,
            message: JSON.stringify(fileInfo),
            context: ChatContext.ExchangeOrder,
            contextID: orderID,
            contextReceiverID: Number(investor?.ID) === orderOwnerID ? counterpartID : orderOwnerID,
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
        <CardHeader text={t('Price-Negotiation-Header')} icon={<BrandIcon icon="comment" color="cyan" pill />} />
        <CardBody>
          <PriceNegotiationMessages data={messages} setMessages={setMessages} currentUserID={Number(investor?.ID)} />
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

export default PriceNegotiation;
