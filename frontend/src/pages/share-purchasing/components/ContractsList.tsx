import React from 'react';

import { BsSwal, Button, Card, CardBody, Col, Row, CenteredCol } from 'atoms';
import { CardH4, CardHeader } from 'components/card-header/CardHeader';
import SUMMARY from 'assets/img/summary.png';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  BuyAlertStatus,
  InvestorAppDataQuery,
  KycProviders,
  SharePurchaseDocumentsQuery,
  useInvestorBuyAlertsQuery,
} from 'services/apollo';
import { getRedirectUrl } from 'layouts/Root';
import { accreditationProcess } from 'lib/routing/route-sets/verify-routes';

interface ContractsListProps {
  accreddRedirectLink: string;
  skipDocumentSignScreen: boolean;
  isMarketspace: boolean;
  kycProvider: KycProviders;
  sharePurchaseID: number;
  sharePurchaseDocuments: SharePurchaseDocumentsQuery['sharePurchaseDocuments'][0][];
  appData: InvestorAppDataQuery;
}

const ContractsList: React.FC<ContractsListProps> = (props) => {
  const {
    accreddRedirectLink,
    skipDocumentSignScreen,
    isMarketspace,
    kycProvider,
    sharePurchaseID,
    sharePurchaseDocuments,
    appData,
  } = props;
  const history = useHistory();
  const { t } = useTranslation();
  const { isAllDocumentsSignedPopUpEnabled } = appData.investorAppParameters;

  useInvestorBuyAlertsQuery({
    variables: {
      status: [
        BuyAlertStatus.Accepted,
        BuyAlertStatus.Pending,
        BuyAlertStatus.KycRequired,
        BuyAlertStatus.AccreditationRequired,
      ],
    },
    fetchPolicy: 'network-only',
    onCompleted: (query) => {
      const buyAlert = query.investorBuyAlerts?.find((req) => req.ID === sharePurchaseID && req.isBuySharesSigned);
      if (buyAlert) {
        if (buyAlert.status === BuyAlertStatus.KycRequired) {
          BsSwal.fire({
            icon: 'info',
            title: `${t('AlertItem-PopUp-AllSigned')} | ${t('AlertItem-status-KycRequired')}`,
          }).then(() => {
            history.push(getRedirectUrl(kycProvider));
          });
        } else if (buyAlert.status === BuyAlertStatus.AccreditationRequired) {
          if (isMarketspace) {
            handleClick();
          } else {
            BsSwal.fire({
              icon: 'info',
              title: `${t('AlertItem-PopUp-AllSigned')} | ${t('AlertItem-status-AccreditationRequired')}`,
            }).then(() => history.push(accreditationProcess.path));
          }
        } else if (isAllDocumentsSignedPopUpEnabled) {
          BsSwal.fire({
            icon: 'success',
            title: t('AletItem-PopUp-Alternate-AllSigned'),
            confirmButtonText: t('AletItem-PopUp-Alternate-confirm'),
          }).then(() => {
            history.push(`/investor/Portfolio`);
          });
        } else {
          history.push(`/investor/Portfolio`);
        }
      }
    },
  });

  const handleClick = () => {
    BsSwal.fire({
      title: t('AlertItem-marketspace-PopUp-title'),
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: t('AlertItem-marketspace-PopUp-confirm'),
      cancelButtonText: t('AlertItem-marketspace-PopUp-cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        history.push(`/investor/Portfolio`);
        goToAccredd();
      }
    });
  };

  const goToAccredd = () => {
    const newWindow = window.open(accreddRedirectLink, '_blank', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  const navigateToContract = (documentID: string | number) => {
    history.push(`/investor/share-purchase-contract-mode/${sharePurchaseID}/${documentID}`);
  };

  if (skipDocumentSignScreen) {
    const nextToSign = sharePurchaseDocuments.find((d) => d.status !== 3);
    if (nextToSign?.document.ID) {
      navigateToContract(nextToSign?.document.ID);
    }
  }

  if (sharePurchaseDocuments.length === 0) {
    history.push(`/investor/Portfolio`);
  }

  return (
    <div className="content">
      <Row>
        <Col md={12}>
          <Card>
            <CardHeader
              text={t('sharePurchaseSigning-CardHeader')}
              caption={t('sharePurchaseSigning-CardBody')}
              imgSrc={SUMMARY}
            />
            <CardBody className="mb-2">
              {sharePurchaseDocuments.map((sharePurchase) => (
                <Row key={sharePurchase.document.ID}>
                  <Col>
                    <Row className="mt-5">
                      <Col md={1}>
                        <img alt="contracts" width="35px;" src="/img/contracts.png" />
                      </Col>
                      <CenteredCol md={10}>
                        <CardH4>{sharePurchase.document.title}</CardH4>
                      </CenteredCol>
                    </Row>
                    <Row>
                      <CenteredCol md={{ size: 12, offset: 1 }}>
                        {sharePurchase.requireOnce ? (
                          <span>{t('sharePurchaseSigning-ContractRequiredOnce')}</span>
                        ) : (
                          <span>{t('sharePurchaseSigning-ContractRequiredAlways')}</span>
                        )}
                      </CenteredCol>
                    </Row>
                    <Row>
                      <CenteredCol md={{ size: 2, offset: 1 }}>
                        {(sharePurchase.status ?? 0) > 1 ? (
                          <span style={{ color: 'green' }}>
                            {sharePurchase.requireOnce ? (
                              <>{t('sharePurchaseSigning-ContractRequiredOnce-NotSigned')}</>
                            ) : (
                              <>{t('sharePurchaseSigning-ContractRequiredAlways-NotSigned')}</>
                            )}
                          </span>
                        ) : (
                          <Button size="sm" onClick={() => navigateToContract(sharePurchase.document.ID)}>
                            {t('Sign Now')}
                          </Button>
                        )}
                      </CenteredCol>
                    </Row>
                  </Col>
                </Row>
              ))}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ContractsList;

export {};
