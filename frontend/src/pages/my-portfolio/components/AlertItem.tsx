import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import {
  ActiveProperty,
  BuyAlertStatus,
  InvestorAppDataQuery,
  InvestorBuyAlert,
  InvestorBuyAlertsDocument,
  InvoiceStatusType,
  useInvestorBuyAlertHideMutation,
  useInvestorBuyAlertRemoveMutation,
  useInvestorInvoiceAlertsQuery,
} from 'services/apollo/graphql';
import { useLocalDate } from 'hooks';
import MoonpayButton from 'pages/moonpay/components/MoonpayButton';

import { BsSwal, Button, CenteredCol, Loading, Row } from 'atoms';
import { getRedirectUrl } from '../../../layouts/Root';
import { accreditationProcess } from '../../../lib/routing/route-sets/verify-routes';

interface AlertItemProps {
  alert: InvestorBuyAlert;
  properties: ActiveProperty[];
  appData?: InvestorAppDataQuery;
  isMergingEnabled: boolean;
  isInvoicingEnabled: boolean;
}

const isDeletable = (status?: BuyAlertStatus): boolean => {
  if (!status) return true; // Old behaviour
  return [
    BuyAlertStatus.Unused,
    BuyAlertStatus.Pending,
    BuyAlertStatus.PaymentAwaiting,
    BuyAlertStatus.KycRequired,
    BuyAlertStatus.AccreditationRequired,
    BuyAlertStatus.PendingDocuments,
  ].includes(status);
};
const isHideable = (status?: BuyAlertStatus): boolean => {
  if (!status) return true; // Will be deletable in this case
  return [BuyAlertStatus.Accepted, BuyAlertStatus.Declined, BuyAlertStatus.PaymentFailure].includes(status);
};
const getStatusColor = (status?: BuyAlertStatus): string => {
  switch (status) {
    default:
    case BuyAlertStatus.PendingDocuments:
      return 'orange';
    case BuyAlertStatus.Pending:
      return 'orange';
    case BuyAlertStatus.PaymentOngoing:
    case BuyAlertStatus.Accepted:
      return 'green';
    case BuyAlertStatus.Declined:
    case BuyAlertStatus.PaymentFailure:
      return 'red';
  }
};

