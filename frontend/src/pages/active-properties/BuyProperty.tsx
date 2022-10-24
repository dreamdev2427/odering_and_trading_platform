import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';

import {
  useInvestorBuyPropertyQuery,
  useFetchFeesQuery,
  FeeBeneficiary,
  FeeType,
  useInvestorAppDataQuery,
} from 'services/apollo';

import { Button, Card, CardBody, Col, Label, Loading, Row } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import AccountItem from 'pages/wallet/components/AccountItem';
import BuyPropertyShare from 'pages/active-properties/BuyPropertyShare';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BuyPropertyShareMarketspace from './BuyPropertyShare-Marketspace';

const DetailProperty: React.FC = () => {
  const [loadingRequest, setLoadingRequest] = useState<boolean>(false);
  const { data: appData, loading: appDataLoad } = useInvestorAppDataQuery();
  const { t } = useTranslation();
  const history = useHistory();
  const params = useParams<{ _id: string }>();
  const _id = parseInt(params._id, 10);
  const { data, loading } = useInvestorBuyPropertyQuery({
    variables: { _id },
    fetchPolicy: 'network-only',
  });
  const { data: feeData, loading: feeLoading } = useFetchFeesQuery({
    variables: { stoID: _id, beneficiary: FeeBeneficiary.Platform, type: FeeType.BuyShares },
    fetchPolicy: 'network-only',
  });

  if (
    loading ||
    feeLoading ||
    loadingRequest ||
    appDataLoad ||
    !feeData?.fetchFees ||
    !data?.investorDetailProperty ||
    !data?.investorBalances ||
    !data?.findShareTypes ||
    !appData?.investorAppParameters
  ) {
    return <Loading />;
  }

  const {
    investorDetailProperty: { title, details, picture },
    investorBalances: accounts,
    findShareTypes: types,
  } = data;
  const { fetchFees: fees } = feeData;
  const { IsMarketSpace: isMarketSpace, IsInternalWalletDisabled } = appData.investorAppParameters;

  return (
    <div className="content">
      <Card>
        <CardHeader
          text={t('BuyProperty-card-header-text')}
          caption={t('BuyProperty-card-caption')}
          imgSrc="/img/buy.png"
        />
        <CardBody>
          <Row>
            <Col md={4} style={{ maxHeight: '300px' }}>
              <Img src={picture} />
            </Col>
            <Col md={8}>
              <h1>{title}</h1>
              <p>{details}</p>
            </Col>
          </Row>
          <Row>
            {isMarketSpace || IsInternalWalletDisabled ? (
              <Col md={4}>
                {
                  // empty
                }
              </Col>
            ) : (
              <Col md={4}>
                <h5 className="mt-3">
                  <Label>{t('BuyProperty-balancesTitle')}</Label>
                </h5>
                {accounts.length > 0 ? (
                  <>
                    <label>{t('BuyProperty-currentBalanceLabel')}</label>
                    {accounts.map((acc) => (
                      <AccountItem key={acc.ID} account={acc} />
                    ))}
                  </>
                ) : (
                  <label>{t('BuyProperty-noBalance')}</label>
                )}
                <Label>{t('BuyProperty-depositFundsLabel')} </Label>
                <Button className="mb-2" onClick={() => history.push('/investor/wallet')}>
                  {t('channelItemDepositFunds')}
                </Button>
              </Col>
            )}
            <Col md={8}>
              {types.map((item) => (
                <React.Fragment key={item.ID}>
                  <h4>
                    <Label>
                      {t('BuyProperty-shareClassTitle')} {item.title}
                    </Label>
                  </h4>
                  {isMarketSpace ? (
                    <BuyPropertyShareMarketspace
                      sto={_id}
                      share={item}
                      setLoadingRequest={setLoadingRequest}
                      appData={appData.investorAppParameters}
                    />
                  ) : (
                    <BuyPropertyShare
                      sto={_id}
                      share={item}
                      hasFunds={accounts.length > 0}
                      fee={fees}
                      setLoadingRequest={setLoadingRequest}
                      appData={appData.investorAppParameters}
                    />
                  )}

                  <hr />
                </React.Fragment>
              ))}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default DetailProperty;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;
