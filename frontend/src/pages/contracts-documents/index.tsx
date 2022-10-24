import React from 'react';
import { useTranslation } from 'react-i18next';

import { useContractsPageQuery } from 'services/apollo';

import { CardHeader } from 'components/card-header/CardHeader';
import { Card, CardBody, Col, Loading, Row } from 'atoms';
import SignedOffer from './offered-contracts/components/SignedOffer';
import { OfferedContracts } from './offered-contracts/OfferedContract';

const ContractsDocuments: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading } = useContractsPageQuery();
  if (loading || !data) return <Loading />;
  return (
    <div className="content">
      <OfferedContracts />
      <Card>
        <CardHeader text={t('Signed-Contracts')} imgSrc="/img/contracts.png" />
        <CardBody className="mb-2">
          {data.submittedDocuments.length === 0 ? (
            <>
              <br />
              <label>{t('No-Records-Found')}</label>
            </>
          ) : (
            <>
              <Row className="h6 text-capitalize">
                <Col md={5}>{t('contract-documents-Index-thead-title')}</Col>
                <Col md={2}>{t('contract-documents-Index-thead-date')}</Col>
                <Col md={2}>{t('contract-documents-Index-thead-provider')}</Col>
                <Col md={3}>{t('contract-documents-Index-thead-buttons')}</Col>
              </Row>
              {data.submittedDocuments.map((signedDoc) => (
                <SignedOffer
                  key={signedDoc.ID}
                  ID={signedDoc.ID}
                  title={signedDoc.document.title}
                  status={signedDoc.status}
                  date={signedDoc.signature?.modified}
                  docuSign={signedDoc.document.docusignDocumentID}
                  helloSign={signedDoc.document.helloSignDocumentID}
                  filePath={signedDoc.signatureFilePath}
                />
              ))}
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ContractsDocuments;
