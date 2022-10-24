import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  useCreateNewBuyOrderMutation,
  useFetchFeesQuery,
  FeeBeneficiary,
  FeeType,
  CommissionType,
} from 'services/apollo';

import { CardHeader } from 'components/card-header/CardHeader';
import {
  Button,
  Card,
  CardBody,
  BrandIcon,
  Col,
  Form,
  Input,
  Row,
  GrayDot,
  DatePicker,
  BsSwal,
  FormGroup,
  Label,
} from 'atoms';
import useBuyOrderState from './components/new-buy-order/useBuyOrderState';
import ShareTypeSelect from './components/new-buy-order/ShareTypeSelect';

const NewBuyOrderPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { order, dates, empty, onChange, onChangeDate, checkEmpty } = useBuyOrderState();
  const [symbol, setSymbol] = useState<string>('');
  const [stoID, setStoID] = useState(0);
  const [price, setPrice] = useState(0);
  const [totalAfterFee, setTotalAfterFee] = useState(0);

  const { data: feeData } = useFetchFeesQuery({
    variables: { stoID, beneficiary: FeeBeneficiary.Platform, type: FeeType.BuyExchange },
    fetchPolicy: 'network-only',
  });
  const [feeInfo] = feeData?.fetchFees || [];

  useEffect(() => {
    if (price && order.shares) {
      const total: number = price * order.shares;
      setTotalAfterFee(total);
      if (feeInfo) {
        if (feeInfo.status === CommissionType.Flat) {
          setTotalAfterFee(total + feeInfo.amount);
        } else {
          const feePrice = (feeInfo.amount * total) / 100;
          setTotalAfterFee(total + feePrice);
        }
      }
      onChange({ rateFrom: total });
    } else {
      setTotalAfterFee(0);
      onChange({ rateFrom: 0 });
    }
  }, [price, order.shares, feeInfo]);

  const [createBuyOrder] = useCreateNewBuyOrderMutation();

  const goBack = (): void => history.push(`/investor/trading`);

  const handleBuy = () => {
    if (checkEmpty()) {
      return;
    }
    return createBuyOrder({ variables: { order } })
      .then(() => goBack())
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

  return (
    <Col className="content">
      <Card>
        <CardHeader
          text={t('tradingComponentsNewBuyOrderCardHeader')}
          icon={<BrandIcon icon="info" color="cyan" pill />}
        />
        <CardBody className="mb-2">
          <Form>
            <Row>
              <Col xs="auto">
                <GrayDot big />
              </Col>
              <Col>
                <label>{t('tradingComponentsNewBuyOrderShareTypeSelectLabel')}</label>
              </Col>
            </Row>
            <Row>
              <Col>
                <ShareTypeSelect
                  invalid={empty.includes('shareTypeID')}
                  value={order.shareTypeID}
                  onChange={(shareTypeID, newSymbol, relatedStoID) => {
                    onChange({ shareTypeID });
                    setStoID(relatedStoID);
                    setSymbol(newSymbol);
                  }}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={12}>
                <Row>
                  <Col xs="auto">
                    <GrayDot big />
                  </Col>
                  <Col>
                    <p>{t('tradingComponentsNewBuyOrderDateLabel')}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>{t('tradingComponentsNewBuyOrderOpenDateLabel')}</Label>
                      <DatePicker
                        onChange={(dateFrom: Date) => onChangeDate({ dateFrom })}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        invalid={empty.includes('dateFrom')}
                        dateFormat="dd.MM.yyyy"
                        showPopperArrow={false}
                        selected={dates.dateFrom}
                        selectsStart
                        startDate={dates.dateFrom}
                        endDate={dates.dateTo}
                        minDate={new Date()}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>{t('tradingComponentsNewBuyOrderCloseDateLabel')}</Label>
                      <DatePicker
                        onChange={(dateTo: Date) => onChangeDate({ dateTo })}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        invalid={empty.includes('dateTo')}
                        dateFormat="dd.MM.yyyy"
                        showPopperArrow={false}
                        selected={dates.dateTo}
                        startDate={dates.dateFrom}
                        endDate={dates.dateTo}
                        minDate={dates.dateFrom}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs="auto" md={3}>
                <FormGroup>
                  <Label>
                    <b>{t('tradingComponentsNewBuyOrderSharesCountLabel')}</b>
                  </Label>
                  <Input invalid={empty.includes('shares')} onChange={handleChange('shares')} value={order.shares} />
                </FormGroup>
              </Col>
              <Col xs="auto" md={3}>
                <FormGroup>
                  <Label>
                    <b>{t('tradingComponentsNewBuyOrderOfferPriceLabel')}</b>
                  </Label>
                  <Input
                    invalid={empty.includes('rateFrom')}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPrice(parseFloat(e.currentTarget.value) || 0)
                    }
                    value={price}
                  />
                </FormGroup>
              </Col>
              <Col xs="auto" md={2}>
                <FormGroup>
                  <Label className="mb-1">
                    <b>{t('tradingComponentsNewBuyOrderTotalLabel')}</b>
                  </Label>
                  <h4 className="m-0">
                    {symbol} {order.rateFrom}
                  </h4>
                </FormGroup>
              </Col>
              <Col xs="auto" md={2}>
                <FormGroup>
                  <Label className="mb-1">
                    <b>{t('tradingComponentsNewBuyOrderFeeLabel')}</b>
                  </Label>
                  <h4 className="m-0">
                    {feeInfo?.status === CommissionType.Percentage ? '%' : symbol} {feeInfo?.amount ?? 0}
                  </h4>
                </FormGroup>
              </Col>
              <Col xs="auto" md={2}>
                <FormGroup>
                  <Label className="mb-1">
                    <b>{t('tradingComponentsNewBuyOrderTotalWithFeeAdditionLabel')}</b>
                  </Label>
                  <h4 className="m-0">
                    {symbol} {totalAfterFee}
                  </h4>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Button size="sm" onClick={handleBuy}>
                  {t('tradingComponentsNewBuyOrderBuyButton')}
                </Button>
              </Col>
              <Col md={6}>
                <Button size="sm" onClick={goBack}>
                  {t('tradingComponentsNewBuyOrderCancelButton')}
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default NewBuyOrderPage;
