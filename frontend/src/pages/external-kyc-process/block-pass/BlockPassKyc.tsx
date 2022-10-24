import React from 'react';
import { useGetBlockPassClientIdQuery, useMeQuery } from 'services/apollo';

import { Card, CardBody, CardHeader, Col, GrayDot, Loading, Row } from 'atoms';
import { useTranslation } from 'react-i18next';
import BlockPassButton from './BlockPassButton';

const BlockPassKyc: React.FC = () => {
  const { t } = useTranslation();
  const { data: dataMe, loading: loadingMe } = useMeQuery({ fetchPolicy: 'network-only' });
  const { investor, sto } = dataMe?.investorUser || {};
  const { data, loading } = useGetBlockPassClientIdQuery();

  if (loading || loadingMe || !investor || !sto || !data) {
    return <Loading />;
  }

  return (
    <>
      <Card>
        <CardHeader className="mt-3">
          <b>{t('Welcome to your Verification Process')}</b>
        </CardHeader>
        <CardBody className="mb-3">
          <Row>
            <Col xs="auto">
              <GrayDot />
            </Col>
            <Col tag="p">{t('You can logout anytime and re-login with your email and password to continue')}</Col>
          </Row>
          <Row>
            <Col>
              <BlockPassButton
                investorID={investor.ID}
                clientID={data.getBlockPassClientID}
                investorEmail={investor.email}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default BlockPassKyc;
