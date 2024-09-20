import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { selectSortedFlights } from './sortedSelector';
import { FiltersState, Flight } from '../types';
import { getFlightSummary } from './utils';

export const selectFilters = createSelector(
  (state: RootState) => state.filterState,
  filterState => filterState,
);

export const selectFilteredFlights = createSelector(selectSortedFlights, selectFilters, (flights, filters) => {
  if (isEmptyFilters(filters)) return flights;
  return flights.filter(filterPredicate(filters));
});

const filterPredicate = (filters: FiltersState) => (flight: Flight) => {
  const flightSummary = getFlightSummary(flight);
  const { nonstop, oneStop } = filters.transfers;

  if (!!nonstop !== !!oneStop) {
    if (!checkTransfers(filters, flightSummary)) return false;
  }

  if (!checkPrice(filters, flight.flight.price.total.amount)) return false;

  if (filters.airlines.length) {
    if (!checkAirlines(filters, flightSummary)) return false;
  }
  return true;
};

const checkTransfers = (filters: FiltersState, summary: ReturnType<typeof getFlightSummary>) => {
  const { fromHome } = summary;
  const { nonstop } = filters.transfers;
  const allowedTransfers = nonstop ? 0 : 1;
  if (fromHome.transfers !== allowedTransfers) return false;
  return true;
};

const checkPrice = (filters: FiltersState, price: number | string) => {
  price = Number(price);
  const { from, to } = filters.price;
  if (from != null) {
    if (price < from) return false;
  }
  if (to != null) {
    if (price > to) return false;
  }
  return true;
};

const checkAirlines = (filters: FiltersState, summary: ReturnType<typeof getFlightSummary>) => {
  return filters.airlines.includes(summary.fromHome.departureSegment.airline.caption);
};

const isEmptyFilters = ({ transfers, price, airlines }: FiltersState) => {
  if (transfers.nonstop || transfers.oneStop) return false;
  if (airlines.length) return false;
  if (price.from || price.to) return false;
  return true;
};
