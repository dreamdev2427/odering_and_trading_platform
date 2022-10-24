import React from 'react';
import { InvestorStoDetailQuery, useInvestorAppDataQuery } from 'services/apollo';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Markup } from 'interweave';

import AGENDA_ITEM from 'assets/img/agendaitem.png';
import { Card, CardBody, Col, Row, Button, Loading } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import PropertyGallery from './components/PropertyGallery';
import PropertyDocuments from './components/PropertyDocuments';
import ContactCompany from '../inbox/components/ContactCompany';
import DynamicContent from './components/DynamicContent';

interface DetailPropertyProps {
  sto: InvestorStoDetailQuery['findSto'];
}

const DetailProperty: React.FC<DetailPropertyProps> = ({ sto }) => {
  const history = useHistory();
  const { data, loading } = useInvestorAppDataQuery();
  const { t } = useTranslation();
  if (!sto || loading || !data) {
    return <Loading />;
  }
  const { title, fullDetails = '', details, images = [], documents = [] } = sto;

  const buy = () => {
    history.push(`/investor/buy-property/${sto.ID}`);
  };
  const { isContactTheSponsorFontSwitchEnabled, areSTOHostnamesEnabled: areHostNamesEnabled } =
    data.investorAppParameters;
  const pictureUrl =
    sto.ID > 0 && !areHostNamesEnabled
      ? `https://${sto.stolinkfull.substring(sto.stolinkfull.indexOf('.') + 1)}`
      : sto.stolinkfull;

  return (
    <div className="content">
      <Card>
        <CardHeader text="Property Details" imgSrc={AGENDA_ITEM} />
        <CardBody>
          <Row>
            <Col md={5}>
              {images.length ? (
                <PropertyGallery logo={`${pictureUrl}/img/stologo/${sto.logo}`} images={images} />
              ) : (
                <div className="mt-n5" />
              )}
              <PropertyDocuments documents={documents} />
              <div className="d-flex mt-4">
                <ContactCompany isContactTheSponsorFontSwitchEnabled={isContactTheSponsorFontSwitchEnabled} />
              </div>
            </Col>
            <Col md={7}>
              <Button wmin="80px" width="35%" className="m-2 text-nowrap" onClick={buy}>
                {t('detailPropertyButtonInvestInProperty')}
              </Button>
              <h1>{title}</h1>
              <p>{details}</p>
              <Markup content={fullDetails} />
              <DynamicContent meta={sto.meta} />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default DetailProperty;
