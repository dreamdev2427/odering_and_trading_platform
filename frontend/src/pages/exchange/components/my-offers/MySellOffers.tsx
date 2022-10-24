import React from 'react';
import { useTranslation } from 'react-i18next';
import { useActiveSto } from 'hooks';
import { useGetMyOffersQuery, ExchangeType } from 'services/apollo';
import { InvestorExchangeOffer } from 'services/apollo/exchange';

import { CardHeader } from 'components/card-header/CardHeader';
import { Loading, Card, CardBody, WrapIcon } from 'atoms';
import MySellOfferActionCell from './MySellOfferActionCell';
import SortTable from '../SortTable';

const MySellOffers: React.FC = () => {
  const { sto } = useActiveSto();
  const { t } = useTranslation();

  const columns = React.useMemo(
    () => [
      {
        Header: t('tradingComponentsMySellOffersTableHeaderColumn1'),
        accessor: 'exchangeOrder.dateFrom',
      },
      {
        Header: t('tradingComponentsMySellOffersTableHeaderColumn2'),
        accessor: 'exchangeOrder.shareType.title',
      },
      {
        Header: t('tradingComponentsMySellOffersTableHeaderColumn3'),
        accessor: (item: InvestorExchangeOffer) => {
          return `${item.sharesPartial} ${t('tradingComponentsMySellOffersShare', { count: item.sharesPartial })}`;
        },
      },
      {
        Header: t('tradingComponentsMySellOffersTableHeaderColumn4'),
        accessor: (item: InvestorExchangeOffer) => {
          if (item.exchangeOrder.atomicSwapAcceptable) {
            return `${item.rateFrom} ${t('tradingComponentsMySellOffersToken', { count: item.rateFrom })}`;
          }
          return `${item.exchangeOrder.shareType.currency.symbol} ${item.rateFrom}`;
        },
      },
      {
        accessor: 'ID',
        Cell: MySellOfferActionCell,
      },
    ],
    [t],
  );

  const { data, loading } = useGetMyOffersQuery({
    variables: {
      stoID: sto,
      type: ExchangeType.Sell,
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
        text={t('tradingComponentsMySellOffersCardHeader')}
        caption={t('tradingComponentsMySellOffersCardCaption')}
        icon={
          <WrapIcon color="green" pill>
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

export default MySellOffers;
