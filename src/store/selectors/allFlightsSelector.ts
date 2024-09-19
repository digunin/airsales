import { RootState } from '..';
import { flightsAPI } from '../../api/flightsAPI';
import { Flight } from '../types';
import { createSelector } from '@reduxjs/toolkit';
import { fromHomeFlightDuration } from './getFlightDuration';

export const selectAllFlights = createSelector(flightsAPI.endpoints.loadData.select(), loadedData => {
  const emptyData: Flight[] = [];
  return loadedData.data?.result.flights || emptyData;
});

export const selectSortedFlights = createSelector(
  selectAllFlights,
  (state: RootState) => state.sortingState.mode,
  (flights, mode) => {
    if (mode === 'price-asc') {
      return flights.toSorted((f1, f2) => +f1.flight.price.total.amount - +f2.flight.price.total.amount);
    }
    if (mode === 'price-desc') {
      return flights.toSorted((f1, f2) => +f2.flight.price.total.amount - +f1.flight.price.total.amount);
    }
    if (mode === 'duration') {
      const computeDuration = fromHomeFlightDuration;
      return flights.toSorted((f1, f2) => {
        return computeDuration(f1) - computeDuration(f2);
      });
    }
    return flights;
  },
);
