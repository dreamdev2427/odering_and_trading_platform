import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useScrollBlock } from 'hooks';
import {
  useInvestorBuyAlertMutation,
  useInvestorInvestingEntitiesQuery,
  useGetSharesWalletsQuery,
  BuyAlertStatus,
  useInvestorBuyAlertsQuery,
} from 'services/apollo';
import { InvestorBuyPropertyShareType } from 'services/apollo/multisto';
import { FetchFees } from 'services/apollo/fee';

import { BsSwal, Button, Col, Input, Row, Select, Loading } from 'atoms';
import { AppData } from 'services/apollo/core';
import PopoverHover from 'components/PopoverHover';
import { CalculateShareFeesAndTotal, stripToNumber } from 'lib/utils';
import { tArgs } from 'services/core/helpers';
import FeeDetails from './components/FeeDetails';

interface PropertyShareProps {
  sto: number;
  share: InvestorBuyPropertyShareType;
  hasFunds: boolean;
  fee: FetchFees[];
  setLoadingRequest: (isActive: boolean) => void;
  appData: AppData;
}

const BuyPropertyShare: React.FC<PropertyShareProps> = (props) => {
  const { sto, share, hasFunds, fee, setLoadingRequest, appData } = props;
  const [value, setValue] = useState<number>(share.minimumSharesToBuyByInvestor);
  const [totalPrice, setTotalPrice] = useState<number>(share.totalPrice * share.minimumSharesToBuyByInvestor);
  const [feePrice, setFeePrice] = useState<number>(0);
  const [text, setText] = useState<string>('');
  const [publicKey, setPublicKey] = useState<string>('');
  const { i18n, t } = useTranslation();

  const [buy] = useInvestorBuyAlertMutation();

  const history = useHistory();
  const { data, loading } = useInvestorInvestingEntitiesQuery();

  const { data: whiteListedWallets } = useGetSharesWalletsQuery({ variables: { shareTypeID: share.ID } });
  const { data: Alerts } = useInvestorBuyAlertsQuery({
    variables: { status: [BuyAlertStatus.Pending, BuyAlertStatus.KycRequired, BuyAlertStatus.AccreditationRequired] },
    fetchPolicy: 'no-cache',
  });
  const alertsCount = Alerts?.investorBuyAlerts?.find((item) => item.shareTypeID === share.ID && !item.isSellRequest);
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = stripToNumber(share.blockchaindecimals, e);
    setValue(amount);
    if (fee.length > 0 && amount) {
      const calculateFeesAndTotal = CalculateShareFeesAndTotal(fee, share.totalPrice, amount, 'buy');
      setFeePrice(calculateFeesAndTotal.fees);
      setTotalPrice(calculateFeesAndTotal.total);
    } else {
      setTotalPrice(share.totalPrice * amount);
    }
  };

  const { investorInvestingEntities: entities } = data || {};
  const [blockScroll, allowScroll] = useScrollBlock();
  const {
    doAutomaticPurchase: isAutomaticPurchase,
    IsInternalWalletDisabled: isInternalWalletDisabled,
    isInternalTokenizedPurchaseEnabled,
  } = appData;

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const isWalletDropDown = share.isBlockchain && share.channelIDForAutoPayments !== -1 && isAutomaticPurchase;

  const checkIfBuyIsValid = async () => {
    setLoadingRequest(true);
    if (!hasFunds && !isInternalWalletDisabled) {
      return BsSwal.fire({
        title: t('BuyPropertyShare-missingFundsInWallet-popUp-title'),
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: t('BuyPropertyShare-fundWallet-popUp-title'),
        cancelButtonText: t('Cancel'),
      }).then((result) => {
        setLoadingRequest(false);
        if (result.isConfirmed) {
          history.push('/investor/wallet');
        }
      });
    }
    if (!value) {
      return BsSwal.fire({
        title: t('BuyPropertyShare-missingSharesNumber-popUp-title'),
        icon: 'error',
      });
    }
    if (!publicKey.length && isWalletDropDown) {
      return BsSwal.fire({
        title: t('BuyPropertyShare-popUp-specifyWallet'),
        icon: 'error',
      });
    }
    return sendBuyRequest();
  };

  const sendBuyRequest = async () => {
    try {
      const result = await buy({
        variables: {
          query: {
            stoID: Number(sto),
            shareTypeID: share.ID,
            shares: value,
            details: text,
            publicKey,
            status: BuyAlertStatus.PendingDocuments,
          },
        },
      });
      if (result.data?.investorBuyAlert) {
        BsSwal.fire({
          title: t('BuyPropertyShare-success-popUp-title'),
          icon: 'success',
        }).then(() => {
          history.push(`/investor/share-purchase-signing/${result?.data?.investorBuyAlert}`);
        });
      }
      return true;
    } catch (err) {
      const tObj = tArgs((err as Error).message);
      console.log(JSON.stringify(err, null, 4));
      console.log(JSON.stringify(tObj, null, 4));
      BsSwal.fire({
        title: t(tObj.key, tObj.args),
        icon: 'error',
      }).then((result) => {
        setLoadingRequest(false);
        if (result.isConfirmed) {
          history.push(`/investor/buy-property/${Number(sto)}`);
        }
      });
      return false;
    }
  };

  const onChangePublicKey = (key: { value: string }) => {
    setPublicKey(key.value);
  };

  const redirectToBuyRequest = () => {
    history.push('/investor/Portfolio');
  };

  if (loading || !entities || !whiteListedWallets) {
    return <Loading />;
  }

  const walletOptions = whiteListedWallets.getSharesWallets
    .filter((e) => !e.isBlocked)
    .map((e) => ({
      label: e.publicKey,
      value: e.publicKey,
    }));
  if (isInternalTokenizedPurchaseEnabled) {
    walletOptions?.unshift({ label: 'Internal', value: '-' });
  }

  const selectOptions = entities.map((e) => ({
    value: e.ID,
    label: e.name,
  }));
  selectOptions.push({ value: -1, label: t('BuyProperty-add-new-entity-select-option') });
  return (
    <>
      <Row>
        <Col md={4}>
          <p>{t('BuyPropertyShare-SharesAvailable')}</p>
        </Col>
        <Col md={8}>
          <p>{(share.availableShare ?? 0).toLocaleString(i18n.language)}</p>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <p>{t('BuyPropertyShare-price/share')}</p>
        </Col>
        <Col md={8}>
          <p>
            {share.currency.symbol} {(share.totalPrice ?? 0).toLocaleString(i18n.language)}
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <PopoverHover
            label={t('BuyPropertyShare-TransactionFee')}
            title={t('Fees Breakdown')}
            target={<i className="ti-help-alt" />}
            body={<FeeDetails fees={fee} currencySymbol={share.currency.symbol} />}
          />
        </Col>
        <Col md={8}>
          <p>
            {share.currency.symbol} {feePrice.toLocaleString(i18n.language)}
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <p>{t('BuyPropertyShare-minimumShareQuantityLabel')}</p>
        </Col>
        <Col md={8}>
          <p>{(share.minimumSharesToBuyByInvestor ?? 0).toLocaleString(i18n.language)}</p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={4}>
          <p>{t('BuyPropertyShare-numberOfSharesToBuy')}</p>
        </Col>
        <Col md={4}>
          <Input
            type="number"
            min={0}
            step={1}
            onChange={changeValue}
            onFocus={blockScroll}
            onBlur={allowScroll}
            value={value || ''}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={4}>
          <p>{t('BuyPropertyShare-adminMessage')}</p>
        </Col>
        <Col md={8}>
          <Input type="textarea" rows={3} onChange={changeText} value={text} />
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <p>{t('BuyPropertyShare-totalPrice')}</p>
        </Col>
        <Col md={4}>
          <p>
            {share.currency.symbol}{' '}
            {(totalPrice ?? 0).toLocaleString(i18n.language, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </p>
        </Col>
      </Row>
      {isWalletDropDown ? (
        <>
          <Row>
            <Col md={4}>
              <div className="mt-3">{t('Investor Wallets')}</div>
            </Col>
            <Col>
              <Select options={walletOptions} onChange={onChangePublicKey} />
            </Col>
          </Row>
        </>
      ) : null}
      <Row>
        <Col className="ml-auto" md={5}>
          {alertsCount ? (
            <Button onClick={redirectToBuyRequest}>{t('ActiveProperty-Resume-Purchase')}</Button>
          ) : (
            <Button onClick={checkIfBuyIsValid}>{t('BuyProperty-send-button')}</Button>
          )}
        </Col>
      </Row>
    </>
  );
};

export default BuyPropertyShare;
