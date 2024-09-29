import { createSelector } from '@reduxjs/toolkit';
import { selectAllFlights } from './allFlightsSelector';
import { shallowEqual } from 'react-redux';
import {
  selectFilteredByPriceAndAirlines,
  selectFilteredByTransferAndPrice,
  selectFilteredFlights,
} from './filteredSelector';
import { getFlightSummary } from './utils';

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

export const selectAvailableAirlines = createSelector(selectFilteredByTransferAndPrice, flights => {
  const total: { [key: string]: true } = {};
  for (const flight of flights) {
    total[flight.flight.carrier.caption] = true;
  }
  return Object.keys(total).join('\n');
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
  const availableTransfers: boolean[] = [];
  for (const flight of flights) {
    const summary = getFlightSummary(flight);
    const transfers = summary.fromHome.transfers;
    availableTransfers[transfers] = true;
  }
  return availableTransfers.map(item => +item).join('-');
});
