import React, { ChangeEvent, useState } from 'react';
import { FormFeedback } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import { FeeBeneficiary, FeeType, useFetchFeesQuery, useInvestorSellAlertMutation } from 'services/apollo/graphql';
import { InvestorShares } from 'services/apollo/shares';
import useGqlErrorExtractor from 'hooks/useGqlErrorExtractor';

import BANK from 'assets/img/bank.png';
import { Button, CardBody, Col, Input, Row, BsSwal, Loading } from 'atoms';
import { CardHeader } from 'components/card-header/CardHeader';
import { useHistory } from 'react-router-dom';
import PopoverHover from 'components/PopoverHover';
import { useScrollBlock } from 'hooks';
import { CalculateShareFeesAndTotal, stripToNumber } from 'lib/utils';
import FeeDetails from './FeeDetails';

interface SellShareFormProps {
  hideModal: () => void;
  share: InvestorShares;
  shareQty: number;
  setShareQty: React.Dispatch<React.SetStateAction<number>>;
}

const fillState = (stoID: number, shareTypeID: number, investorID: number) => {
  return {
    stoID,
    shareTypeID,
    investorID,
    tokensToTransfer: 0,
    certificateNos: '',
    shareNos: '',
  };
};
const SellShareForm: React.FC<SellShareFormProps> = ({ share, hideModal, shareQty, setShareQty }) => {
  const [error, setGqlError] = useGqlErrorExtractor(fillState(share.stoID, share.shareTypeID, share.investorID));
  const [state, setState] = useState(fillState(share.stoID, share.shareTypeID, share.investorID));
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const [sell] = useInvestorSellAlertMutation();
  const [localErrors, setLocalErrors] = useState({
    tokensToTransfer: '',
  });
  const history = useHistory();
  const { data: feeData, loading: feeLoading } = useFetchFeesQuery({
    variables: { stoID: share.stoID, beneficiary: FeeBeneficiary.Platform, type: FeeType.SellBack },
    fetchPolicy: 'network-only',
  });
  const { i18n, t } = useTranslation();
  const [blockScroll, allowScroll] = useScrollBlock();

  if (feeLoading || !feeData) {
    return <Loading />;
  }

  const tryToBuy = async () => {
    try {
      const result = await sell({
        variables: {
          data: {
            stoID: share.stoID,
            shareTypeID: share.shareTypeID,
            shares: Number(state.tokensToTransfer),
            details: '',
            publicKey: '-',
          },
        },
      });
      if (result.data?.investorSellAlert) {
        BsSwal.fire({
          title: t('SellPropertyShare-success-popUp-title'),
          icon: 'success',
        }).then(() => {
          hideModal();
          history.push(`/investor/Portfolio`);
        });
      } else {
        throw result;
      }
      return true;
    } catch (err) {
      BsSwal.fire({
        title: (err as Error)?.message,
        icon: 'error',
      });
      return false;
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { tokensToTransfer } = state;

    const data = {
      ...state,
      tokensToTransfer: Number(tokensToTransfer),
    };
    if (data.tokensToTransfer > shareQty) {
      return setLocalErrors({ tokensToTransfer: t('SellShareForm-Error-tooManyToSell') });
    }
    if (totalPrice < 0) {
      return setLocalErrors({ tokensToTransfer: t('SellShareForm-Error-tooFewToSell') });
    }
    return tryToBuy();
  };

  const updateTotalPrice = (amount: number) => {
    if (feeData.fetchFees.length > 0 && amount) {
      const calculateFeesAndTotal = CalculateShareFeesAndTotal(
        feeData.fetchFees,
        share.shareType.totalPrice,
        amount,
        'sell',
      );
      setTotalFee(calculateFeesAndTotal.fees);
      setTotalPrice(calculateFeesAndTotal.total);
    } else {
      setTotalPrice(share.shareType.sellValue * amount);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.name === 'tokensToTransfer') {
      const clear = stripToNumber(share.shareType.blockchaindecimals, e);
      const amount = Number(clear);
      updateTotalPrice(amount);
      e.currentTarget.value = clear.toString();
    }
    setLocalErrors({ tokensToTransfer: '' });
    setGqlError(null);
    const newState = { [e.currentTarget.name]: e.currentTarget.value };
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  return (
    <>
      <CardHeader
        imgSrc={BANK}
        text={t('SellShareForm-CardHeader-text')}
        caption={t('SellShareForm-CardHeader-caption')}
      />
      <CardBody>
        <b style={{ color: 'red' }}>{t('SellShareForm-CardHeader-warning')}</b>
        <hr />
        <Row>
          <Col md={5}>
            <b>{t('sharesAvailable')} :</b>
          </Col>
          <Col md={1}>{shareQty}</Col>
        </Row>
        <Row>
          <Col md={5}>
            <b>{t('SellShareForm-Label-marketValue')}:</b>
          </Col>
          <Col md={1}>{share?.shareType?.premiumValue || 0}</Col>
        </Row>
        <Row>
          <Col md={5}>
            <b>{t('SellShareForm-Label-SellPrice')}:</b>
          </Col>
          <Col md={1}>{share?.shareType?.sellValue || 0}</Col>
        </Row>
        <br />
        <Row>
          <Col md={5}>
            <b>
              <PopoverHover
                label={t('BuyPropertyShare-TransactionFee')}
                title={t('Fees Breakdown')}
                target={<i className="ti-help-alt" />}
                body={<FeeDetails fees={feeData.fetchFees} currencySymbol={share.shareType.currency.symbol} />}
              />
            </b>
          </Col>
          <Col md={2}>
            {share.shareType.currency.symbol}
            {(totalFee ?? 0).toLocaleString(i18n.language, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={5}>
            <b>{t('BuyPropertyShare-totalPrice')}</b> :
          </Col>
          <Col md={2}>
            {share.shareType.currency.symbol}{' '}
            {(totalPrice ?? 0).toLocaleString(i18n.language, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={5}>
            <b>{t('SellShareForm-Input-tokensToTransfer')}</b> * <br />
            <Input
              invalid={!!error.tokensToTransfer || !!localErrors.tokensToTransfer}
              name="tokensToTransfer"
              placeholder=""
              type="number"
              onChange={onChange}
              min={0}
              max={shareQty}
              step={1}
              onFocus={blockScroll}
              onBlur={allowScroll}
              value={state.tokensToTransfer}
            />
            <FormFeedback>{error.tokensToTransfer || localErrors.tokensToTransfer}</FormFeedback>
          </Col>
          <Col md={7}>
            <b>{t('SellShareForm-Input-certificateNos')}</b> <br />
            <Input
              invalid={!!error.certificateNos}
              type="text"
              max="120"
              value={state.certificateNos}
              onChange={onChange}
              name="certificateNos"
              placeholder=""
            />
            <FormFeedback>{error.certificateNos}</FormFeedback>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <b>{t('SellShareFrom-Input-shareNos')}</b> <br />
            <Input
              invalid={!!error.shareNos}
              type="text"
              max="30"
              value={state.shareNos}
              onChange={onChange}
              name="shareNos"
              placeholder=""
            />
            <FormFeedback>{error.shareNos}</FormFeedback>
          </Col>
        </Row>
        <br />
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => hideModal()}>{t('Cancel')}</Button>
          <Button className="ml-auto" onClick={onSubmit}>
            {t('SellShareForm-Button-sellShares')}
          </Button>
        </div>
      </CardBody>
    </>
  );
};

export default SellShareForm;
