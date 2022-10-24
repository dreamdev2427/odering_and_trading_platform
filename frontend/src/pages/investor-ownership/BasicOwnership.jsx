import React from 'react';

import { useCountriesQuery } from 'services/apollo';
import USER from 'assets/img/user.png';

import { Card, CardBody, Col, Loading, Row } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import StoSelect from 'components/StoSelect';
import { useTranslation } from 'react-i18next';
import UsufructuaryForm from './components/UsufructuaryForm';
import BeneficialForm from './components/BeneficialForm';
import { useMeQuery } from '../../services/apollo';

const BasicOwnership = () => {
  const { data, loading } = useMeQuery({ fetchPolicy: 'network-only' });
  const { data: dataCountry } = useCountriesQuery();
  const { t } = useTranslation();
  if (loading || !data?.investorUser || !dataCountry) {
    return <Loading />;
  }

  const countries = dataCountry.countries.map((value) => ({ value, label: value }));
  const { investorSto } = data?.investorUser || {};
  return (
    <div className="content">
      <Row className="mb-4">
        <Col xs={{ size: 6, offset: 6 }}>
          <StoSelect />
        </Col>
      </Row>
      <Card>
        <CardHeader text={t('Usufructuary')} caption={t('who-is-legal-owner-of-shares')} imgSrc={USER} />
        <CardBody>
          <p>{t('Whether-you-are-the-legal-owner-or-usufructuary')}</p>
          <UsufructuaryForm person={investorSto} countries={countries} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader
          text={t('Beneficial-Owner')}
          caption={t('Provide-information-on-the-beneficial-owner-of-your-shares')}
          imgSrc={USER}
        />
        <CardBody>
          <p>{t('Whether-you-are-the-legal-owner-or-usufructuary')}</p>
          <BeneficialForm person={investorSto} countries={countries} />
        </CardBody>
      </Card>
    </div>
  );
};

export default BasicOwnership;
