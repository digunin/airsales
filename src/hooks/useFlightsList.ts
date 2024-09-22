import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import { selectSortedFlightsLength, selectSortedFlightsSlice } from '../store/selectors/sortedSelector';
import { selectAirlinesFilter, selectPriceFilter, selectTransfersFilter } from '../store/selectors/filteredSelector';

export const useFlightsList = () => {
  const [cardslength, setCardsLength] = useState(3);
  const flights = useAppSelector(selectSortedFlightsSlice(cardslength));
  const sortedLength = useAppSelector(selectSortedFlightsLength);
  const transfersFilter = useAppSelector(selectTransfersFilter);
  const priceFilters = useAppSelector(selectPriceFilter);
  const airlinesFilters = useAppSelector(selectAirlinesFilter);

  useEffect(() => {
    if (cardslength > 3) setCardsLength(3);
  }, [transfersFilter, priceFilters, airlinesFilters]);

  const showMoreHandler = useCallback(() => {
    setCardsLength(prev => prev + 3);
  }, []);

  return { flights, showMoreHandler, showMoreButtonDisabled: sortedLength <= cardslength };
};
