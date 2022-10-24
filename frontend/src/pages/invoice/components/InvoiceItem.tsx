import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ActiveProperty, InvoiceStatusType, useInvestorInvoiceAlertDeleteMutation } from 'services/apollo/graphql';
import { InvestorInvoiceAlert } from 'services/apollo/multisto';
import { useLocalDate } from 'hooks';
import { Button, Row, CenteredCol } from 'atoms';

interface InvoiceItemProps {
  invoice: InvestorInvoiceAlert;
  properties: ActiveProperty[];
}

const InvoiceItem: React.FC<InvoiceItemProps> = ({ invoice, properties }) => {
  const history = useHistory();
  const { i18n, t } = useTranslation();
  const toLocalDate = useLocalDate();
  const [deleteInvoice] = useInvestorInvoiceAlertDeleteMutation();

  const property = properties.find((p) => p.ID === invoice?.stoID);
  const navigateToInvoice = () => {
    history.push(`/investor/invoice/${invoice?.ID}`);
  };

  const removeInvoice = (id: number) => {
    deleteInvoice({
      variables: {
        ID: id,
      },
    }).then(() => {
      history.push('/investor/active-properties');
    });
  };

  return (
    <>
      <Row className="mb-2">
        <CenteredCol md={2}>{toLocalDate(invoice.dateCreated)}</CenteredCol>
        <CenteredCol md={2}>{property?.title}</CenteredCol>
        <CenteredCol md={3}>{invoice?.shareType?.title}</CenteredCol>
        <CenteredCol md={1}>{(invoice?.shares ?? 0).toLocaleString(i18n.language)}</CenteredCol>
        <CenteredCol md={1}>
          {invoice.shareType.currency.symbol} {invoice.amountToPay}
        </CenteredCol>
        <CenteredCol md={1}>{invoice.status === InvoiceStatusType.Unpaid ? 'Pending' : 'Resolved'}</CenteredCol>
        <CenteredCol md={1}>
          <Button size="sm" onClick={navigateToInvoice}>
            {t('InvoiceItem-Review')}
          </Button>
          <Button size="sm" onClick={() => removeInvoice(invoice.ID)}>
            {t('InvoiceItem-Delete')}
          </Button>
        </CenteredCol>
      </Row>
    </>
  );
};

export default InvoiceItem;
