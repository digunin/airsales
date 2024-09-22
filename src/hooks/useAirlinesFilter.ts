import { useAppDispatch, useAppSelector } from '../store';
import { selectAirlinesFilter } from '../store/selectors/filteredSelector';
import { selectAirlinesWithPrice, selectAvailableAirlines } from '../store/selectors/selectComputed';
import { toggleAirline } from '../store/slices/filterSlice';

export const useAirlinesFilter = () => {
  const dispatch = useAppDispatch();
  const allAirlines = useAppSelector(selectAirlinesWithPrice);
  const airlinesFilter = useAppSelector(selectAirlinesFilter);
  const encodedAvailableAirlines = useAppSelector(selectAvailableAirlines);
  const availableAirlines = encodedAvailableAirlines.split('\n');
  const onAirlineClickHandler = (airline: string) => () => {
    dispatch(toggleAirline(airline));
  };

  return {
    allAirlines,
    airlinesFilter,
    availableAirlines,
    onAirlineClickHandler,
  };
};
