import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { seletAvailableMinMaxPrice } from '../store/selectors/selectComputed';
import { setPriceFrom, setPriceTo } from '../store/slices/filterSlice';

const DELAY = 800;

export const usePriceFilter = () => {
  const [minPrice, maxPrice] = useAppSelector(seletAvailableMinMaxPrice);
  const [inputPriceFrom, setInputPriceFrom] = useState('');
  const [inputPriceTo, setInputPriceTo] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      let price = Number(inputPriceFrom);
      if (price > maxPrice || price < minPrice) {
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
      if (price < minPrice || price > maxPrice) {
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
    minPrice,
    maxPrice,
    onChangePriceFrom: useCallback(onChangeHandler(setInputPriceFrom), []),
    onChangePriceTo: useCallback(onChangeHandler(setInputPriceTo), []),
  };
};
