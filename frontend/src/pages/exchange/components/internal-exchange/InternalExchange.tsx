import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useActiveSto } from 'hooks';
import { useInvestorSharesQuery } from 'services/apollo';
import { InvestorShares } from 'services/apollo/shares';

import { Button, Loading, Card, CardBody, Row, Col, BadgeIcon, BrandIcon } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import InternalExchangeValueCell from './InternalExchangeValueCell';
import InternalExchangeActionCell from './InternalExchangeActionCell';
import SortTable from '../SortTable';

const InternalExchange: React.FC = () => {
  const { sto } = useActiveSto();
  const history = useHistory();
  const { t } = useTranslation();

  const columns = React.useMemo(
    () => [
      {
        Header: t('tradingComponentsInternalExchangeTableHeaderColumn1'),
        accessor: 'shareType.title',
      },
      {
        Header: t('tradingComponentsInternalExchangeTableHeaderColumn2'),
        accessor: (item: InvestorShares) => {
          return item.shareType.nominalValue > 0 ? item.shareType.nominalValue : item.shareType.premiumValue;
        },
        Cell: InternalExchangeValueCell,
        id: 'value',
      },
      {
        Header: t('tradingComponentsInternalExchangeTableHeaderColumn3'),
        accessor: 'shares',
      },
      {
        accessor: 'ID',
        Cell: InternalExchangeActionCell,
      },
    ],
    [t],
  );

  const { data, loading } = useInvestorSharesQuery({ variables: { stoID: sto }, fetchPolicy: 'no-cache' });

  if (loading || !data) {
    return <Loading />;
  }

  const { investorShares } = data;

  return (
    <Card>
      <CardHeader
        text={t('tradingComponentsInternalExchangeCardHeader')}
        caption={t('tradingComponentsInternalExchangeCardCaption')}
        icon={<BrandIcon icon="exchange-alt" pill />}
        rightButton={
          <Button size="sm" onClick={() => history.push('/investor/new-buy-order/')}>
            {t('tradingComponentsInternalExchangeCardHeaderNewBuyButton')}
          </Button>
        }
      />
      <CardBody className="mb-2">
        <SortTable columns={columns} data={investorShares} />
        <Row>
          <Col xs="auto">
            <BadgeIcon color="cyan" pill>
              N
            </BadgeIcon>
            {t('tradingComponentsInternalExchangeLegendNominalValue')}
          </Col>
          <Col xs="auto">
            <BadgeIcon color="pink" pill>
              P
            </BadgeIcon>
            {t('tradingComponentsInternalExchangeLegendPremiumValue')}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default InternalExchange;
