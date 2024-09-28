import { useAppDispatch, useAppSelector } from '../store';
import { seletAvailableMinMaxPrice } from '../store/selectors/selectComputed';
import { setPriceFrom, setPriceTo } from '../store/slices/filterSlice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export const usePriceFilter = () => {
  const dispatch = useAppDispatch();
  const [minPrice, maxPrice] = useAppSelector(seletAvailableMinMaxPrice);

  const onChangeHandler = (reducer: ActionCreatorWithPayload<number | null>) => (value: number) => {
    if (Number.isNaN(minPrice) || Number.isNaN(maxPrice)) return;
    if (value < minPrice || value > maxPrice) {
      dispatch(reducer(null));
      return;
    }
    dispatch(reducer(value));
    return value;
  };

  return {
    minPrice,
    maxPrice,
    onChangePriceFrom: onChangeHandler(setPriceFrom),
    onChangePriceTo: onChangeHandler(setPriceTo),
  };
};
