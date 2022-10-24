import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import {
  ActiveProperty as IActiveProperty,
  BuyAlertStatus,
  KycRequirementStep,
  useInvestorAppDataQuery,
  useInvestorBuyAlertsQuery,
  useMeQuery,
} from 'services/apollo';

import { CardH4 } from 'components/card-header/CardHeader';
import { Button, Card, CardBody, Loading, Row, BsSwal, CenteredCol } from 'atoms';
import { useTranslation } from 'react-i18next';

const ActiveProperty: React.FC<{ props: IActiveProperty; isClosedOffering: boolean }> = ({
  props,
  isClosedOffering,
}) => {
  const { ID, title, details, picture, isBuyButtonEnabled } = props;
  const history = useHistory();
  const { data, loading } = useMeQuery({ fetchPolicy: 'network-only' });
  const { data: appData } = useInvestorAppDataQuery();
  const { t } = useTranslation();
  const { data: Alerts } = useInvestorBuyAlertsQuery({
    variables: {
      status: [
        BuyAlertStatus.Pending,
        BuyAlertStatus.KycRequired,
        BuyAlertStatus.AccreditationRequired,
        BuyAlertStatus.PendingDocuments,
      ],
    },
    fetchPolicy: 'no-cache',
  });

  if (loading || !data || !appData || !Alerts) {
    return <Loading />;
  }

  const alertsCount = Alerts.investorBuyAlerts?.filter((share) => share.stoID === ID).length || 0;

  const view = () => {
    history.push(`/investor/detail-property/${ID}`);
  };
  const { KycRequirementStep: kycRequirementStep, IsMarketSpace: isMs } = appData.investorAppParameters;

  const buy = () => {
    const isNoneKYC = data.investorUser?.investorSto && data.investorUser?.investorSto.isKYC === 0;
    if (kycRequirementStep === KycRequirementStep.OnPurchase && isNoneKYC) {
      BsSwal.fire({
        title: t('ActiveProperty-BsSwal-NoKYC'),
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: t('ActiveProperty-BsSwal-Confirm'),
        cancelButtonText: t('ActiveProperty-BsSwal-Cancel'),
      }).then((result) => {
        if (result.isConfirmed) {
          history.push(`/investor/buy-property/${ID}`);
        }
      });
    } else if (alertsCount && Alerts.investorBuyAlerts?.filter((alert) => !alert.isBuySharesSigned).length) {
      BsSwal.fire({
        icon: 'info',
        title: t('ActiveProperty-BsSwal-OngoingTransaction-NotSigned-Title'),
        text: t('ActiveProperty-BsSwal-OngoingTransaction-NotSigned-Text'),
        timer: 8000,
        didClose: () => {
          history.push(
            `/investor/share-purchase-signing/${Alerts.investorBuyAlerts?.find((alert) => alert.stoID === ID)?.ID}`,
          );
        },
      });
    } else if (alertsCount) {
      BsSwal.fire({
        icon: 'info',
        title: t('ActiveProperty-BsSwal-OngoingTransaction-Signed-Title'),
        text: t('ActiveProperty-BsSwal-OngoingTransaction-Signed-Text'),
        timer: 8000,
        didClose: () => {
          history.push(`/investor/Portfolio`);
        },
      });
    } else {
      history.push(`/investor/buy-property/${ID}`);
    }
  };
  console.log(alertsCount);
  console.log(typeof alertsCount);
  console.log(alertsCount > 0);
  return (
    <Card className="pl-4 pr-4 pt-2 pb-2 m-auto" width="100%" wmax="480px" height="100%">
      <CardBody className=" pr-0 d-flex flex-column justify-content-between">
        <ImgCard className="w-100 pb-2" alt={title} src={picture} />
        <CardH4 className="mt-2">{title}</CardH4>
        {isClosedOffering && isMs ? null : (
          <div className="overflow-auto" style={{ height: '200px', textOverflow: 'ellipsis' }}>
            {details}
          </div>
        )}
        <Row className="justify-content-center">
          <CenteredCol md={6} className="justify-content-center">
            <Button size="sm" wmin="125px" style={{ width: '100%', wordWrap: 'normal' }} className="m-2" onClick={view}>
              {t('ActiveProperty-ViewDetails')}
            </Button>
          </CenteredCol>
          {isBuyButtonEnabled ? (
            <CenteredCol md={6} className="justify-content-center">
              <Button size="sm" wmin="80px" style={{ width: '100%', wordWrap: 'normal' }} className="m-2" onClick={buy}>
                {alertsCount > 0 ? t('ActiveProperty-Resume-Purchase') : t('ActiveProperty-Buy')}
              </Button>
            </CenteredCol>
          ) : null}
        </Row>
      </CardBody>
    </Card>
  );
};

export default ActiveProperty;

const ImgCard = styled.img`
  min-height: 180px !important;
  max-height: 180px !important;
  padding-bottom: 10px;
  object-fit: contain;
  text-align: justify;
  margin: 0;
`;
