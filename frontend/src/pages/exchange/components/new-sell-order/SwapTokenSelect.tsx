import React from 'react';

import { useGetSwapTokensQuery } from 'services/apollo';
import { Select } from 'atoms';

interface SwapTokenSelectProps {
  value: string;
  onChange: (value: string) => void;
}

interface SelectOption {
  value: string;
  label: string;
}

const SwapTokenSelect: React.FC<SwapTokenSelectProps> = ({ value, onChange }) => {
  const { loading, data } = useGetSwapTokensQuery();

  if (loading || !data) {
    return <></>;
  }

  const options = data.getSwapTokens.map(item => ({
    value: item.address,
    label: item.symbol,
  }));

  const selected = options.find((i) => i.value === value);

  return (
    <Select
      class="form-control border-input"
      name="swapToken"
      options={options}
      value={selected}
      onChange={(option: SelectOption) => onChange(option.value)}
    />
  );
};

export default SwapTokenSelect;
