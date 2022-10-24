import React from 'react';
import {
  BuyAlertStatus,
  useFindInvestorDividendPayoutsQuery,
  useInvestorActivePropertiesQuery,
  useInvestorAppDataQuery,
  useInvestorBuyAlertsQuery,
  useInvestorPortfolioQuery,
  useMeQuery,
} from 'services/apollo';
import { BsSwal, Card, CardBody, Col, Loading, Row } from 'atoms';
import PortfolioSto from 'pages/my-portfolio/components/PortfolioSto';
import { CardHeader } from 'components/card-header/CardHeader';
import AlertItem from 'pages/my-portfolio/components/AlertItem';
import PortfolioOverview from 'pages/my-portfolio/components/PortfolioOverview';
import SUMMARY from 'assets/img/summary.png';
import { useTranslation } from 'react-i18next';
import MoonpayFirstAlert from 'pages/moonpay/components/MoonpayFirstAlert';
import { useHistory } from 'react-router-dom';
import Invoice from '../invoice/Invoice';
import PortfolioOverviewMarketspace from './components/PortfolioOverviewMarketspace';

const Portfolio: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useMeQuery();
  const { investor } = data?.investorUser || {};
  const { data: portfolio, loading: load1 } = useInvestorPortfolioQuery({
    variables: { _id: Number(investor?.ID), status: [BuyAlertStatus.Pending] },
    fetchPolicy: 'no-cache',
  });

  // TODO: refactor pollInterval to websocket
  const { data: investorAlerts, previousData: previousBuyAlerts } = useInvestorBuyAlertsQuery({
    variables: {
      status: [
        BuyAlertStatus.Pending,
        BuyAlertStatus.KycRequired,
        BuyAlertStatus.AccreditationRequired,
        BuyAlertStatus.PendingDocuments,
      ],
    },
    fetchPolicy: 'no-cache',
    pollInterval: 5000,
  });
  const { data: appData, loading: appDataLoading } = useInvestorAppDataQuery();
  const history = useHistory();

  const { data: activeProperty, loading: load2 } = useInvestorActivePropertiesQuery({ fetchPolicy: 'no-cache' });
  const { data: dividendPayouts, loading: load4 } = useFindInvestorDividendPayoutsQuery({
    fetchPolicy: 'no-cache',
  });

  if (load1 || load2 || load4 || appDataLoading || !portfolio || !activeProperty || !dividendPayouts || !appData) {
    return <Loading />;
  }

  const { investorActiveProperties } = activeProperty;
  const shares = portfolio?.investorShares;
  const investorDividendPayouts = dividendPayouts?.findInvestorDividendPayouts;
  const alerts = investorAlerts?.investorBuyAlerts;
  const previousAlerts = previousBuyAlerts?.investorBuyAlerts;
  const currencies = new Set(shares.map((e) => e.shareType?.currency.symbol));

  if ((previousAlerts?.length ?? 0) > (alerts?.length ?? 0)) {
    BsSwal.fire({
      title: t('Portfolio-PopUp-Title'),
      html: t('Portfolio-PopUp-Message'),
      icon: 'info',
    });
  }
  if (!shares || !alerts || !investorDividendPayouts || !currencies) {
    return <Loading />;
  }
  const totalBalances = new Array<{ symbol: string; amount: number }>();
  currencies.forEach((e) => totalBalances.push({ symbol: e ?? '', amount: 0 }));
  const sharesIds = new Set(shares.map((e) => e.stoID));
  const properties = investorActiveProperties?.filter((e) => sharesIds.has(e.ID));

  const { IsMoonpayEnabled: isMoonpayEnabled, IsMarketSpace: isMarketspaceEnabled } = appData.investorAppParameters;

  let paidDividends = 0;
  investorDividendPayouts?.forEach((payout) => {
    const payoutInterval = isMarketspaceEnabled
      ? new Date(parseInt(payout.lastUpdatedAt, 10)).getFullYear() === new Date().getFullYear()
      : new Date(parseInt(payout.lastUpdatedAt, 10)).getMonth() === new Date().getMonth();
    if (payout.status === 'completed' && payoutInterval) {
      paidDividends += payout.amount;
    }
  });
  let totalShares = 0;
  shares.forEach((share) => {
    totalShares += share.shares;
    totalBalances.forEach((balance) => {
      if (balance.symbol === share.shareType?.currency.symbol && share.shareType?.premiumValue != null)
        balance.amount += share.shares * share.shareType?.premiumValue;
    });
  });

  const moveToActiveProperty = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    history.push('active-properties');
  };
  const isInvoicingEnabled = appData?.investorAppParameters?.isInvoicingEnabled;
  const isInvestmentReturnCalculationEnabled = appData?.investorAppParameters?.isInvestmentReturnCalculationEnabled;
  const isSellBackEnabled = appData?.investorAppParameters?.isSellBackEnabled;
  const isMergingPaymentsSharesRequestsEnabled = appData?.investorAppParameters?.isMergingPaymentsSharesRequestsEnabled;
  const handleDisplayingInvoices = () => {
    if (isMergingPaymentsSharesRequestsEnabled) {
      return false;
    }
    if (isInvoicingEnabled) {
      return true;
    }
    return false;
  };
  return (
    <div className="content">
      {isInvestmentReturnCalculationEnabled ? (
        <PortfolioOverviewMarketspace totalBalances={totalBalances} yearlyDividends={paidDividends} shares={shares} />
      ) : (
        <PortfolioOverview
          totalShares={totalShares}
          totalBalances={totalBalances}
          monthlyDividend={paidDividends}
          shares={shares}
        />
      )}
      {alerts.length ? (
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader text={t('Portfolio-AlertItem-Title')} caption={t('Portfolio-AlertItem')} imgSrc={SUMMARY} />
              <CardBody className="mb-2">
                <Row className="text-muted">
                  <Col md={1}>
                    <label>{t('Portfolio-Transaction-Headers-Type')}</label>
                  </Col>
                  <Col md={2}>
                    <label>{t('Portfolio-Transaction-Headers-Date')}</label>
                  </Col>
                  <Col md={2}>
                    <label>{t('Portfolio-Transaction-Headers-Company-Project')}</label>
                  </Col>
                  <Col md={isMergingPaymentsSharesRequestsEnabled ? 1 : 2}>
                    <label>{t('Portfolio-Transaction-Headers-ShareType')}</label>
                  </Col>
                  {isMergingPaymentsSharesRequestsEnabled ? (
                    <>
                      <Col md={1}>
                        <label>{t('Portfolio-Transaction-Headers-Price-To-pay')}</label>
                      </Col>
                      <Col md={1}>
                        <label>{t('Portfolio-Transaction-Headers-Shares')}</label>
                      </Col>
                      <Col md={1}>
                        <label>{t('Portfolio-Transaction-Headers-Payment-Status')}</label>
                      </Col>
                    </>
                  ) : (
                    <Col md={1}>
                      <label>{t('Portfolio-Transaction-Headers-Shares')}</label>
                    </Col>
                  )}

                  <Col md={3} />
                </Row>
                {alerts.map(
                  (alert) =>
                    !alert.isHiddenForInvestor && (
                      <AlertItem
                        key={alert.ID}
                        alert={alert}
                        properties={properties}
                        appData={appData}
                        isMergingEnabled={isMergingPaymentsSharesRequestsEnabled}
                        isInvoicingEnabled={isInvoicingEnabled}
                      />
                    ),
                )}
                {isMoonpayEnabled && <MoonpayFirstAlert alerts={alerts} />}
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}
      {handleDisplayingInvoices() && <Invoice properties={properties} />}
      {properties.length ? (
        <Row>
          {properties.map((property) => (
            <Col md={12} key={property.ID}>
              <PortfolioSto
                property={property}
                isMarketSpace={isMarketspaceEnabled}
                shares={shares?.filter((share) => share.stoID === property.ID)}
                isSellBackEnabled={isSellBackEnabled}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Card>
          <CardBody>
            <Row style={{ textAlign: 'center' }}>
              <Col>{t('portfolioUnaffiliatedLabel')}</Col>
            </Row>
            <br />
            <Row style={{ textAlign: 'center' }}>
              <Col>
                {t('portfolioPleaseNavigateTo')}
                <a
                  href="/"
                  onClick={(e) => {
                    moveToActiveProperty(e);
                  }}
                >
                  <span> {t('ActiveProperties')} </span>
                </a>
                {t('portfolioBuyShares')}
              </Col>
            </Row>
            <br />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default Portfolio;
