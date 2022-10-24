import React from 'react';
import { useTranslation } from 'react-i18next';

import { useInvestorInvestingEntitiesQuery } from 'services/apollo';

import { Card, CardBody, CenteredCol, Loading, Col, Row } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import InvestingEntityItem from './components/InvestingEntityItem';
import InvestingEntityNew from './components/InvestingEntityNew';

const InvestorEntities: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading } = useInvestorInvestingEntitiesQuery();

  if (loading || !data) {
    return <Loading />;
  }

  const { investorInvestingEntities: entities } = data;

  return (
    <div className="content">
      <Card>
        <CardHeader
          text={t('entityManagementCardHeader')}
          caption={t('entityManagementCardCaption')}
          imgSrc="/img/agendaitem.png"
        />
        <CardBody className="mb-2">
          <Row>
            <CenteredCol>
              <b>{t('entityItemRowHeaderNickname')}</b>
            </CenteredCol>
            <CenteredCol>
              <b>{t('entityItemRowHeaderNumberMembers')}</b>
            </CenteredCol>
            <CenteredCol>
              <b>{t('entityItemRowAccountTypeLabel')}</b>
            </CenteredCol>
            <CenteredCol>
              <b>{t('InvestingEntity-Status-Text')}</b>
            </CenteredCol>
            <CenteredCol md={1} />
          </Row>
          <br />
          {entities.map((entity) => (
            <Col key={entity.ID}>
              <InvestingEntityItem key={entity.ID} entity={entity} />
            </Col>
          ))}
          <Col>
            <br />
            <InvestingEntityNew />
          </Col>
        </CardBody>
      </Card>
    </div>
  );
};

export default InvestorEntities;
