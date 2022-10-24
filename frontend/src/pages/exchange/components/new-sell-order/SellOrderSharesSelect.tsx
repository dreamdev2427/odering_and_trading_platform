import React from 'react';
import { useTranslation } from 'react-i18next';

import { useGetSharesWalletsQuery, useFetchFeesQuery, FeeBeneficiary, FeeType } from 'services/apollo';
import { InvestorShareShareType } from 'services/apollo/shares';

import { Label, Col, FormGroup, Row } from 'atoms';
import SellOrderOption from './SellOrderOptionLabel';
import SwapTokenSelect from './SwapTokenSelect';
import SellOrderRate from './SellOrderRate';

import { UseSellOrderState } from './useSellOrderState';

interface SharesWalletSelectProps extends UseSellOrderState {
  shareType: InvestorShareShareType;
  shares: number;
}

const SellOrderSharesSelect: React.FC<SharesWalletSelectProps> = ({ shareType, order, onChange, shares }) => {
  const { t } = useTranslation();

  const { data, loading } = useGetSharesWalletsQuery({ variables: { shareTypeID: shareType.ID } });

  const { data: feeData, loading: feeLoading } = useFetchFeesQuery({
    variables: { stoID: shareType.stoID, beneficiary: FeeBeneficiary.Platform, type: FeeType.SellExchange },
    fetchPolicy: 'network-only',
  });

  if (loading || !data || feeLoading || !feeData?.fetchFees) {
    return <></>;
  }

  const { getSharesWallets: wallets } = data;
  const { fetchFees: fee } = feeData;

  const shareWalletSum = wallets.reduce((sum, next) => sum + (next.shares || 0), 0);
  const availableShare = shares - shareWalletSum;

  return (
    <>
      <h4>{t('tradingComponentsNewSellOrderInternalWalletSellOrderLabel')}</h4>
      <SellOrderOption
        id="option-share"
        label1={t('tradingComponentsNewSellOrderYourSharesLabel')}
        text1={`${availableShare} ${t('tradingComponentsNewSellOrderShare', { count: availableShare })}`}
        onChange={() =>
          onChange({
            shareTypeID: shareType.ID,
            atomicSwapSharesWalletID: null,
            atomicSwapTokenAddressAcceptable: '',
          })
        }
      />
      <h4>{t('tradingComponentsNewSellOrderSelfCustodySellOrderLabel')}</h4>
      <p>{t('tradingComponentsNewSellOrderSelfCustodyExplanationLabel')}</p>
      {wallets.map((wallet) => (
        <SellOrderOption
          key={wallet.ID}
          id={`option-share-${wallet.ID}`}
          label1={t('tradingComponentsNewSellOrderSelfCustodyWalletAddressLabel')}
          text1={wallet.publicKey || ''}
          label2={t('tradingComponentsNewSellOrderSelfCustodyShareCountLabel')}
          text2={`${wallet.shares}`}
          onChange={() => onChange({ shareTypeID: shareType.ID, atomicSwapSharesWalletID: wallet.ID })}
        />
      ))}

      <Row className="my-2">
        {order.shareTypeID ? (
          <SellOrderRate
            symbol={shareType.currency.symbol}
            shares={availableShare}
            wallets={wallets}
            order={order}
            fee={fee}
            onChange={onChange}
          />
        ) : null}
        {order.atomicSwapSharesWalletID ? (
          <Col>
            <FormGroup>
              <Label>
                <b>{t('tradingComponentsNewSellOrderSelfCustodySwapToken')}</b>
              </Label>
              <SwapTokenSelect
                value={order.atomicSwapTokenAddressAcceptable || ''}
                onChange={(value) => onChange({ atomicSwapTokenAddressAcceptable: value })}
              />
            </FormGroup>
          </Col>
        ) : null}
      </Row>
    </>
  );
};

export default SellOrderSharesSelect;
