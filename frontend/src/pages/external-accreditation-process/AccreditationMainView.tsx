import React from 'react';
import { Card, CardBody, Col, Loading, Row } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import { useTranslation } from 'react-i18next';
import { AccreditationProviderEnum, useInvestorAppDataQuery, useVerifyInvestorQuery } from 'services/apollo';
import VerifiyInvestorCom from './verify-investor-com/VerifyInvestorCom';
import Accredd from './Accredd';

const AccreditationMainView: React.FC = () => {
  const { data: appData, loading: appDataLoad } = useInvestorAppDataQuery();
  const { t } = useTranslation();
  const accreditationRequiredCountries = ['United States', 'United States of America', 'USA', 'US'];

  const { data, loading } = useVerifyInvestorQuery({ fetchPolicy: 'no-cache' });

  if (loading || appDataLoad || !data || !appData) {
    return <Loading />;
  }
  const { sto, investorSto, investor } = data.investorUser || {};
  const { AccreditationProvider: provider, AccreddRedirectLink: accreddRedirectLink } = appData.investorAppParameters;
  const url = data.getVerifyInvestorUrl || {};

  if (!sto || !investorSto || !investor) {
    return <Loading />;
  }

  const getStatusName = (status: number) => {
    switch (status) {
      case 1:
        return 'NORMAL';
      case 3:
        return 'ACCREDITED';
      case 7:
        return 'UN-REGISTERED';
      default:
        return 'UN-REGISTERED';
    }
  };
  return (
    <>
      <Row className="content">
        <Col>
          <Card>
            <CardHeader
              text={t('accreditationMainViewCardTitle')}
              imgSrc="/img/accredited.png"
              caption={`${t('accreditationMainViewUpgradeProfileStatusLabel')} ${getStatusName(investorSto.status)}`}
            />
            <CardBody>
              <Row>
                <Col>
                  {investorSto.status !== 3 &&
                    accreditationRequiredCountries.find(
                      (c) => c.toLowerCase() === investor.taxCountry?.toLowerCase(),
                    ) && (
                      <span style={{ color: 'red', fontSize: '18px' }}>
                        {t('accreditationMainViewRequireAccreditationMessage')}
                      </span>
                    )}
                </Col>
              </Row>
              <Row>
                <Col md={5}>
                  {provider === AccreditationProviderEnum.Accredd ? (
                    <Accredd accreddRedirectLink={accreddRedirectLink} />
                  ) : (
                    <VerifiyInvestorCom
                      investor={investor}
                      stoID={sto.ID}
                      accessToken={sto.verifyInvestorComHostToken}
                      url={url}
                    />
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AccreditationMainView;
