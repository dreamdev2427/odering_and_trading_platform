import React from 'react';
import { useCountriesQuery, useInvestorAppDataQuery, useMeQuery } from 'services/apollo';

import { Card, CardBody, CardHeader as CardHeaderR, Col, GrayDot, Loading, Row } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import PersonalInformationForm from 'pages/kyc-process/components/PersonalInformationForm';
import { useTranslation } from 'react-i18next';
import { Country } from './components/PersonalInformationForm';

interface PersonalInformationProps {
  nextStep?(): void;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ nextStep }) => {
  const { data: dataMe, loading: loadingMe } = useMeQuery({ fetchPolicy: 'network-only' });
  const { data: appData, loading: appDataLoad } = useInvestorAppDataQuery();
  const { investorSto, investor, sto } = dataMe?.investorUser || {};
  const { data, loading } = useCountriesQuery();
  const { t } = useTranslation();
  if (loading || loadingMe || !investor || !sto || !investorSto || !data || !appData || appDataLoad) {
    return <Loading />;
  }

  const countries = data.countries?.map((value) => ({ value, label: value } as Country)) || [];

  return (
    <>
      <Card>
        <CardHeaderR className="mt-3">
          <b>{t('Welcome to your Verification Process')}</b>
        </CardHeaderR>
        <CardBody className="mb-3">
          <Row>
            <Col xs="auto">
              <GrayDot />
            </Col>
            <Col tag="p">
              {t(
                'Please enter the required information in each step. You can click the page links on the left to jump to a specific page',
              )}
            </Col>
          </Row>
          <Row>
            <Col xs="auto">
              <GrayDot />
            </Col>
            <Col tag="p">{t('Fields marked with * are mandatory')}</Col>
          </Row>
          <Row>
            <Col xs="auto">
              <GrayDot />
            </Col>
            <Col tag="p">{t('You can logout anytime and re-login with your email and password to continue')}</Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardHeader text={t('Personal Information')} />
        <CardBody>
          <PersonalInformationForm
            investor={investor}
            investorSTO={investorSto}
            investorTypes={sto.stoInvestorTypes}
            countries={countries}
            nextStep={nextStep}
            appData={appData.investorAppParameters}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default PersonalInformation;
