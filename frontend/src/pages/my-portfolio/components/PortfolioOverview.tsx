import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import {  useInvestorWalletQuery } from 'services/apollo/graphql';
import { InvestorPortfolioShares } from 'services/apollo/multisto';

import { Card, CardBody, Col, Row, CenteredCol, Loading } from 'atoms';
import { useActiveSto } from 'hooks';

interface PortfolioOverviewProps {
  totalShares: number;
  totalBalances: Array<{ symbol: string; amount: number }>;
  shares: InvestorPortfolioShares[];
  monthlyDividend: number;
}

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({
  totalShares,
  totalBalances,
  monthlyDividend,
  shares,
}) => {
  const { i18n } = useTranslation();
  const { sto } = useActiveSto();
  const { data, loading } = useInvestorWalletQuery({
    variables: { _id: sto },
    fetchPolicy: 'no-cache',
  });

  if (!totalBalances || loading || !data?.investorBalances) {
    return <Loading />;
  }

  return (
    <>
      <Card>
        <CardBody className="mb-2">
          <Row className="text-muted">
            <Col md={3}>
              <label>Total Amount Of Shares</label>
            </Col>
            <Col md={3}>
              <label>Portfolio Value</label>
            </Col>
            <Col md={4}>
              <label>Monthly Dividend Income</label>
            </Col>
            <Col>
              <label>Wallet Balance</label>
            </Col>
          </Row>
          <Row>
            <CenteredCol md={3}>
              <h5>
                {totalShares.toLocaleString(i18n.language, {
                  minimumFractionDigits: 2,
                })}
              </h5>
            </CenteredCol>
            <CenteredCol md={3}>
              <h5>
                {totalBalances.map((balance) => {
                  return (
                    <ColinCol key={balance.symbol}>
                      {balance.symbol}
                      {balance.amount.toLocaleString(i18n.language, {
                        minimumFractionDigits: 2,
                      })}
                    </ColinCol>
                  );
                })}
              </h5>
            </CenteredCol>
            <CenteredCol md={4}>
                {shares.length > 0 ?
              <h5>
                {shares[0].shareType?.currency.symbol}
                {monthlyDividend.toLocaleString(i18n.language, {
                  minimumFractionDigits: 2,
                })}
              </h5>
                 : '' }
            </CenteredCol>
            <CenteredCol md={1}>
              <h5>
                {data.investorBalances.map((balance) => {
                  return (
                    <ColinCol key={balance.ID}>
                      {balance.currency.symbol}
                      {balance.amount.toLocaleString(i18n.language, {
                        minimumFractionDigits: 2,
                      })}
                    </ColinCol>
                  );
                })}
              </h5>
            </CenteredCol>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default PortfolioOverview;

const ColinCol = styled(Col)`
  padding: 0;
  margin: 0;
  border-radius: 0px;
`;
