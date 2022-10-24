import React, { useEffect, useState } from 'react';
import {
  GetInvestorTypesQuery,
  KycRequirementStep,
  StoInvestorType,
  useRootKycSubscription,
} from 'services/apollo/graphql';
import { Card, CardBody, Col, Row } from 'atoms';
import { useTranslation } from 'react-i18next';
import { CardHeader } from '../components/card-header/CardHeader';
import { KycData } from './VerifyLayout';

interface MyProfileStatusProps {
  investorID: number;
  kycData: KycData;
  updateKyc: (kycData: Partial<KycData>) => void;
  investorTypeData: GetInvestorTypesQuery;
  kycRequirementStep: KycRequirementStep;
}

const MyProfileStatus: React.FC<MyProfileStatusProps> = (props) => {
  const { investorID, kycData, updateKyc, investorTypeData, kycRequirementStep } = props;
  const { data: subscriptionData } = useRootKycSubscription();
  const { t } = useTranslation();
  const { status: subscriptionStatus, isKYC: subscriptionIsKyc } = subscriptionData?.rootKyc || {};
  const getCurrentStatus = (investorTypes: StoInvestorType[], status = 0): string => {
    return investorTypes.find((it) => it.ID === status)?.type ?? 'Undefined';
  };
  const [currentStatus, setCurrentStatus] = useState(
    getCurrentStatus(investorTypeData.getInvestorTypes, kycData.status),
  );

  useEffect(() => {
    if (subscriptionIsKyc !== undefined || subscriptionStatus !== undefined) {
      const showDashboardBtn = kycRequirementStep !== KycRequirementStep.OnRegister || subscriptionIsKyc;
      const newState: Partial<KycData> = {
        isKyc: subscriptionIsKyc,
        status: subscriptionStatus,
        showDashboardBtn,
      };
      updateKyc(newState);
      setCurrentStatus(getCurrentStatus(investorTypeData.getInvestorTypes, subscriptionStatus));
    }
  }, [subscriptionIsKyc, subscriptionStatus, investorTypeData.getInvestorTypes, updateKyc, kycRequirementStep]);

  return (
    <Card>
      <CardHeader
        text={t('VerifyLayout-CardHeader-text')}
        caption={t('VerifyLayout-CardHeader-caption')}
        imgSrc="/img/user.png"
      />
      <CardBody className="mb-2">
        <Row>
          <Col>
            {t('My Investor ID')}
            <b> {investorID}</b>
          </Col>
        </Row>
        <Row>
          <Col>
            {t('VerifyLayout-CurrentStatus')}
            <b> {currentStatus}</b>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default MyProfileStatus;
