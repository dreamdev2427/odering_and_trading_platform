import React from 'react';
import { useTranslation } from 'react-i18next';

import { Row, Col, FormGroup, Input, Label, Select } from 'atoms';
import { InvestingEntityInput, useCountriesQuery } from 'services/apollo';
import { Alert } from 'reactstrap';

interface InvestingEntityFormAddressProps {
  state: InvestingEntityInput;
  onChange: (data: Partial<InvestingEntityInput>) => void;
  validationError: InvestingEntityInput;
}

const InvestingEntityFormAddress: React.FC<InvestingEntityFormAddressProps> = ({
  state,
  onChange,
  validationError,
}) => {
  const { t } = useTranslation();
  const { data } = useCountriesQuery();

  const countryOptions =
    data?.countries.map((value) => ({
      value,
      label: value,
    })) || [];

  return (
    <>
      <h3>{t('entityItemRowAddress')}</h3>
      <Row>
        <Col>
          <FormGroup>
            <Label>{t('entityItemRowAddressLabel')}*</Label>
            <Input
              invalid={validationError.address}
              name="address"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange({ address: e.target.value });
                validationError.address = '';
              }}
              placeholder={t('entityItemRowAddressLabel')}
              value={state.address}
            />
            {validationError.address ? <Alert color="danger">{validationError.address}</Alert> : ''}
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>{t('entityItemRowCityLabel')}*</Label>
            <Input
              invalid={validationError.city}
              name="city"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange({ city: e.target.value });
                validationError.city = '';
              }}
              placeholder={t('entityItemRowCityLabel')}
              value={state.city}
            />
            {validationError.city ? <Alert color="danger">{validationError.city}</Alert> : ''}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label>{t('entityItemRowStateLabel')}*</Label>
            <Input
              name="state"
              invalid={validationError.state}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange({ state: e.target.value });
                validationError.state = '';
              }}
              placeholder={t('entityItemRowStateLabel')}
              value={state.state}
            />
            {validationError.state ? <Alert color="danger">{validationError.state}</Alert> : ''}
          </FormGroup>
        </Col>
        <Col>
          <Label>{t('entityItemRowZipCodeLabel')}*</Label>
          <Input
            invalid={validationError.postalCode}
            name="postalCode"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChange({ postalCode: e.target.value });
              validationError.postalCode = '';
            }}
            placeholder={t('entityItemRowZipCodeLabel')}
            value={state.postalCode}
          />
          {validationError.postalCode ? <Alert color="danger">{validationError.postalCode}</Alert> : ''}
        </Col>
        <Col>
          <FormGroup>
            <Label>{t('entityItemRowCountryLabel')}*</Label>
            <Select
              invalid={validationError.country}
              class="form-control border-input"
              name="accountType"
              options={countryOptions}
              value={{ value: state.country, label: state.country }}
              onChange={({ value }: { value: string }) => onChange({ country: value })}
            />
            {validationError.country ? <Alert color="danger">{validationError.country}</Alert> : ''}
          </FormGroup>
        </Col>
      </Row>
      <hr />
    </>
  );
};

export default InvestingEntityFormAddress;
