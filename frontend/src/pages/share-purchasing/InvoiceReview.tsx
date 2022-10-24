import React from 'react';
import { useLocalDate } from 'hooks';
import { Card, CardBody, Col, Row, Loading } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useModal } from 'components/Modal';
import {
  useInvestorInvoiceAlertQuery,
  useMeQuery,
  useInvestorWalletQuery,
  useInvestorAppDataQuery,
} from 'services/apollo';
import { InvestorInvoiceAlert, InvestorWalletChannel } from 'services/apollo/multisto';
import ChannelItem from '../wallet/components/ChannelItem';
import DepositWithdrawFormManagement from '../wallet/components/Forms/DepositWithdrawFormManagement';
import EntityDetails from './components/EntityDetails';

const InvoiceReview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const invoiceID: number = parseInt(id, 10);
  const toLocalDate = useLocalDate();
  const modal = useModal();
  const { t } = useTranslation();

  const { data: investorInfo, loading: load2 } = useMeQuery();
  const { data: invoiceData, loading: load1 } = useInvestorInvoiceAlertQuery({
    variables: { id: invoiceID },
    fetchPolicy: 'no-cache',
  });
  const { data: investorPaymentChannels, loading: load3 } = useInvestorWalletQuery({
    variables: { _id: Number(invoiceData?.investorInvoiceAlert?.stoID) },
    fetchPolicy: 'no-cache',
  });
  const { data: appData, loading: appDataLoading } = useInvestorAppDataQuery();

  if (
    load1 ||
    load2 ||
    load3 ||
    appDataLoading ||
    !invoiceData ||
    !investorInfo ||
    !investorPaymentChannels ||
    !appData
  ) {
    return <Loading />;
  }
  const { IsMarketSpace: isMarketspace } = appData.investorAppParameters;

  const invoice = invoiceData.investorInvoiceAlert;
  const channels = investorPaymentChannels.investorPaymentChannels.filter(
    (e) => invoice?.shareType.currencyID === e.currencyID && e.isActive,
  );
  const { investor } = investorInfo.investorUser || {};

  if (!invoice || !channels || !investor) {
    return <Loading />;
  }

  const handleShowModal = (channel: InvestorWalletChannel, isWithdraw: boolean) => {
    modal.showModal({
      noWrapper: true,
      className: 'w-50 mw-100 minw-400',
      bodyContent: ({ hideModal }: { hideModal: () => void }) => (
        <DepositWithdrawFormManagement
          channel={channel}
          stoID={channel.stoID}
          investorID={investor.ID}
          isWithdraw={isWithdraw}
          hideModal={hideModal}
          invoice={invoice as InvestorInvoiceAlert}
        />
      ),
    });
  };

  return (
    <div className="content">
      {!isMarketspace && (
        <Card>
          <CardHeader
            text={`${t('InvoiceReview-CardHeader-Title')} #${invoiceID}`}
            caption={t('InvoiceReview-CardHeader-Caption')}
          />
          <CardBody>
            <Row>
              <Col>
                <b>{t('InvoiceReview-PaymentTo')}</b>
              </Col>
              <Col>
                <b>{t('InvoiceReview-Date')}</b>
              </Col>
            </Row>
            <Row>
              <Col>
                <ColinCol>
                  {investor.firstName} {investor.lastName}
                </ColinCol>
                <ColinCol>{investor.address}</ColinCol>
                <ColinCol>{investor.phone}</ColinCol>
              </Col>
              <Col>{toLocalDate(invoice?.dateCreated)}</Col>
            </Row>
            <Row>
              <Col>{invoice.buyAlert?.entityID && <EntityDetails entityID={invoice.buyAlert.entityID} />}</Col>
            </Row>
            <hr />
            <Row>
              <Col>{t('InvoiceReview-Shares')}</Col>
              <Col>{t('InvoiceReview-PricePerShare')}</Col>
              <Col>{t('InvoiceReview-Quantity')}</Col>
              <Col>{t('InvoiceReview-Total')}</Col>
            </Row>
            <hr />
            <Row>
              <Col>{invoice?.shareType.title}</Col>
              <Col>
                {invoice?.shareType.currency.symbol} {invoice?.shareType.premiumValue}
              </Col>
              <Col>{invoice?.shares}</Col>
              <Col>
                {invoice?.shareType.currency.symbol} {invoice?.amountToPay}
              </Col>
            </Row>
            <br />
          </CardBody>
        </Card>
      )}
      <Card>
        <CardHeader text="Payment Details" />
        <Row className="mx-auto">
          <Col>
            <label>{t('WalletManagement-DepositFundsInAccountLabel')}</label>
            {channels.length > 0 ? (
              channels.map((chn) => (
                <ChannelItem
                  key={chn.ID}
                  channel={chn}
                  deposit={() => handleShowModal(chn, false)}
                  withdraw={() => handleShowModal(chn, true)}
                  isMarketspace={isMarketspace}
                />
              ))
            ) : (
              <b>{t('WalletManagement-NoPaymentChannelFound')}</b>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default InvoiceReview;

export {};

const ColinCol = styled(Col)`
  padding: 0;
  margin: 0;
  border-radius: 0;
`;
