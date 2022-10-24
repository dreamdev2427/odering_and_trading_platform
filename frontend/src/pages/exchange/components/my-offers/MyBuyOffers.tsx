import React from 'react';
import { useTranslation } from 'react-i18next';

import { useActiveSto } from 'hooks';
import { useGetMyOffersQuery, ExchangeType } from 'services/apollo';
import { InvestorExchangeOffer } from 'services/apollo/exchange';

import { CardHeader } from 'components/card-header/CardHeader';
import { Loading, Card, CardBody, WrapIcon } from 'atoms';
import SortTable from '../SortTable';
import MyBuyOfferActionCell from './MyBuyOfferActionCell';

const MyBuyOffers: React.FC = () => {
  const { sto } = useActiveSto();
  const { t } = useTranslation();

  const columns = React.useMemo(
    () => [
      {
        Header: t('tradingComponentsMyBuyOffersTableHeaderColumn1'),
        accessor: 'exchangeOrder.dateFrom',
      },
      {
        Header: t('tradingComponentsMyBuyOffersTableHeaderColumn2'),
        accessor: 'exchangeOrder.shareType.title',
      },
      {
        Header: t('tradingComponentsMyBuyOffersTableHeaderColumn3'),
        accessor: (item: InvestorExchangeOffer) => {
          return `${item.sharesPartial} ${t('tradingComponentsMyBuyOffersShare', { count: item.sharesPartial })}`;
        },
      },
      {
        Header: t('tradingComponentsMyBuyOffersTableHeaderColumn4'),
        accessor: (item: InvestorExchangeOffer) => {
          if (item.exchangeOrder.atomicSwapAcceptable) {
            return `${item.rateFrom} ${t('tradingComponentsMyBuyOffersToken', { count: item.rateFrom })}`;
          }
          return `${item.exchangeOrder.shareType.currency.symbol} ${item.rateFrom}`;
        },
      },
      {
        accessor: 'ID',
        Cell: MyBuyOfferActionCell,
      },
    ],
    [t],
  );

  const { data, loading } = useGetMyOffersQuery({
    variables: {
      stoID: sto,
      type: ExchangeType.Buy,
    },
    fetchPolicy: 'no-cache',
  });

  if (loading || !data) {
    return <Loading />;
  }
  const { getExchangeOffers: offers } = data;

  if (!offers.length) {
    return <></>;
  }

  return (
    <Card>
      <CardHeader
        text={t('tradingComponentsMyBuyOffersCardHeader')}
        caption={t('tradingComponentsMyBuyOffersCardCaption')}
        icon={
          <WrapIcon color="red" pill>
            B
          </WrapIcon>
        }
      />
      <CardBody className="mb-2">
        <SortTable columns={columns} data={offers} />
      </CardBody>
    </Card>
  );
};

export default MyBuyOffers;
