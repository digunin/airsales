/* eslint-disable max-lines */
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
import { getFlightSummary } from './utils';
import { shallowEqual } from 'react-redux';

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

export const selectAirlinesWithPrice = createSelector(
  selectAllFlights,
  flights => {
    const total: { [key: string]: number } = {};
    for (const flight of flights) {
      const airLine = flight.flight.carrier.caption;
      const price = Number(flight.flight.price.total.amount);
      total[airLine] = Math.min(total[airLine] || price, price);
    }
    return total;
  },
  {
    memoizeOptions: { resultEqualityCheck: shallowEqual },
  },
);

const selectFilteredByTransferAndPrice = createSelector(
  selectAllFlights,
  selectTransfersFilter,
  selectPriceFilter,
  (flights, transfers, price) => {
    const filters = { transfers, price, airlines: [] };
    if (isEmptyFilters(filters)) return flights;
    return flights.filter(filterPredicate(filters, transfersFilterPredicate, priceFilterPredicate));
  },
);

const selectFilteredByPriceAndAirlines = createSelector(
  selectAllFlights,
  selectPriceFilter,
  selectAirlinesFilter,
  (flights, price, airlines) => {
    const filters = { price, airlines, transfers: { nonstop: false, oneStop: false } };
    if (isEmptyFilters(filters)) return flights;
    return flights.filter(filterPredicate(filters, priceFilterPredicate, airlinesFilterPredicate));
  },
);

export const selectAvailableAirlines = createSelector(
  selectFilteredByTransferAndPrice,
  flights => {
    const total: { [key: string]: true } = {};
    for (const flight of flights) {
      const airline = flight.flight.carrier.caption;
      total[airline] = true;
    }
    return total;
  },
  {
    memoizeOptions: { resultEqualityCheck: shallowEqual },
  },
);

export const seletAvailableMinMaxPrice = createSelector(
  selectFilteredFlights,
  flights => {
    let minPrice = NaN;
    let maxPrice = NaN;
    for (const flight of flights) {
      const price = Number(flight.flight.price.total.amount);
      minPrice = Math.min(minPrice || price, price);
      maxPrice = Math.max(maxPrice || price, price);
    }
    return [minPrice, maxPrice];
  },
  {
    memoizeOptions: { resultEqualityCheck: shallowEqual },
  },
);

export const selectAvailableTransfers = createSelector(
  selectFilteredByPriceAndAirlines,
  flights => {
    let onestop = false;
    let nonstop = false;
    for (const flight of flights) {
      const summary = getFlightSummary(flight);
      const transfers = summary.fromHome.transfers;
      if (!onestop) onestop = transfers === 1;
      if (!nonstop) nonstop = transfers === 0;
      if (onestop && nonstop) break;
    }
    return { onestop, nonstop };
  },
  {
    memoizeOptions: { resultEqualityCheck: shallowEqual },
  },
);

const isEmptyFilters = ({ transfers, price, airlines }: FiltersState) => {
  if (transfers.nonstop || transfers.oneStop) return false;
  if (airlines.length > 0) return false;
  if (price.from || price.to) return false;
  return true;
};
