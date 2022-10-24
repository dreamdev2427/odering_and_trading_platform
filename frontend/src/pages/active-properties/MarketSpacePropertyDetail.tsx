import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useInvestorAppDataQuery, useInvestorStoDetailQuery } from 'services/apollo';

import { Col, Row, Loading, Button, CenteredCol } from 'atoms';
import PropertyGallery from './components/PropertyGallery';
import PropertyDocuments from './components/PropertyDocuments';
import MetaChart from './components/MetaChart';
import MetaContent from './components/MetaContent';
import ContactCompany from '../inbox/components/ContactCompany';
import DynamicContent from './components/DynamicContent';

const ignoredKeys = ['left_sidebar', 'left_sidebar_chart'];

const MarketSpacePropertyDetail: React.FC = () => {
  const stoId = Number(useParams<{ _id: string }>()?._id);
  const history = useHistory();
  const { t } = useTranslation();

  const { data, loading } = useInvestorAppDataQuery();
  const { data: stoDetails, loading: loadStoDetails } = useInvestorStoDetailQuery({
    variables: { _id: stoId },
  });

  if (loadStoDetails || !stoDetails) {
    return <Loading />;
  }

  const { findSto: sto } = stoDetails;

  if (!sto || loading || !data) {
    return <Loading />;
  }
  const buy = () => {
    history.push(`/investor/buy-property/${sto.ID}`);
  };
  const detail = [{ key: 'project_overview', value: sto.fullDetails, stoID: sto.ID, order: 0, display: true }];
  const metaSidebar = sto.meta.find((x) => x.key === 'left_sidebar');
  const isLeft = !!metaSidebar?.value;

  const metaList = sto.meta.filter((meta) => !ignoredKeys.includes(meta.key));

  const { isContactTheSponsorFontSwitchEnabled, areSTOHostnamesEnabled: areHostNamesEnabled } =
    data.investorAppParameters;
  const pictureUrl =
    sto.ID > 0 && !areHostNamesEnabled
      ? `https://${sto.stolinkfull.substring(sto.stolinkfull.indexOf('.') + 1)}`
      : sto.stolinkfull;

  return (
    <div className="content">
      <Row>
        <Col md={8}>
          <h1>{sto.title}</h1>
        </Col>
        <hr />
        <CenteredCol>
          {sto.isBuyButtonEnabled ? (
            <Button wmin="200px" hmin="130px" className="m-1 text-nowrap" onClick={buy}>
              {t('detailPropertyButtonInvestInProperty')}
            </Button>
          ) : null}
        </CenteredCol>
      </Row>
      <Row>
        <Col md={isLeft ? 8 : 12}>
          {sto.images.length > 0 && (
            <PropertyGallery
              classNames={!isLeft ? 'w-100 h-50' : ''}
              logo={`${pictureUrl}/img/stologo/${sto.logo}`}
              images={sto.images}
            />
          )}
          <MetaContent meta={detail} name="project_overview" />
          <DynamicContent meta={metaList} />
        </Col>
        {isLeft ? (
          <Col md={4}>
            <div className="mt-4">
              <b>Details</b>
            </div>
            <p>{sto.details}</p>
            <PropertyDocuments documents={sto.documents} />
            <MetaChart meta={sto.meta} name="left_sidebar_chart" />
            <ContactCompany isContactTheSponsorFontSwitchEnabled={isContactTheSponsorFontSwitchEnabled} />
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default MarketSpacePropertyDetail;
