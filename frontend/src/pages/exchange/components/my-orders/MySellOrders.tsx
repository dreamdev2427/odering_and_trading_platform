import React from 'react';
import { useTranslation } from 'react-i18next';

import { useActiveSto } from 'hooks';
import { ExchangeType, useGetInvestorExchangeOrdersQuery } from 'services/apollo';
import { InvestorExchangeOrder } from 'services/apollo/exchange';

import { CardHeader } from 'components/card-header/CardHeader';
import { Loading, Card, CardBody, WrapIcon } from 'atoms';
import MyBuyOrderTypeCell from './MyBuyOrderTypeCell';
import SortTable from '../SortTable';
import MySellOrderActionCell from './MySellOrderActionCell';
import MyOrderChatListCell from './MyOrderChatListCell';

const MySellOrders: React.FC = () => {
  const { sto } = useActiveSto();
  const { t } = useTranslation();

  const columns = React.useMemo(
    () => [
      {
        Header: t('tradingComponentsMySellOrdersTableHeaderColumn1'),
        accessor: 'dateFrom',
      },
      {
        Header: t('tradingComponentsMySellOrdersTableHeaderColumn2'),
        accessor: 'shareType.title',
      },
      {
        Header: t('tradingComponentsMySellOrdersTableHeaderColumn3'),
        accessor: (item: InvestorExchangeOrder) => {
          return `${item.shares} ${t('tradingComponentsMySellOrdersShare', { count: item.shares })}`;
        },
      },
      {
        Header: t('tradingComponentsMySellOrdersTableHeaderColumn4'),
        accessor: 'rateFrom',
        Cell: MyBuyOrderTypeCell,
      },
      {
        accessor: 'ID',
        Cell: MySellOrderActionCell,
      },
      {
        accessor: 'chat',
        Cell: MyOrderChatListCell,
      },
    ],
    [t],
  );

  const { data, loading } = useGetInvestorExchangeOrdersQuery({
    variables: {
      stoID: sto,
      type: ExchangeType.Sell,
    },
    fetchPolicy: 'no-cache',
  });

  if (loading || !data) {
    return <Loading />;
  }
  const { getInvestorExchangeOrders: orders } = data;

  if (!orders.length) {
    return <></>;
  }

  return (
    <Card>
      <CardHeader
        text={t('tradingComponentsMySellOrdersCardHeader')}
        caption={t('tradingComponentsMySellOrdersCardCaption')}
        icon={
          <WrapIcon color="green" pill>
            S
          </WrapIcon>
        }
      />
      <CardBody className="mb-2">
        <SortTable columns={columns} data={orders} />
      </CardBody>
    </Card>
  );
};

export default MySellOrders;
