import React from 'react';
import { useTranslation } from 'react-i18next';

import { useActiveSto } from 'hooks';
import { useGetExchangeOrdersQuery } from 'services/apollo';
import { ExchangeOrderItem } from 'services/apollo/exchange';

import { Card, CardBody, Col, Loading, Row, Label, BrandIcon } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import SortTable from '../SortTable';
import ExchangeOrderTypeCell from './ExchangeOrderTypeCell';
import ExchangeOrderActionCell from './ExchangeOrderActionCell';
import ExchangeOrderChatCell from './ExchangeOrderChatCell';

const ExchangeOrders: React.FC = () => {
  const { sto } = useActiveSto();
  const { t } = useTranslation();

  const columns = React.useMemo(
    () => [
      {
        Header: t('tradingComponentsExchangeOrdersTableHeaderColumn1'),
        accessor: 'dateFrom',
      },
      {
        Header: t('tradingComponentsExchangeOrdersTableHeaderColumn2'),
        accessor: 'shareType.title',
      },
      {
        Header: t('tradingComponentsExchangeOrdersTableHeaderColumn3'),
        accessor: (item: ExchangeOrderItem) => {
          return `${item.shares} ${t('tradingComponentsExchangeOrdersShare', { count: item.shares })}`;
        },
        id: 'shares',
      },
      {
        Header: t('tradingComponentsExchangeOrdersTableHeaderColumn4'),
        accessor: 'type',
        cell: ExchangeOrderTypeCell,
      },
      {
        Header: t('tradingComponentsExchangeOrdersTableHeaderColumn5'),
        accessor: (item: ExchangeOrderItem) => {
          if (item.atomicSwapAcceptable) {
            return `${item.rateFrom} ${t('tradingComponentsExchangeOrdersToken', { count: item.rateFrom })}`;
          }
          return `${item.shareType.currency.symbol} ${item.rateFrom}`;
        },
        id: 'rateFrom',
      },
      {
        accessor: 'ID',
        Cell: ExchangeOrderActionCell,
      },
      {
        accessor: 'chat',
        Cell: ExchangeOrderChatCell,
      },
    ],
    [t],
  );

  const { data, loading } = useGetExchangeOrdersQuery({
    variables: {
      stoID: sto,
    },
    fetchPolicy: 'no-cache',
  });

  if (loading || !data) {
    return <Loading />;
  }
  const { getExchangeOrders: orders } = data;

  return (
    <Card>
      <CardHeader
        text={t('tradingComponentsExchangeOrdersCardHeader')}
        caption={t('tradingComponentsExchangeOrdersCardCaption')}
        icon={<BrandIcon icon="exchange-alt" pill color="green" />}
      />
      <CardBody className="mb-2">
        <Row>
          <Col md={12}>
            {orders.length ? (
              <SortTable columns={columns} data={orders} />
            ) : (
              <Label>{t('tradingComponentsExchangeOrdersNoOrdersLabel')}</Label>
            )}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ExchangeOrders;
