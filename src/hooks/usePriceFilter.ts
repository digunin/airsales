import { useAppDispatch } from '../store';
import { setPriceFrom, setPriceTo } from '../store/slices/filterSlice';
import React, { useCallback, useEffect, useState } from 'react';

const DELAY = 400;

export const usePriceFilter = (minPrice: number, maxPrice: number) => {
  const [inputPriceFrom, setInputPriceFrom] = useState('');
  const [inputPriceTo, setInputPriceTo] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      let price = Number(inputPriceFrom);
      if (price > maxPrice) {
        price = 0;
        setInputPriceFrom('');
      }
      dispatch(setPriceFrom(price === 0 ? null : price));
    }, DELAY);
    return () => clearTimeout(timeout);
  }, [inputPriceFrom]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let price = Number(inputPriceTo);
      if (price < minPrice) {
        price = 0;
        setInputPriceTo('');
      }
      dispatch(setPriceTo(price === 0 ? null : price));
    }, DELAY);
    return () => clearTimeout(timeout);
  }, [inputPriceTo]);

  const onChangeHandler =
    (setState: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (Number.isNaN(value)) return;
      setState(e.target.value);
    };

  const dispatch = useAppDispatch();

  return {
    from: inputPriceFrom,
    to: inputPriceTo,
    onChangePriceFrom: useCallback(onChangeHandler(setInputPriceFrom), []),
    onChangePriceTo: useCallback(onChangeHandler(setInputPriceTo), []),
  };
};
