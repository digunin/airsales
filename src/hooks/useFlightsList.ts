import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import { selectHaveItemsToDisplaying, selectSortedFlightsSlice } from '../store/selectors/sortedSelector';
import { selectAirlinesFilter, selectPriceFilter, selectTransfersFilter } from '../store/selectors/filteredSelector';

const CARDS_PER_PAGE = 3;

export const useFlightsList = () => {
  const [cardslength, setCardsLength] = useState(CARDS_PER_PAGE);
  const flights = useAppSelector(selectSortedFlightsSlice(cardslength));
  const haveItemsForDisplaying = useAppSelector(selectHaveItemsToDisplaying(cardslength));
  const transfersFilter = useAppSelector(selectTransfersFilter);
  const priceFilter = useAppSelector(selectPriceFilter);
  const airlinesFilter = useAppSelector(selectAirlinesFilter);

  useEffect(() => {
    if (cardslength > CARDS_PER_PAGE) setCardsLength(CARDS_PER_PAGE);
  }, [transfersFilter, priceFilter, airlinesFilter]);

  const showMoreHandler = useCallback(() => {
    setCardsLength(prev => prev + CARDS_PER_PAGE);
  }, []);

  return { flights, showMoreHandler, showMoreButtonDisabled: !haveItemsForDisplaying };
};
