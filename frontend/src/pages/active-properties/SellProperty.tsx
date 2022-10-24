import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import SUMMARY from 'assets/img/summary.png';
import { useInvestorSharesQuery, useInvestorDetailPropertyQuery, useInvestorAppDataQuery } from 'services/apollo';
import { Card, CardBody, Col, Loading, Row } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import ShareItem from 'pages/active-properties/components/ShareItem';

const SellProperty: React.FC = () => {
  const { data: appData, loading: appDataLoading } = useInvestorAppDataQuery();
  const { _id } = useParams<{ _id: string }>();
  const { data: dataProperty, loading } = useInvestorDetailPropertyQuery({
    variables: { _id: Number(_id) },
  });
  const { t } = useTranslation();
  const { data: portfolio, loading: load1 } = useInvestorSharesQuery({
    variables: { stoID: Number(_id) },
    fetchPolicy: 'no-cache',
  });

  if (loading || load1 || appDataLoading || !dataProperty || !appData) {
    return <Loading />;
  }

  const shares = portfolio?.investorShares;
  const {
    investorDetailProperty: { title, details, picture },
  } = dataProperty;
  return (
    <div className="content">
      <Card>
        <CardHeader
          text={t('SellProperty-CardHeader-text')}
          caption={t('SellProperty-CardHeader-caption')}
          imgSrc="/img/buy.png"
        />
        <CardBody>
          <Row>
            <Col md={4}>
              <Img width="100%" height="200px" src={picture} />
            </Col>
            <Col md={8}>
              <h1>{title}</h1>
              <p>{details}</p>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader text={t('Current-Holdings')} imgSrc={SUMMARY} />
        <CardBody>
          <Row className="text-muted">
            <Col md={3}>
              <label>{t('SellProperty-TableHeader-shareTitle')}</label>
            </Col>
            <Col md={2}>
              <label>{t('SellProperty-TableHeader-shareCount')}</label>
            </Col>
            <Col md={2}>
              <label>{t('Market-Value')}</label>
            </Col>
            <Col md={3} />
          </Row>
          {shares?.map((share) => (
            <ShareItem key={share.ID} share={share} />
          ))}
        </CardBody>
      </Card>
    </div>
  );
};

export default SellProperty;

const Img = styled.img<{ small?: boolean }>`
  max-width: ${(p) => (p.small ? 20 : 100)}%;
  max-height: ${(p) => (p.small ? '30px' : '100%')};
`;
