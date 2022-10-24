import React, { useEffect } from 'react';

import { useInvestorActivePropertiesQuery, useMeQuery } from 'services/apollo/graphql';
import Auth from 'services/core/auth';

import { Loading, Select } from 'atoms';
import { useActiveSto } from 'hooks';
import { useLocation } from 'react-router-dom';

type SelectOption = {
  value: string;
  label: string;
};

const StoSelect: React.FC = ({ selectStyles, getSelectedSto }: any) => {
  const { sto, setSto } = useActiveSto();
  const { data, loading } = useInvestorActivePropertiesQuery();
  const { data: dt } = useMeQuery();
  const me = dt?.investorUser || null;
  const { pathname } = useLocation();

  useEffect(() => {
    if (!sto) {
      setSto({ sto: Auth.sto });
    }
  }, [setSto, sto]);

  useEffect(() => {
    if (getSelectedSto) {
      getSelectedSto(selected);
    }
  }, [getSelectedSto, sto]);

  if (loading || !data?.investorActiveProperties || !me) {
    return <Loading />;
  }

  const onChange = ({ value, label }: SelectOption) => {
    Auth.sto = Number(value);
    setSto({ sto: Number(value) });
    if (getSelectedSto) {
      getSelectedSto({ value, label });
    }
  };

  const stos: SelectOption[] = (data.investorActiveProperties || []).map((s) => ({
    value: String(s.ID),
    label: s.title,
  }));
  const locationsWithAllOption = ['/investor/inbox', '/investor/company-updates', '/investor/voting'];
  if (locationsWithAllOption.includes(pathname)) {
    stos.unshift({ "value": "-5", "label": "All" })
  }

  // zero sto
  if (me.sto) {
    const zeroSto = me.sto;
    stos.push({
      value: String(zeroSto.ID) || '',
      label: zeroSto.title || '',
    });
  }

  const selected = stos.find((c) => Number(c.value) === sto);

  return <Select overrideStyles={selectStyles} options={stos} value={selected} onChange={onChange} />;
};

export default StoSelect;
