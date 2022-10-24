import React from 'react';
import { useTranslation } from 'react-i18next';

import { Row, Col, FormGroup, Label, Select } from 'atoms';
import { keys } from 'lib/helpers';
import { InvestingEntityPaymentMethods, InvestingEntityInput } from 'services/apollo';
import { PAYMENT_METHODS } from '../constants';

interface InvestingEntityFormPaymentProps {
  state: InvestingEntityInput;
  onChange: (data: Partial<InvestingEntityInput>) => void;
}

const InvestingEntityFormPayment: React.FC<InvestingEntityFormPaymentProps> = ({ state, onChange }) => {
  const { t } = useTranslation();

  const typeOptions = keys(PAYMENT_METHODS).map((key) => ({
    value: key,
    label: PAYMENT_METHODS[key],
  }));

  const selectedOption = typeOptions.find((x) => x.value === state.paymentMethod);

  return (
    <>
      <h3>{t('entityItemRowDistributionBankingInformationLabel')}</h3>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label>{t('entityItemRowAccountTypeLabel')}*</Label>
            <Select
              class="form-control border-input"
              name="accountType"
              options={typeOptions}
              value={selectedOption}
              onChange={({ value }: { value: InvestingEntityPaymentMethods }) => onChange({ paymentMethod: value })}
            />
          </FormGroup>
        </Col>
      </Row>
    </>
  );
};

export default InvestingEntityFormPayment;
