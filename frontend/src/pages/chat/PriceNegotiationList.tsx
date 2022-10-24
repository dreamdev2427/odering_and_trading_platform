import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert } from 'reactstrap';

import { useGetPriceNegotiationListQuery, PriceNegotiationListItem } from 'services/apollo';

import { Loading, Card, CardBody, BrandIcon, Button } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import SortTable from './components/SortTable';
import PriceNegotiationListActionCell from './PriceNegotiationListActionCell';

const PriceNegotiationList: React.FC = () => {
  const history = useHistory();

  const params = useParams<{ orderID: string }>();
  const orderID = parseInt(params.orderID, 10);

  const { t } = useTranslation();

  const goBack = (): void => history.goBack();

  const columns = React.useMemo(
    () => [
      {
        Header: t('Price-Negotiation-List-Table-Column-Header-FullName'),
        accessor: (item: PriceNegotiationListItem) => `${item.counterpartFullName}`,
      },
      {
        Header: t('Price-Negotiation-List-Table-Column-Header-DateSent'),
        accessor: (item: PriceNegotiationListItem) => {
          return `${item.formattedDateSent}`;
        },
      },
      {
        accessor: 'viewChat',
        Cell: PriceNegotiationListActionCell,
      },
    ],
    [t],
  );

  const { data, loading } = useGetPriceNegotiationListQuery({
    variables: {
      orderID,
    },
    fetchPolicy: 'network-only',
  });

  if (loading || !data) {
    return <Loading />;
  }
  const { getPriceNegotiationList: chatList } = data;

  return (
    <div className="content">
      <Card>
        <CardHeader text={t('Price-Negotiation-List-Header')} icon={<BrandIcon icon="comment" color="cyan" pill />} />
        <CardBody className="mb-2 mt-2">
          {chatList.length === 0 ? (
            <Alert color="secondary">{t('Price-Negotiation-List-No-Conversation-Found')}</Alert>
          ) : (
            <SortTable columns={columns} data={chatList} />
          )}
          <Button size="lg" onClick={goBack}>
            {t('Price-Negotiation-Back-Button')}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default PriceNegotiationList;
