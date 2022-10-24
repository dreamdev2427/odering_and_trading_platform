import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Row, Col, FormGroup, Input, Label, Select, Loading } from 'atoms';
import { InvestingEntityInput, useCountriesQuery, useInvestorEntityTypesQuery } from 'services/apollo';
import { Alert } from 'reactstrap';

interface InvestingEntityFormBaseProps {
  state: InvestingEntityInput;
  onChange: (data: Partial<InvestingEntityInput>) => void;
  validationError: InvestingEntityInput;
}

const InvestingEntityFormBase: React.FC<InvestingEntityFormBaseProps> = ({ state, onChange, validationError }) => {
  const { t } = useTranslation();
  const { data } = useCountriesQuery();
  const { data: dataTypes } = useInvestorEntityTypesQuery();
  const [entityTypesOptions, setEntityTypesOptions] = useState<{ value: number; label: string }[]>([]);
  const [countryValid, setCountryValid] = useState('United States');

  useEffect(() => {
    // Filtering Entity Types bases on country
    const filteredTypes =
      dataTypes?.investorInvestingEntityTypes.filter(
        (unit) => unit.countries.includes('ALL') || unit.countries.includes(countryValid),
      ) || [];
    setEntityTypesOptions(
      filteredTypes.map((value) => ({
        value: value.ID,
        label: value.title,
      })),
    );
    if (!filteredTypes.find((unit) => unit.ID === state.typeID)) {
      onChange({ typeID: 1 });
    }
  }, [countryValid, dataTypes, onChange, state.typeID]);

  if (!data || !dataTypes) return <Loading />;

  const countryOptions =
    data.countries.map((value) => ({
      value,
      label: value,
    })) || [];

  const selectedOption = entityTypesOptions.find((x) => x.value === state.typeID);

  const accreditedOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  const selectedAccredited = accreditedOptions.find((x) => (state.accredited ? x.value === 'yes' : x.value === 'no'));

  return (
    <>
      <h3>{t('entityItemRowEntityInformation')}</h3>
      <Row>
        <Col>
          <FormGroup>
            <Label>{t('entityItemRowLegalEntityNameLabel')}*</Label>
            <Input
              invalid={validationError.name}
              name="legalEntityName"
              max="30"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange({ name: e.target.value });
                validationError.name = '';
              }}
              placeholder={t('entityItemRowLegalEntityNameLabel')}
              value={state.name}
            />
            {validationError.name ? <Alert color="danger">{validationError.name}</Alert> : ''}
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>{t('entityItemRowNicknameLabel')}</Label>
            <Input
              invalid={validationError.nickname}
              name="nickname"
              max="30"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange({ nickname: e.target.value });
                validationError.nickname = '';
              }}
              placeholder={t('entityItemRowNicknameLabel')}
              value={state.nickname}
            />
            {validationError.nickname ? <Alert color="danger">{validationError.nickname}</Alert> : ''}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label>{t('entityItemRowCountryLabel')}*</Label>
            <Select
              class="form-control border-input"
              name="countryValid"
              options={countryOptions}
              value={{ value: countryValid, label: countryValid }}
              onChange={({ value }: { value: string }) => setCountryValid(value)}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>{t('entityItemRowAccountTypeLabel')}*</Label>
            <Select
              class="form-control border-input"
              name="accountType"
              options={entityTypesOptions}
              value={selectedOption}
              onChange={({ value }: { value: number }) => onChange({ typeID: value })}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>{t('entityItemRowAccreditedLabel')}*</Label>
            <Select
              class="form-control border-input"
              name="accountType"
              options={accreditedOptions}
              value={selectedAccredited}
              onChange={({ value }: { value: string }) => onChange({ accredited: value === 'yes' })}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>{t('entityItemRowTaxIdLabel')}*</Label>
            <Input
              invalid={validationError.taxId}
              name="taxID"
              max="9"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange({ taxId: e.target.value });
                validationError.taxId = '';
              }}
              placeholder={t('entityItemRowTaxIdLabel')}
              value={state.taxId}
            />
            {validationError.taxId && validationError.taxId[0].includes('equal to 9') ? (
              <Alert color="danger">TaxId should contain 9 digits.</Alert>
            ) : (
              ''
            )}
          </FormGroup>
        </Col>
      </Row>
      <hr />
    </>
  );
};

export default InvestingEntityFormBase;
