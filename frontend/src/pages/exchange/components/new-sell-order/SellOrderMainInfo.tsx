import React from 'react';
import { useTranslation } from 'react-i18next';

import { InvestorShareShareType } from 'services/apollo/shares';
import { Row, Col, Label, DatePicker, FormGroup } from 'atoms';
import { UseSellOrderState } from './useSellOrderState';


interface SellOrderMainInfoProps extends UseSellOrderState {
  shareType: InvestorShareShareType;
}

const SellOrderMainInfo: React.FC<SellOrderMainInfoProps> = ({
  shareType,
  dates,
  onChangeDate,
  order,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Row className="font-weight-bold">
        <Col xs="auto">
          <Label>{t('tradingComponentsNewSellOrderCardTopShareTypeLabel')}:</Label>
          {shareType.title}
        </Col>
        <Col xs="auto">
          <Label>{t('tradingComponentsNewSellOrderCardTopNominal')}:</Label>
          {`${shareType.currency.symbol} ${shareType.nominalValue?.toFixed(2)}`}
        </Col>
        <Col xs="auto">
          <Label>{t('tradingComponentsNewSellOrderCardTopPremium')}:</Label>
          {`${shareType.currency.symbol} ${shareType.premiumValue?.toFixed(2)}`}
        </Col>
      </Row>
      <hr />
      <Row className="mb-2">
        <Col xs={12}>
          <h6>{t('tradingComponentsNewSellOrderActivePeriodLabel')}</h6>
          <p>{t('tradingComponentsNewSellOrderActivePeriodExplanatoryLabel')}</p>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label className=" mb-0"><b>{t('tradingComponentsNewSellOrderOpenDateLabel')}</b></Label>
            <DatePicker
              onChange={(dateFrom: Date) => onChangeDate({ dateFrom })}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
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
            <Label><b>{t('tradingComponentsNewSellOrderCloseDateLabel')}</b></Label>
            <DatePicker
              onChange={(dateTo: Date) => onChangeDate({ dateTo })}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="dd.MM.yyyy"
              showPopperArrow={false}
              selected={dates.dateTo}
              startDate={dates.dateFrom}
              endDate={dates.dateTo}
              minDate={dates.dateFrom}
            />
          </FormGroup>
        </Col>
        <Col xs={12}>
          <FormGroup>
            <Label><b>{t('tradingComponentsNewSellOrderInternalNoteLabel')}</b></Label>
            <textarea
              className="form-control border-input"
              rows={7}
              id="description"
              name="description"
              onChange={(e) => onChange({ description: e.currentTarget.value })}
              value={order.description || ''}
            />
          </FormGroup>
        </Col>
      </Row>
      <hr />
    </>
  );
};

export default SellOrderMainInfo;
