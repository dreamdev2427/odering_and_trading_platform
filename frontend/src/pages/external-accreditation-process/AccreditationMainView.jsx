import React from 'react';
import { Card, CardBody, Col, Loading, Row } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import { useTranslation } from 'react-i18next';
import VerifiyInvestorCom from './verify-investor-com/VerifyInvestorCom';
import { useInvestorAppDataQuery, useVerifyInvestorQuery } from '../../services/apollo';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AccreditationMainView = () => {
  const { data: appData, loading: appDataLoad } = useInvestorAppDataQuery();
  const { t } = useTranslation();
  const accreditationRequiredCountries = ['United States', 'United States of America', 'USA', 'US'];

  const { data, loading } = useVerifyInvestorQuery({fetchPolicy: 'no-cache'});

  if (loading || !data) {
    return <Loading />;
  }
  const { sto, investorSto, investor } = data?.investorUser || {};
  const url = data?.getVerifyInvestorUrl || {};
  const investorStatusEnum = {
    1: 'NORMAL',
    3: 'ACCREDITED',
    7: 'UNREGISTERED',
  };
  return (
    <>
      <Row className="content">
        <Col>
          <Card>
            <CardHeader
              text={t('accreditationMainViewCardTitle')}
              imgSrc="/img/accredited.png"
              caption={`${t('accreditationMainViewUpgradeProfileStatusLabel')} ${investorStatusEnum[investorSto.status]}`}
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
                  <VerifiyInvestorCom
                    investor={investor}
                    stoID={sto.ID}
                    accessToken={sto.verifyInvestorComHostToken}
                    url={url}
                  />
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
