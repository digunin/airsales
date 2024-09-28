import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { seletAvailableMinMaxPrice } from '../store/selectors/selectComputed';
import { setPriceFrom, setPriceTo } from '../store/slices/filterSlice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export const usePriceFilter = () => {
  const dispatch = useAppDispatch();
  const [minPrice, maxPrice] = useAppSelector(seletAvailableMinMaxPrice);
  const onChangeHandler = (reducer: ActionCreatorWithPayload<number | null>) => (value: number) => {
    if (Number.isNaN(minPrice) || Number.isNaN(maxPrice)) return null;
    if (value < minPrice || value > maxPrice) {
      dispatch(reducer(null));
      return null;
    }
    dispatch(reducer(value));
    return value;
  };

  return useMemo(
    () => [
      {
        label: 'От',
        placeholder: `${minPrice ? minPrice : ''}`,
        onchange: onChangeHandler(setPriceFrom),
      },
      {
        label: 'До',
        placeholder: `${maxPrice ? maxPrice : ''}`,
        onchange: onChangeHandler(setPriceTo),
      },
    ],
    [minPrice, maxPrice],
  );
};
