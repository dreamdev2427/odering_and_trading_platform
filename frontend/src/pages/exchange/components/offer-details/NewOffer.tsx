import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import {
  useMeQuery,
  ExchangeType,
  GetExchangeOfferDetailDocument,
  useCreateNewOfferMutation,
  useGetExchangeNewOfferQuery,
  useGetInvestorPlatformBalanceQuery,
} from 'services/apollo';
import { ExchangeOfferDetailOrder } from 'services/apollo/exchange';

import { Button, Col, Input, Row, Label, Select, Loading, BsSwal } from 'atoms';
import useNewOfferState from './useNewOfferState';
import { FormGroup } from '../../../../atoms';

interface NewOfferProps {
  order: ExchangeOfferDetailOrder;
}

const NewOffer: React.FC<NewOfferProps> = ({ order }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const { data: meData } = useMeQuery({ fetchPolicy: 'network-only' });
  const { investor } = meData?.investorUser || {};

  const { state, empty, onChange, checkEmpty } = useNewOfferState(order.ID, order.atomicSwapAcceptable);
  const [price, setPrice] = useState(0);

  const [createNewOffer] = useCreateNewOfferMutation({
    refetchQueries: [{ query: GetExchangeOfferDetailDocument, variables: { orderID: order.ID } }],
  });
  const { loading, data } = useGetExchangeNewOfferQuery({
    variables: {
      currencyID: order.shareType.currency.ID,
      stoID: order.stoID,
      shareTypeID: order.shareType.ID,
    },
  });
  const { loading: loadingBalance, data: dataBalance } = useGetInvestorPlatformBalanceQuery({
    variables: { shareTypeID: order.shareType.ID },
  });

  useEffect(() => {
    onChange({ rateFrom: price * state.sharesPartial });
  }, [onChange, price, state.sharesPartial]);

  if (loading || loadingBalance || !data || !dataBalance) {
    return <Loading />;
  }

  const { investorBalance, getSharesWallets: wallets } = data;
  const { getSharesWallets, investorShare } = dataBalance;
  const [platformWallet] = getSharesWallets;
  const amount = investorBalance?.amount || 0;
  const platformAmount = (order.shareType.isBlockchain ? platformWallet?.shares : investorShare?.shares) || 0;

  const goBack = (): void => history.push(`/investor/trading`);

  const startNegotiation = (): void => {
    history.push(`/investor/price-negotiation/${order.ID}/${investor?.ID}`);
  };

  const handleSubmit = (): void => {
    if (checkEmpty()) {
      return;
    }
    createNewOffer({ variables: { offer: state } })
      .then(goBack)
      .catch((err) => {
        BsSwal.fire({
          icon: 'error',
          text: err.message,
        });
      });
  };

  const handleChange = (key: string): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
    return (e) => {
      // expect NaN
      const value = parseFloat(e.currentTarget.value) || 0;
      onChange({ [key]: value });
    };
  };

  if (!wallets.length && amount <= order.rateFrom) {
    if (order.atomicSwapAcceptable) {
      return <Label>{t('tradingComponentsOfferDetailsOffersCardNoWallet')}</Label>;
    }
    return (
      <p>
        {t('tradingComponentsOfferDetailsOffersCardInsufficientFunds')}
        <br />
        <b>
          {t('tradingComponentsOfferDetailsOffersCardRequiredFunds', {
            symbol: order.shareType.currency.symbol,
            rateFrom: order.rateFrom.toFixed(2),
            investorAmount: amount.toFixed(2),
          })}
        </b>
        <br />
        {t('tradingComponentsOfferDetailsOffersCardAdditionalFundsRequired')}
      </p>
    );
  }

  const renderBalance = () => {
    if (order.atomicSwapAcceptable) {
      return <></>;
    }

    return (
      <b className="d-block mb-1">
        {order.type === ExchangeType.Sell
          ? t('tradingComponentsOfferDetailsOffersCardNewOfferHeader', {
              symbol: order.shareType.currency.symbol,
              amount: amount.toFixed(2),
            })
          : t('tradingComponentsOfferDetailsOffersCardNewOfferHeader2', { amount: platformAmount })}
      </b>
    );
  };

  const renderWallets = () => {
    if (!order.atomicSwapAcceptable) {
      return <></>;
    }

    const options = wallets.map((item) => ({ value: item.publicKey, label: item.publicKey }));

    return (
      <Row>
        <Col>
          <Row>
            <Col md={3}>
              <Label>{t('tradingComponentsOfferDetailsOffersCardNewOfferWalletAddressSelector')}</Label>
            </Col>
            <Col md={6}>
              <Select
                class="form-control border-input"
                invalid={empty.includes('atomicBuyerPublicKey')}
                options={options}
                placeholder={t('tradingComponentsOfferDetailsOffersCardNewOfferSelectWallet')}
                value={{ value: state.atomicBuyerPublicKey, label: state.atomicBuyerPublicKey }}
                onChange={(option: { value: string; label: string }) =>
                  onChange({ atomicBuyerPublicKey: option.value })
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  return (
    <div className="content">
      <>
        {renderBalance()}
        <Row>
          <Col xs="auto">
            <FormGroup>
              <Label>
                {t('tradingComponentsOfferDetailsTradeCardOfferedShareCount')}
                {t(`tradingComponentsOfferDetailsBuyOrSellLabelComponent_${order.type}`)}
              </Label>
              <Input
                invalid={empty.includes('sharesPartial')}
                onChange={handleChange('sharesPartial')}
                value={state.sharesPartial}
              />
            </FormGroup>
          </Col>
          <Col xs="auto">
            <FormGroup>
              <Label>{t('tradingComponentsOfferDetailsOffersCardOfferedPriceLabel')}</Label>
              <Input
                invalid={empty.includes('rateFrom')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(parseFloat(e.currentTarget.value) || 0)}
                value={price}
              />
            </FormGroup>
          </Col>
          <Col xs="auto" className="justify-content-center d-flex flex-column">
            <h4 className="m-0">
              {order.atomicSwapAcceptable
                ? t('tradingComponentsOrderDetailsUSDCLabel')
                : order.shareType.currency.symbol}{' '}
              {state.rateFrom}
            </h4>
          </Col>
        </Row>
        {renderWallets()}
        <Row>
          <Col md={3}>
            <Button size="sm" onClick={handleSubmit}>
              {t('tradingComponentsOfferDetailsOffersCardNewOfferSubmitOfferButton')}
            </Button>
          </Col>
          <Col md={3}>
            <Button size="sm" onClick={startNegotiation}>
              {t('tradingComponentsOfferDetailsOffersCardNewOfferStartNegotiationButton')}
            </Button>
          </Col>
          <Col md={3}>
            <Button size="sm" onClick={goBack}>
              {t('tradingComponentsOfferDetailsOffersCardNewOfferCancelButton')}
            </Button>
          </Col>
        </Row>
      </>
    </div>
  );
};

export default NewOffer;
