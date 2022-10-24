import React from 'react';
import { useTranslation } from 'react-i18next';

import { useInvestorWalletQuery, usePortfolioValueQuery } from 'services/apollo/graphql';

import { Card, CardBody, Col, Row, CenteredCol, Loading } from 'atoms';
import { useActiveSto } from 'hooks';
import { InvestorPortfolioShares } from 'services/apollo/multisto';
import PopoverHover from 'components/PopoverHover';

interface PortfolioOverviewMarketspaceProps {
  totalBalances: Array<{ symbol: string; amount: number }>;
  yearlyDividends: number;
  shares: InvestorPortfolioShares[];
}

const PortfolioOverviewMarketspace: React.FC<PortfolioOverviewMarketspaceProps> = (props) => {
  const { totalBalances, yearlyDividends, shares } = props;
  const { i18n, t } = useTranslation();
  const { sto } = useActiveSto();
  const { data, loading } = useInvestorWalletQuery({
    variables: { _id: sto },
    fetchPolicy: 'no-cache',
  });
  const { data: valueData, loading: valueLoading } = usePortfolioValueQuery({
    variables: { stoID: sto },
  });

  if (!totalBalances || loading || !data?.investorBalances || !valueData || valueLoading) {
    return <Loading />;
  }

  const totalAmountInvested = totalBalances.reduce<number>((accumulator, obj) => {
    return accumulator + obj.amount;
  }, 0);

  const symbol = shares[0]?.shareType?.currency.symbol;

  return (
    <>
      <Card>
        <CardBody className="mb-2">
          <Row className="text-muted">
            <Col md={3}>
              <PopoverHover
                label={t('portfolioOverviewMarketspace-totalInvested')}
                target={<i className="ti-help-alt pl-1" />}
                body={t('portfolioOverviewMarketspace-totalInvested-desc')}
              />
            </Col>
            <Col md={3}>
              <PopoverHover
                label={t('portfolioOverviewMarketspace-portfolioValue')}
                target={<i className="ti-help-alt pl-1" />}
                body={t('portfolioOverviewMarketspace-portfolioValue-desc')}
              />
            </Col>
            <Col md={4}>
              <PopoverHover
                label={t('portfolioOverviewMarketspace-distributionsReceived')}
                target={<i className="ti-help-alt pl-1" />}
                body={t('portfolioOverviewMarketspace-distributionsReceived-desc')}
              />
            </Col>
            <Col>
              <PopoverHover
                label={t('portfolioOverviewMarketspace-totalBeforeProfit')}
                target={<i className="ti-help-alt pl-1" />}
                body={t('portfolioOverviewMarketspace-totalBeforeProfit-desc')}
              />
            </Col>
          </Row>
          <Row>
            <CenteredCol md={3}>
              <h5>
                {totalAmountInvested.toLocaleString(i18n.language, {
                  minimumFractionDigits: 2,
                })}
              </h5>
            </CenteredCol>
            <CenteredCol md={3}>
              <h5>
                {symbol}
                {valueData.portfolioValue.toLocaleString(i18n.language, {
                  minimumFractionDigits: 2,
                })}
              </h5>
            </CenteredCol>
            <CenteredCol md={4}>
              <h5>
                {symbol}
                {yearlyDividends.toLocaleString(i18n.language, {
                  minimumFractionDigits: 2,
                })}
              </h5>
            </CenteredCol>
            <CenteredCol md={1}>
              <h5>
                {symbol}
                {(+valueData.portfolioValue - +yearlyDividends).toLocaleString(i18n.language, {
                  minimumFractionDigits: 2,
                })}
              </h5>
            </CenteredCol>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default PortfolioOverviewMarketspace;
