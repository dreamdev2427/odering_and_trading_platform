import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useScrollBlock } from 'hooks';
import {
  InvestingEntity,
  useInvestorInvestingEntitiesQuery,
  useInvestorBuyAlertMarketSpaceMutation,
  useGetSharesWalletsQuery,
  BuyAlertStatus,
} from 'services/apollo';
import { InvestorBuyPropertyShareType } from 'services/apollo/multisto';

import { BsSwal, Button, Col, Input, Row, Select, Loading, FontAweIcon } from 'atoms';
import { AppData } from 'services/apollo/core';

interface PropertyShareProps {
  sto: number;
  share: InvestorBuyPropertyShareType;
  setLoadingRequest: (isActive: boolean) => void;
  appData: AppData;
}

const BuyPropertyShareMarketspace: React.FC<PropertyShareProps> = (props) => {
  const { sto, share, setLoadingRequest, appData } = props;
  const [value, setValue] = useState<number>(share.minimumSharesToBuyByInvestor);
  const [totalPrice, setTotalPrice] = useState<number>(share.totalPrice * share.minimumSharesToBuyByInvestor);
  const [text, setText] = useState<string>('');
  const [entity, setEntity] = useState<InvestingEntity>();
  const [publicKey, setPublicKey] = useState<string>('-');
  const [loadLatestEntity, setLoadLatestEntity] = useState<boolean>(false);
  const { i18n, t } = useTranslation();

  const [buyMarketSpace] = useInvestorBuyAlertMarketSpaceMutation();

  const history = useHistory();
  const location = useLocation<{ shareId: number; value: number; text: string; loadLatestEntity: boolean }>();
  const { _id: id } = useParams<{ _id: string }>();
  const { data, loading } = useInvestorInvestingEntitiesQuery();

  const { data: whiteListedWallets } = useGetSharesWalletsQuery({ variables: { shareTypeID: share.ID } });

  const updateTotal = useCallback(
    (newInvestmentOffer: number) => {
      const amount = Math.max(Math.floor(newInvestmentOffer / share.totalPrice), share.minimumSharesToBuyByInvestor);
      setValue(amount);
      setTotalPrice(Math.max(newInvestmentOffer, share.minimumSharesToBuyByInvestor));
    },
    [share.totalPrice, share.minimumSharesToBuyByInvestor],
  );

  const { investorInvestingEntities: entities } = data || {};
  useEffect(() => {
    if (share.minimumSharesToBuyByInvestor > 0) {
      setValue(share.minimumSharesToBuyByInvestor);
    }
    if (entities && entities?.length > 0) {
      // check if this is a redirect from the create entity form
      if (loadLatestEntity) {
        // select last entity
        setEntity(entities[entities.length - 1]);
      } else {
        // else resume normal operation
        setEntity(entities[0]);
      }
    }
  }, [share.minimumSharesToBuyByInvestor, setValue, entities, loadLatestEntity]);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalPrice(parseFloat(e.currentTarget.value));
  };
  const [blockScroll, allowScroll] = useScrollBlock();

  const { doAutomaticPurchase: isAutomaticPurchase } = appData;

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const checkIfBuyIsValid = async () => {
    setLoadingRequest(true);
    if (entities?.length === 0 || !entity) {
      return BsSwal.fire({
        title: t('BuyPropertyShare-missingInvestingEntity-popUp-title'),
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: t('BuyPropertyShare-createNewEntity-popUp-title'),
        cancelButtonText: t('Cancel'),
      }).then((result) => {
        setLoadingRequest(false);
        if (result.isConfirmed) {
          history.push({
            pathname: '/investor/investor-ownership',
            state: {
              value,
              text,
              shareId: share.ID,
              id,
            },
          });
        }
      });
    }
    if (!value) {
      return BsSwal.fire({
        title: t('BuyPropertyShare-missingSharesNumber-popUp-title'),
        icon: 'error',
      });
    }
    return sendBuyRequest();
  };

  if (history.location.state !== undefined) {
    if (location?.state?.shareId === share.ID) {
      setTotalPrice(location.state.value * share.totalPrice);
      setText(location.state.text);
      setLoadLatestEntity(location.state.loadLatestEntity);
      window.history.replaceState(undefined, '');
      history.location.state = null;
    }
  }

  const sendBuyRequest = async () => {
    try {
      const result = await buyMarketSpace({
        variables: {
          data: {
            stoID: Number(sto),
            shareTypeID: share.ID,
            shares: value,
            details: text,
            entityID: Number(entity?.ID),
            publicKey,
            status: BuyAlertStatus.PendingDocuments,
          },
        },
      });
      if (result.data?.investorBuyAlertMarketSpace) {
        BsSwal.fire({
          title: t('BuyPropertyShare-success-popUp-title'),
          icon: 'success',
        }).then(() => {
          history.push(`/investor/share-purchase-signing/${result?.data?.investorBuyAlertMarketSpace}`);
        });
      }
      return true;
    } catch (err) {
      const errorComponents: string[] = (err as Error)?.message.split('/');
      BsSwal.fire({
        title: t(errorComponents[0]),
        icon: 'error',
        confirmButtonText: errorComponents.length > 1 ? t('BuyPropertyShare-popUp-continuePurchase') : t('ok'),
        cancelButtonText: t('Cancel'),
      }).then((result) => {
        setLoadingRequest(false);
        if (result.isConfirmed && errorComponents.length > 1) {
          history.push(`/investor/share-purchase-signing/${errorComponents[1]?.split('=')[1]}`);
        } else {
          history.push(`/investor/buy-property/${Number(sto)}`);
        }
      });
      return false;
    }
  };

  const onChangeEntity = (ent: { value: number }) => {
    if (!ent.value) return;
    if (ent.value === -1) {
      history.push({
        pathname: '/investor/investor-ownership',
        state: {
          value,
          text,
          shareId: share.ID,
          id,
          loadLatestEntity: true,
        },
      });
      return;
    }
    setEntity(entities?.find((e) => ent.value === e.ID));
  };

  const onChangePublicKey = (key: { value: string }) => {
    setPublicKey(key.value);
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
  walletOptions?.unshift({ label: 'Off-chain', value: '-' });

  const selectOptions = entities.map((e) => ({
    value: e.ID,
    label: e.name,
  }));
  selectOptions.push({ value: -1, label: t('BuyProperty-add-new-entity-select-option') });

  const minimumInvestmentAmount = share.minimumSharesToBuyByInvestor * share.totalPrice ?? 0;
  const handleOnBlur = () => {
    allowScroll();
    const amount = Math.max(Math.floor(totalPrice / share.totalPrice), share.minimumSharesToBuyByInvestor);
    setValue(amount);
    updateTotal(amount * share.totalPrice);
  };

  return (
    <>
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
          <p>{t('BuyPropertyShare-minimumInvestment')}</p>
        </Col>
        <Col md={8}>
          <p>
            {share.currency.symbol} {minimumInvestmentAmount.toLocaleString(i18n.language)}
          </p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={4}>
          <p>{t('BuyPropertyShare-investmentAmount')}</p>
        </Col>
        <Col md={4}>
          <Input
            type="number"
            min={minimumInvestmentAmount}
            step={share.totalPrice}
            onChange={changeValue}
            onFocus={blockScroll}
            onBlur={handleOnBlur}
            value={totalPrice}
          />
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <div className="mt-3">{t('BuyProperty-investorEntityLabel')}</div>
        </Col>
        <Col>
          {entities.length === 0 ? (
            <Button
              outline
              size="sm"
              color="primary"
              className="rounded-pill"
              onClick={() => {
                history.push({
                  pathname: '/investor/investor-ownership',
                  state: {
                    value,
                    text,
                    shareId: share.ID,
                    id,
                    entity,
                  },
                });
              }}
            >
              <FontAweIcon icon="file" /> {t('entityManagementAddNewEntity')}
            </Button>
          ) : (
            <Select
              name="InvestorEntity"
              style={{ zIndex: '100' }}
              options={selectOptions}
              value={{
                value: entity?.ID || '',
                label: entity?.name || '',
              }}
              onChange={onChangeEntity}
            />
          )}
        </Col>
      </Row>
      {share.isBlockchain && share.channelIDForAutoPayments !== -1 && isAutomaticPurchase ? (
        <Row>
          <Col md={4}>
            <div className="mt-3">{t('Investor Wallets')}</div>
          </Col>
          <Col>
            <Select options={walletOptions} onChange={onChangePublicKey} />
          </Col>
        </Row>
      ) : null}
      <br />
      <Row className="mb-4">
        <Col md={4}>
          <p>{t('BuyPropertyShare-adminMessage')}</p>
        </Col>
        <Col md={8}>
          <Input type="textarea" rows={3} onChange={changeText} value={text} />
        </Col>
      </Row>
      <Row>
        <Col className="ml-auto" md={5}>
          <Button onClick={checkIfBuyIsValid}>{t('BuyProperty-send-button')}</Button>
        </Col>
      </Row>
    </>
  );
};

export default BuyPropertyShareMarketspace;
