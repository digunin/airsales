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

export const selectTransfersFilter = (state: RootState) => state.filterState.transfers;

export const selectPriceFilter = (state: RootState) => state.filterState.price;

export const selectAirlinesFilter = (state: RootState) => state.filterState.airlines;

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
    const filters = { price, airlines, transfers: [] };
    if (isEmptyFilters(filters)) return flights;
    return flights.filter(filterPredicate(filters, priceFilterPredicate, airlinesFilterPredicate));
  },
);

const isEmptyFilters = ({ transfers, price, airlines }: FiltersState) => {
  if (!transfers.every(item => !!item) || !transfers.every(item => !item)) return false;
  if (airlines.length > 0) return false;
  if (price.from || price.to) return false;
  return true;
};
