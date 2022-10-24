import React from 'react';
import { ActiveProperty, useInvestorInvoiceAlertsQuery } from 'services/apollo';
import { Card, CardBody, Col, Loading, Row } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import InvoiceItem from 'pages/invoice/components/InvoiceItem';
import SUMMARY from 'assets/img/summary.png';

interface InvoiceProps {
  properties: ActiveProperty[];
}

const Invoice: React.FC<InvoiceProps> = (props) => {
  const { properties } = props;
  const { data, loading } = useInvestorInvoiceAlertsQuery({ fetchPolicy: 'no-cache' });

  if (!data || loading) {
    return <Loading />;
  }
  const invoices = data.investorInvoiceAlerts;

  return invoices.length ? (
    <Row>
      <Col md={12}>
        <Card>
          <CardHeader text="Payment Requests" caption={` Review your Payment Request`} imgSrc={SUMMARY} />
          <CardBody className="mb-2">
            <Row className="text-muted">
              <Col md={2}>
                <label>Date</label>
              </Col>
              <Col md={2}>
                <label>Company / Project</label>
              </Col>
              <Col md={3}>
                <label>Share</label>
              </Col>
              <Col md={1}>
                <label>Shares</label>
              </Col>
              <Col md={1}>
                <label>Price to pay</label>
              </Col>
              <Col>
                <label>Status</label>
              </Col>
              <Col md={3} />
            </Row>
            {invoices.map((invoice) => (
              <InvoiceItem key={invoice.ID} invoice={invoice} properties={properties} />
            ))}
          </CardBody>
        </Card>
      </Col>
    </Row>
  ) : null;
};

export default Invoice;
