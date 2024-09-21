import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { selectSortedFlights } from './sortedSelector';
import { FiltersState } from '../types';
import { selectAllFlights } from './allFlightsSelector';
import {
  airlinesFilterPredicate,
  filterPredicate,
  priceFilterPredicate,
  transfersFilterPredicate,
} from './filterPredicates';
import { getFlightSummary } from './utils';

export const selectFilters = createSelector(
  (state: RootState) => state.filterState,
  filterState => filterState,
);

export const selectFilteredFlights = createSelector(selectSortedFlights, selectFilters, (flights, filters) => {
  return flights.filter(
    filterPredicate(filters, transfersFilterPredicate, priceFilterPredicate, airlinesFilterPredicate),
  );
});

export const selectAirlinesWithPrice = createSelector(selectAllFlights, flights => {
  const total: { [key: string]: number } = {};
  for (const flight of flights) {
    const airLine = flight.flight.carrier.caption;
    const price = Number(flight.flight.price.total.amount);
    total[airLine] = Math.min(total[airLine] || price, price);
  }
  return Object.entries(total);
});

const selectFilteredByTransferAndPrice = createSelector(selectSortedFlights, selectFilters, (flights, filters) => {
  if (isEmptyFilters(filters)) return flights;
  return flights.filter(filterPredicate(filters, transfersFilterPredicate, priceFilterPredicate));
});

const selectFilteredByPriceAndAirlines = createSelector(selectSortedFlights, selectFilters, (flights, filters) => {
  if (isEmptyFilters(filters)) return flights;
  return flights.filter(filterPredicate(filters, priceFilterPredicate, airlinesFilterPredicate));
});

export const selectAvailableAirlines = createSelector(selectFilteredByTransferAndPrice, flights => {
  const total: string[] = [];
  for (const flight of flights) {
    const airline = flight.flight.carrier.caption;
    if (!total.includes(airline)) total.push(airline);
  }
  return total;
});

export const seletAvailableMinMaxPrice = createSelector(selectFilteredFlights, flights => {
  let minPrice = NaN;
  let maxPrice = NaN;
  for (const flight of flights) {
    const price = Number(flight.flight.price.total.amount);
    minPrice = Math.min(minPrice || price, price);
    maxPrice = Math.max(maxPrice || price, price);
  }
  return [minPrice, maxPrice];
});

export const selectAvailableTransfers = createSelector(selectFilteredByPriceAndAirlines, flights => {
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
});

const isEmptyFilters = ({ transfers, price, airlines }: FiltersState) => {
  if (transfers.nonstop || transfers.oneStop) return false;
  if (airlines.length) return false;
  if (price.from || price.to) return false;
  return true;
};
