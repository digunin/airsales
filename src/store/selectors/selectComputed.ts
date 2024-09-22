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
    const airline = flight.flight.carrier.caption;
    total[airline] = true;
  }
  return Object.keys(total).join('\n');
});

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
  return `${+onestop}-${+nonstop}`;
});
