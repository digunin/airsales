import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { FiltersState } from '../types';
import { selectAllFlights } from './allFlightsSelector';
import {
  airlinesFilterPredicate,
  filterPredicate,
  priceFilterPredicate,
  transfersFilterPredicate,
} from './filterPredicates';

export const selectTransfersFilter = createSelector(
  (state: RootState) => state.filterState.transfers,
  transfers => transfers,
);

export const selectPriceFilter = createSelector(
  (state: RootState) => state.filterState.price,
  price => price,
);

export const selectAirlinesFilter = createSelector(
  (state: RootState) => state.filterState.airlines,
  airlines => airlines,
);

export const selectFilteredFlights = createSelector(
  selectAllFlights,
  selectTransfersFilter,
  selectPriceFilter,
  selectAirlinesFilter,
  (flights, transfers, price, airlines) => {
    return flights.filter(
      filterPredicate(
        { transfers, airlines, price },
        transfersFilterPredicate,
        priceFilterPredicate,
        airlinesFilterPredicate,
      ),
    );
  },
);

export const selectFilteredByTransferAndPrice = createSelector(
  selectAllFlights,
  selectTransfersFilter,
  selectPriceFilter,
  (flights, transfers, price) => {
    const filters = { transfers, price, airlines: [] };
    if (isEmptyFilters(filters)) return flights;
    return flights.filter(filterPredicate(filters, transfersFilterPredicate, priceFilterPredicate));
  },
);

export const selectFilteredByPriceAndAirlines = createSelector(
  selectAllFlights,
  selectPriceFilter,
  selectAirlinesFilter,
  (flights, price, airlines) => {
    const filters = { price, airlines, transfers: { nonstop: false, oneStop: false } };
    if (isEmptyFilters(filters)) return flights;
    return flights.filter(filterPredicate(filters, priceFilterPredicate, airlinesFilterPredicate));
  },
);

const isEmptyFilters = ({ transfers, price, airlines }: FiltersState) => {
  if (transfers.nonstop || transfers.oneStop) return false;
  if (airlines.length > 0) return false;
  if (price.from || price.to) return false;
  return true;
};
