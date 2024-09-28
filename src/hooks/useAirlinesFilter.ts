import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { selectAirlinesFilter } from '../store/selectors/filteredSelector';
import { selectAirlinesWithPrice, selectAvailableAirlines } from '../store/selectors/selectComputed';
import { toggleAirline } from '../store/slices/filterSlice';

export const useAirlinesFilter = () => {
  const dispatch = useAppDispatch();
  const allAirlines = useAppSelector(selectAirlinesWithPrice);
  const airlinesFilter = useAppSelector(selectAirlinesFilter);
  const availableAirlines = useAppSelector(selectAvailableAirlines).split('\n');

  const onAirlineClickHandler = useCallback(
    (airline: string) => () => {
      dispatch(toggleAirline(airline));
    },
    [],
  );

  const airlines = useMemo(
    () =>
      Object.entries(allAirlines).map(([name, price]) => {
        return {
          name,
          minPrice: price,
          checked: airlinesFilter.includes(name),
          disabled: !availableAirlines.includes(name),
        };
      }),
    [allAirlines, airlinesFilter, availableAirlines],
  );

  return {
    airlines,
    onAirlineClickHandler,
  };
};
