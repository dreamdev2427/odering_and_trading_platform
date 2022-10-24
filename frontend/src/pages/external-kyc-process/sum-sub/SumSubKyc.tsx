import React from 'react';
import { useGetSumSubInvestorTokenQuery, useMeQuery, useRefreshInvestorDataMutation } from 'services/apollo';

import { BsSwal, Card, CardBody, CardHeader, Col, GrayDot, Loading, Row } from 'atoms';
import { useTranslation } from 'react-i18next';
import SumsubWebSdk from '@sumsub/websdk-react';
import { useHistory } from 'react-router-dom';
import { AnyEventName, AnyEventPayload } from '@sumsub/websdk/types/types';

type sumSubEventPayloadType = {
  reviewId: string;
  attemptId: string;
  attemptCnt: number;
  elapsedSincePendingMs: number;
  elapsedSinceQueuedMs: number;
  reprocessing: boolean;
  levelName: string;
  createDate: string;
  reviewDate: string;
  reviewResult: {
    reviewAnswer: string;
  };
  reviewStatus: string;
  priority: number;
  autoChecked: boolean;
};

const SumSubKyc: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { data: dataMe, loading: loadingMe } = useMeQuery({ fetchPolicy: 'network-only' });
  const [refreshInvestorData] = useRefreshInvestorDataMutation();
  const { investor, sto } = dataMe?.investorUser || {};
  const { data, loading } = useGetSumSubInvestorTokenQuery();
  if (loading || loadingMe || !investor || !sto || !data) {
    return <Loading />;
  }
  const token = data.getSumSubInvestorToken;
  const config = {
    lang: 'en',
    email: investor.email,
  };

  const expirationHandler = (): Promise<string> => {
    return Promise.resolve(token);
  };

  const messageHandler = async (type: AnyEventName, payload: AnyEventPayload): Promise<void> => {
    if (
      type === 'idCheck.applicantStatus' &&
      (payload as sumSubEventPayloadType)?.reviewResult?.reviewAnswer === 'GREEN'
    ) {
      await refreshInvestorData();
      BsSwal.fire({
        title: t('sumSubKyc-accountApproved'),
        icon: 'success',
        confirmButtonText: t('ok'),
      }).then(async (result) => {
        if (result.isConfirmed) {
          history.push('/investor/active-properties');
        }
      });
    }
  };

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
              <SumsubWebSdk
                accessToken={token}
                config={config}
                expirationHandler={expirationHandler}
                onMessage={messageHandler}
                options={{ adaptIframeHeight: true }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default SumSubKyc;
