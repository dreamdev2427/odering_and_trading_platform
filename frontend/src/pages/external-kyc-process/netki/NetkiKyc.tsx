import React from 'react';
import { useGetNetkiSignUpDataQuery, useRefreshInvestorDataMutation } from 'services/apollo';

import { Card, CardBody, CardHeader, Col, GrayDot, Loading, Row } from 'atoms';
import { useTranslation } from 'react-i18next';
import { Markup, Node } from 'interweave';

const NetkiKyc: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading } = useGetNetkiSignUpDataQuery();
  const [refreshInvestorData] = useRefreshInvestorDataMutation();
  refreshInvestorData();

  if (loading || !data) {
    return <Loading />;
  }
  const { accessCode, mobileAppPanel } = data.getNetkiSignUpData;

  const handleIframe = (node: HTMLElement, children: Node[]): React.ReactNode => {
    if (node.tagName === 'IFRAME') {
      return (
        <iframe
          width={node.getAttribute('width') ?? 'auto'}
          height={node.getAttribute('height') ?? 'auto'}
          title={node.title}
          src={node.getAttribute('src') ?? ''}
          sandbox="allow-scripts allow-same-origin"
        >
          {children}
        </iframe>
      );
    }
  };
  return (
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
            {t('NetkiKyc-AccessCodeLabel')}
            <b>{accessCode}</b>
          </Col>
        </Row>
        <Row>
          <Col>
            {t('NetkiKyc-DeepLink')}
            <a href={`https://daiu.app.link/yBE7efy4PI?service_code=${accessCode}`}>
              {`https://daiu.app.link/yBE7efy4PI?service_code=${accessCode}`}
            </a>
          </Col>
        </Row>
        <Markup content={mobileAppPanel} transform={handleIframe} />
      </CardBody>
    </Card>
  );
};

export default NetkiKyc;
