import React, { CSSProperties, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useInvestorActivePropertiesQuery, useMeQuery } from 'services/apollo/graphql';
import { useActiveSto } from 'hooks';
import { setBackgroundColor } from 'lib/utils';

import Auth from 'services/core/auth';
import { Loading, Button, StoLogo } from 'atoms';
import SELECT_ALL from 'assets/img/select-all.png';

type SelectOption = {
  value: string;
  label: string;
};

const style: CSSProperties = {
  width: '100px',
  height: '30px',
  objectFit: 'contain',
  margin: '0',
};

interface StoSwitchListProps {
  modal: {
    hideModal(): void;
  };
}

const StoSwitchList: React.FC<StoSwitchListProps> = ({ modal }) => {
  const { sto, setSto } = useActiveSto();
  const { data, loading } = useInvestorActivePropertiesQuery();
  const { data: dt } = useMeQuery();
  const me = dt?.investorUser || null;
  const { t } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!sto) {
      setSto({ sto: Auth.sto });
    }
  }, [setSto, sto]);

  if (loading || !data?.investorActiveProperties || !me) {
    return <Loading />;
  }

  const onChange = ({ value }: SelectOption) => {
    Auth.sto = Number(value);
    setSto({ sto: Number(value) });
    modal.hideModal();
  };

  const stos: SelectOption[] = (data.investorActiveProperties || []).map((s) => ({
    value: String(s.ID),
    label: s.title,
  }));

  if (me.sto) {
    const zeroSto = me.sto;
    stos.unshift({
      value: String(zeroSto.ID),
      label: zeroSto.title || '',
    });
  }
  const locationsWithAllOption = [
    '/investor/inbox',
    '/investor/company-updates',
    '/investor/voting',
    '/investor/trading',
  ];
  if (locationsWithAllOption.includes(pathname)) {
    // any negative number represents all stos
    // code moved from the other StoSelect component
    stos.unshift({ value: '-5', label: t('All') });
  }

  const getStyle = (elemValue: string): CSSProperties => {
    if (parseInt(elemValue, 10) === sto) {
      return {
        backgroundColor: setBackgroundColor(),
      };
    }
    return {};
  };

  return (
    <div>
      <div className="fixed-plugin position-static d-block w-100">
        <div className="dropdown-menu position-static show w-100 h-75">
          {stos.map((elem: SelectOption) => (
            <div key={elem.value} className="d-flex flex-row mt-2" style={getStyle(elem.value)}>
              <div className="w-75 d-flex">
                {parseInt(elem.value, 10) < 0 ? (
                  <img style={style} src={SELECT_ALL} alt={t('All')} />
                ) : (
                  <StoLogo style={style} _id={parseInt(elem.value, 10)} />
                )}
                <span className="ml-3"> {elem.label}</span>
              </div>
              <div className="ml-auto">
                <Button size="sm" type="button" onClick={() => onChange(elem)}>
                  Switch
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoSwitchList;
