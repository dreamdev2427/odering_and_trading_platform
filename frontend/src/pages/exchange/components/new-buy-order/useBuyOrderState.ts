import { useState } from 'react';

import { ExchangeBuyOrderInput } from 'services/apollo';

interface Dates {
  dateFrom: Date,
  dateTo: Date,
}

type UseBuyOrderState = {
  order: ExchangeBuyOrderInput,
  dates: Dates,
  empty: (keyof ExchangeBuyOrderInput)[],
  onChange: (newState: Partial<ExchangeBuyOrderInput>) => void,
  onChangeDate: (newState: Partial<Dates>) => void,
  checkEmpty: () => boolean,
}

const useBuyOrderState = (): UseBuyOrderState => {
  const dateFrom = new Date();
  const dateTo = new Date();
  dateTo.setDate(dateFrom.getDate() + 1);
  const [state, setState] = useState<ExchangeBuyOrderInput>({
    shareTypeID: 0,
    shares: 0,
    rateFrom: 0,
    dateFrom: dateFrom.toISOString().slice(0, 10),
    dateTo: dateTo.toISOString().slice(0, 10),
  });
  const [dates, setDates] = useState<Dates>({ dateFrom, dateTo });
  const [empty, setEmpty] = useState<(keyof ExchangeBuyOrderInput)[]>([]);

  // update only 1 field at once
  const onChange = (newState: Partial<ExchangeBuyOrderInput>): void => {
    const [key] = Object.keys(newState) as (keyof ExchangeBuyOrderInput)[];
    const index = empty.indexOf(key);
    if (index !== -1) {
      empty.splice(index, 1);
      setEmpty([...empty]);
    }

    setState((prevState) => ({ ...prevState, ...newState }));
  };

  // update only 1 field at once
  const onChangeDate = (newState: Partial<Dates>): void => {
    const [key] = Object.keys(newState) as (keyof Dates)[];
    onChange({ [key]: newState[key]?.toISOString().slice(0, 10) });
    setDates((prevState) => ({ ...prevState, ...newState }));
  };

  const checkEmpty = (): boolean => {
    // grab all keys
    const keys = Object.keys(state) as (keyof ExchangeBuyOrderInput)[];

    // filter keys by state values. If value is ok, it will be excluded
    const filtered = keys.filter(key => !state[key]);
    setEmpty(filtered);
    return !!filtered.length;
  };

  return {
    order: state,
    dates,
    empty,
    onChange,
    onChangeDate,
    checkEmpty,
  };
};

export default useBuyOrderState;
