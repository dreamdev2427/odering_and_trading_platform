import React from 'react';
import { useTranslation } from 'react-i18next';

import { useActiveSto } from 'hooks';
import { useFindShareTypesQuery } from 'services/apollo';

import { Select } from 'atoms';

interface ShareTypeSelectProps {
  value: number;
  onChange: (value: number, symbol: string, stoID: number) => void;
  invalid: boolean;
}

interface SelectOption {
  value: number;
  stoID: number;
  label: string;
  symbol: string;
}

const ShareTypeSelect: React.FC<ShareTypeSelectProps> = ({ value, onChange, invalid }) => {
  const { sto: stoID } = useActiveSto();
  const { t } = useTranslation();
  const premiumTitle = t('tradingComponentsNewBuyOrderPremium');
  const nominalTitle = t('tradingComponentsNewBuyOrderNominal');

  const { data, loading } = useFindShareTypesQuery({ variables: { stoID }, fetchPolicy: 'no-cache' });

  if (loading || !data) {
    return <></>;
  }

  const options = data.findShareTypes.map((item) => {
    const { symbol } = item.currency;
    let label = item.title;
    if (item.premiumValue) {
      label += `${premiumTitle} ${symbol} ${item.premiumValue}`;
    } else {
      label += `${nominalTitle} ${symbol} ${item.nominalValue}`;
    }

    return {
      value: item.ID,
      stoID: item.stoID,
      label,
      symbol,
    };
  });

  const selected = options.find((i) => i.value === value);

  return (
    <Select
      class="form-control border-input"
      invalid={invalid}
      name="shareTypeDropdown"
      options={options}
      value={selected}
      onChange={(option: SelectOption) => onChange(option.value, option.symbol, option.stoID)}
    />
  );
};

export default ShareTypeSelect;
