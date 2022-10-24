import { useState } from 'react';

import { ExchangeSellOrderInput } from 'services/apollo';

interface Dates {
  dateFrom: Date,
  dateTo: Date,
}

export type UseSellOrderState = {
  order: ExchangeSellOrderInput,
  dates: Dates,
  onChange: (newState: Partial<ExchangeSellOrderInput>) => void,
  onChangeDate: (newState: Partial<Dates>) => void,
}

const useSellOrderState = (): UseSellOrderState => {
  const dateFrom = new Date();
  const dateTo = new Date();
  dateTo.setDate(dateFrom.getDate() + 1);
  const [state, setState] = useState<ExchangeSellOrderInput>({
    shareTypeID: 0,
    shares: 0,
    rateFrom: 0,
    description: '',
    atomicSwapSharesWalletID: null,
    atomicSwapTokenAddressAcceptable: '',
    dateFrom: dateFrom.toISOString().slice(0, 10),
    dateTo: dateTo.toISOString().slice(0, 10),
  });
  const [dates, setDates] = useState<Dates>({ dateFrom, dateTo });

  const onChange = (newState: Partial<ExchangeSellOrderInput>): void => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  // update only 1 field at once
  const onChangeDate = (newState: Partial<Dates>): void => {
    const [key] = Object.keys(newState) as (keyof Dates)[];
    onChange({ [key]: newState[key]?.toISOString().slice(0, 10) });
    setDates((prevState) => ({ ...prevState, ...newState }));
  };

  return {
    order: state,
    dates,
    onChange,
    onChangeDate,
  };
};

export default useSellOrderState;
