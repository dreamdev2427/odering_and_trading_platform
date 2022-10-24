import React from 'react';

import { useInvestorActivePropertiesQuery, } from 'services/apollo/graphql';

import { Loading, Select } from 'atoms';

type SelectOption = {
  value: number;
  label: string;
};

interface ActiveStoSelectProps {
  sto: number;
  setSto: (value: number) => void;
}

const ActiveStoSelect: React.FC<ActiveStoSelectProps> = ({ sto, setSto }) => {
  const { data, loading } = useInvestorActivePropertiesQuery();

  if (loading || !data) {
    return <Loading />;
  }

  const onChange = ({ value }: SelectOption) => {
     setSto(Number(value));
  };

  const stos: SelectOption[] = (data.investorActiveProperties || []).map((s) => ({
    value: s.ID,
    label: s.title,
  }));

  const selected = stos.find((c) => c.value === sto);

  return <Select options={stos} value={selected} onChange={onChange} />;
};

export default ActiveStoSelect;
