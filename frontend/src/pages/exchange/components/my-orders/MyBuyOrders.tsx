import React from 'react';
import { useTranslation } from 'react-i18next';

import { useActiveSto } from 'hooks';
import { ExchangeType, useGetInvestorExchangeOrdersQuery } from 'services/apollo';
import { InvestorShares } from 'services/apollo/shares';

import { Loading, Card, CardBody, WrapIcon } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import SortTable from '../SortTable';
import MyBuyOrderTypeCell from './MyBuyOrderTypeCell';
import MyBuyOrderActionCell from './MyBuyOrderActionCell';
import MyOrderChatListCell from './MyOrderChatListCell';

const MyBuyOrders: React.FC = () => {
  const { sto } = useActiveSto();
  const { t } = useTranslation();

  const columns = React.useMemo(
    () => [
      {
        Header: t('tradingComponentsMyBuyOrdersTableHeaderColumn1'),
        accessor: 'dateFrom',
      },
      {
        Header: t('tradingComponentsMyBuyOrdersTableHeaderColumn2'),
        accessor: 'shareType.title',
      },
      {
        Header: t('tradingComponentsMyBuyOrdersTableHeaderColumn3'),
        accessor: (item: InvestorShares) => {
          return `${item.shares} ${t('tradingComponentsMyBuyOrdersShare', { count: item.shares })}`;
        },
      },
      {
        Header: t('tradingComponentsMyBuyOrdersTableHeaderColumn4'),
        accessor: 'rateFrom',
        Cell: MyBuyOrderTypeCell,
      },
      {
        accessor: 'ID',
        Cell: MyBuyOrderActionCell,
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
      type: ExchangeType.Buy,
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
        text={t('tradingComponentsMyBuyOrdersCardHeader')}
        caption={t('tradingComponentsMyBuyOrdersCardCaption')}
        icon={
          <WrapIcon color="red" pill>
            B
          </WrapIcon>
        }
      />

      <CardBody className="mb-2">
        <SortTable columns={columns} data={orders} />
      </CardBody>
    </Card>
  );
};

export default MyBuyOrders;
