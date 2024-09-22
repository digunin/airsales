import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import { selectSortedFlights } from '../store/selectors/sortedSelector';
import { selectAirlinesFilter, selectPriceFilter, selectTransfersFilter } from '../store/selectors/filteredSelector';

export const useFlightsList = () => {
  const flights = useAppSelector(selectSortedFlights);
  const [cardslength, setCardsLength] = useState(3);
  const transfersFilter = useAppSelector(selectTransfersFilter);
  const priceFilters = useAppSelector(selectPriceFilter);
  const airlinesFilters = useAppSelector(selectAirlinesFilter);

  useEffect(() => {
    setCardsLength(3);
  }, [transfersFilter, priceFilters, airlinesFilters]);

  const showMoreHandler = useCallback(() => {
    setCardsLength(prev => prev + 3);
  }, []);

  return { flights, cardslength, showMoreHandler };
};
