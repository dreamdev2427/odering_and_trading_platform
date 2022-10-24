import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CommissionType } from 'services/apollo';
import { FetchFees } from 'services/apollo/fee';
import { InvestorShareWallet } from 'services/apollo/shares';

import { Input, Label, Col, FormGroup } from 'atoms';
import { UseSellOrderState } from './useSellOrderState';

interface SellOrderRateProps extends Pick<UseSellOrderState, 'order' | 'onChange'> {
  symbol: string;
  shares: number;
  wallets: InvestorShareWallet[];
  fee: FetchFees[];
}

const SellOrderRate: React.FC<SellOrderRateProps> = ({ symbol, shares, wallets, order, fee, onChange }) => {
  const { t } = useTranslation();

  const [invalid, setInvalid] = useState(false);
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [totalAfterFee, setTotalAfterFee] = useState(0);

  const [feeInfo] = fee;

  const handleChange = (setState: (value: number) => void): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
    return (e) => {
      // expect NaN
      const value = parseFloat(e.currentTarget.value) || 0;
      setState(value);
    };
  };

  useEffect(() => {
    if (order.atomicSwapSharesWalletID) {
      const wallet = wallets.find((w) => w.ID === order.atomicSwapSharesWalletID);
      if (wallet && wallet.shares < count) {
        onChange({ shares: 0, rateFrom: 0 });
        setInvalid(true);
        return;
      }
    } else if (count > shares) {
      onChange({ shares: 0, rateFrom: 0 });
      setInvalid(true);
      return;
    }

    setInvalid(false);
    if (price && count) {
      const total: number = price * count;
      setTotalAfterFee(total);
      if (feeInfo) {
        if (feeInfo.status === CommissionType.Flat) {
          setTotalAfterFee(total - feeInfo.amount);
        } else {
          const feePrice = (feeInfo.amount * total) / 100;
          setTotalAfterFee(total - feePrice);
        }
      }
      onChange({ shares: count, rateFrom: total });
    } else {
      setTotalAfterFee(0);
      onChange({ shares: 0, rateFrom: 0 });
    }
  }, [count, price, order.atomicSwapSharesWalletID]);

  return (
    <>
      <Col xs="auto" md={3}>
        <FormGroup>
          <Label>
            <b>{t('tradingComponentsNewSellOrderShareSellCountLabel')}</b>
          </Label>
          <Input invalid={invalid} onChange={handleChange(setCount)} value={count} />
        </FormGroup>
      </Col>
      <Col xs="auto" md={3}>
        <FormGroup>
          <Label>
            <b>{t('tradingComponentsNewSellOrderPricePerShareLabel')}</b>
          </Label>
          <Input onChange={handleChange(setPrice)} value={price} />
        </FormGroup>
      </Col>
      <Col xs="auto" md={2}>
        <FormGroup>
          <Label>
            <b>{t('tradingComponentsNewSellOrderTotalLabel')}</b>
          </Label>
          <h4 className="m-0">
            {symbol} {order.rateFrom}
          </h4>
        </FormGroup>
      </Col>
      <Col xs="auto" md={2}>
        <FormGroup>
          <Label>
            <b>{t('tradingComponentsNewSellOrderFeeLabel')}</b>
          </Label>
          <h4 className="m-0">
            {feeInfo?.status === CommissionType.Percentage ? '%' : symbol} {feeInfo?.amount ?? 0}
          </h4>
        </FormGroup>
      </Col>
      <Col xs="auto" md={2}>
        <FormGroup>
          <Label>
            <b>{t('tradingComponentsNewSellOrderTotalWithFeeDeductionLabel')}</b>
          </Label>
          <h4 className="m-0">
            {symbol} {totalAfterFee}
          </h4>
        </FormGroup>
      </Col>
    </>
  );
};

export default SellOrderRate;