const AlertItem: React.FC<AlertItemProps> = ({ alert, properties, appData, isMergingEnabled, isInvoicingEnabled }) => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const toLocalDate = useLocalDate();
  const [loading, setLoading] = useState(false);
  const [removeBuyAlert] = useInvestorBuyAlertRemoveMutation({
    refetchQueries: [{ query: InvestorBuyAlertsDocument }],
  });
  const [hideBuyAlert] = useInvestorBuyAlertHideMutation();
  const { data: Invoices, loading: InvoiceLoading } = useInvestorInvoiceAlertsQuery({ fetchPolicy: 'no-cache' });

  const property = properties.find((p) => p.ID === alert.stoID);
  const navigateToSharePurchaseSigning = () => history.push(`/investor/share-purchase-signing/${alert.ID}`);
  const { isSellRequest } = alert;
  const handleDeleteSend = async () => {
    setLoading(true);
    const alertID: number = alert.ID;
    BsSwal.fire({
      title: t('AlertItem-DeletePurchaseAlert'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('Delete'),
      cancelButtonText: t('Cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        removeBuyAlert({ variables: { alertID } })
          .then(() => {
            history.go(0);
          })
          .catch(() => {
            history.go(0);
          });
      }
    });
    setLoading(false);
  };
  const handleHideSend = async () => {
    setLoading(true);
    hideBuyAlert({ variables: { alertID: alert.ID } })
      .then(() => {
        history.go(0);
      })
      .catch(() => {
        history.go(0);
      });
    setLoading(false);
  };
  const handleKycRequired = () => {
    history.push(getRedirectUrl(appData?.investorAppParameters.KycProvider));
  };
  const handleAccreditationRequired = () => {
    history.push(accreditationProcess.path);
  };

  if (loading || InvoiceLoading) {
    return <Loading />;
  }
  const invoice = Invoices?.investorInvoiceAlerts.find((invoiceData) => invoiceData.buyAlert.ID === alert.ID);
  const navigateToInvoice = () => {
    history.push(`/investor/invoice/${invoice?.ID}`);
  };

  const checkStatusofPayments = () => {
    if (isMergingEnabled) {
      if (alert.isBuySharesSigned) {
        return null;
      }
      return (
        <Button size="sm" onClick={navigateToSharePurchaseSigning}>
          {t('AlertItem-sign')}
        </Button>
      );
    }
    if (alert.isBuySharesSigned) {
      return (
        <span className="mr-2" style={{ color: getStatusColor(alert.status) }}>
          {t(`AlertItem-status-${alert.status}`)}
        </span>
      );
    }
    return (
      <Button size="sm" onClick={navigateToSharePurchaseSigning}>
        {t('AlertItem-sign')}
      </Button>
    );
  };
  return (
    <>
      <Row className="mb-2">
        <CenteredCol md={1}>
          <Label isSellRequest={isSellRequest}>{isSellRequest ? t('SELL') : t('BUY')}</Label>
        </CenteredCol>
        <CenteredCol md={2}>{toLocalDate(alert.date)}</CenteredCol>
        <CenteredCol md={2}>{property?.title}</CenteredCol>
        <CenteredCol md={isMergingEnabled ? 1 : 2}>{alert.shareType?.title}</CenteredCol>
        {isMergingEnabled ? (
          <>
            {invoice ? (
              <>
                <CenteredCol md={1}>
                  {invoice?.shareType.currency.symbol} {invoice?.amountToPay}
                </CenteredCol>
                <CenteredCol md={1}>{(alert.shares ?? 0).toLocaleString(i18n.language)}</CenteredCol>
                {invoice?.status === InvoiceStatusType.Unpaid ? (
                  <CenteredCol md={1}>
                    <span style={{ color: '#bfb51f' }}>{t('Portfolio-Transaction-Status-Type-Pending')}</span>
                  </CenteredCol>
                ) : (
                  <CenteredCol md={1}>
                    {' '}
                    <p className="mr-2" style={{ color: getStatusColor(alert.status) }}>
                      {t(`AlertItem-status-${alert.status}`)}
                    </p>
                  </CenteredCol>
                )}
              </>
            ) : (
              <>
                <CenteredCol md={1}>
                  {alert.shareType.currency.symbol} {alert.purchasePriceOffered}
                </CenteredCol>
                <CenteredCol md={1}>{(alert.shares ?? 0).toLocaleString(i18n.language)}</CenteredCol>
                <CenteredCol md={1}>
                  <p className="mr-2" style={{ color: getStatusColor(alert.status) }}>
                    {t(`AlertItem-status-${alert.status}`)}
                  </p>
                </CenteredCol>
              </>
            )}
          </>
        ) : (
          <CenteredCol md={1}>{(alert.shares ?? 0).toLocaleString(i18n.language)}</CenteredCol>
        )}

        <CenteredCol md={3}>
          {/* alert.isBuySharesSigned (
            <span className="mr-2" style={{ color: getStatusColor(alert.status) }}>
              {t(`AlertItem-status-${alert.status}`)}
            </span>
          ) : (
            <Button size="sm" onClick={navigateToSharePurchaseSigning}>
              {t('AlertItem-sign')}
            </Button>
          )} */}
          {checkStatusofPayments()}
          {isDeletable(alert.status) ? (
            <Button size="sm" onClick={handleDeleteSend}>
              {t('Delete')}
            </Button>
          ) : (
            isHideable(alert.status) && (
              <Button size="sm" onClick={handleHideSend}>
                {t('AlertItem-hide')}
              </Button>
            )
          )}
          {alert.status === BuyAlertStatus.KycRequired && (
            <Button size="sm" onClick={handleKycRequired}>
              {t('AlertItem-Button-KycRequired')}
            </Button>
          )}
          {alert.status === BuyAlertStatus.AccreditationRequired && (
            <Button size="sm" onClick={handleAccreditationRequired}>
              {t('AlertItem-Button-AccreditationRequired')}
            </Button>
          )}
          {isMergingEnabled && isInvoicingEnabled && invoice && (
            <Button size="sm" onClick={navigateToInvoice}>
              {t('AlertItem-Specified-Review')}
            </Button>
          )}
          {appData?.investorAppParameters?.IsMoonpayEnabled && <MoonpayButton alert={alert} />}
        </CenteredCol>
      </Row>
    </>
  );
};

export default AlertItem;

const Label = styled.label<{ isSellRequest?: boolean }>`
  color: ${(props) => (props.isSellRequest ? 'green' : 'blue')};
`;
