import { useState, useCallback } from 'react';

import { ExchangeOfferInput } from 'services/apollo';

export type UseNewOfferState = {
  state: ExchangeOfferInput;
  empty: (keyof ExchangeOfferInput)[];
  onChange: (newState: Partial<ExchangeOfferInput>) => void;
  checkEmpty: () => boolean;
};

const useNewOfferState = (exchangeOrderID: number, swap: boolean): UseNewOfferState => {
  const [state, setState] = useState<ExchangeOfferInput>({
    exchangeOrderID,
    sharesPartial: 0,
    rateFrom: 0,
    description: '',
    atomicBuyerPublicKey: '',
  });
  const [empty, setEmpty] = useState<(keyof ExchangeOfferInput)[]>([]);

  // update only 1 field at once
  const onChange = useCallback(
    (newState: Partial<ExchangeOfferInput>): void => {
      const [key] = Object.keys(newState) as (keyof ExchangeOfferInput)[];
      const index = empty.indexOf(key);
      if (index !== -1) {
        empty.splice(index, 1);
        setEmpty([...empty]);
      }

      setState((prevState) => ({ ...prevState, ...newState }));
    },
    [empty],
  );

  const checkEmpty = (): boolean => {
    const keys = ['sharesPartial', 'rateFrom'] as (keyof ExchangeOfferInput)[];
    if (swap) {
      keys.push('atomicBuyerPublicKey');
    }
    // filter keys by state values. If value is ok, it will be excluded
    const filtered = keys.filter((key) => !state[key]);
    setEmpty(filtered);
    return !!filtered.length;
  };

  return {
    state,
    empty,
    onChange,
    checkEmpty,
  };
};

export default useNewOfferState;
