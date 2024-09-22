import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import {
  fromDeaprtureTimeToReturningTime,
  fromHomeFlightDuration,
  returnToHomeFlightDuration,
  totalFlightsDuration,
} from './utils';
import { selectFilteredFlights } from './filteredSelector';

export const selectSortParams = createSelector(
  (state: RootState) => state.sortingState,
  sortingState => sortingState,
);

export const selectSortedFlights = createSelector(
  selectFilteredFlights,
  selectSortParams,
  (flights, { mode, order }) => {
    const modificator = order === 'asc' ? 1 : -1;
    if (mode === 'price') {
      return flights.toSorted(
        (f1, f2) => +f1.flight.price.total.amount * modificator - +f2.flight.price.total.amount * modificator,
      );
    }
    if (mode === 'duration-from-home') {
      const computeDuration = fromHomeFlightDuration;
      return flights.toSorted((f1, f2) => {
        return computeDuration(f1) * modificator - computeDuration(f2) * modificator;
      });
    }
    if (mode === 'duration-return-to-home') {
      const computeDuration = returnToHomeFlightDuration;
      return flights.toSorted((f1, f2) => {
        return computeDuration(f1) * modificator - computeDuration(f2) * modificator;
      });
    }
    if (mode === 'duration-total') {
      const computeDuration = totalFlightsDuration;
      return flights.toSorted((f1, f2) => {
        return computeDuration(f1) * modificator - computeDuration(f2) * modificator;
      });
    }
    if (mode === 'duration-from-departure-to-returning') {
      const computeDuration = fromDeaprtureTimeToReturningTime;
      return flights.toSorted((f1, f2) => {
        return computeDuration(f1) * modificator - computeDuration(f2) * modificator;
      });
    }
    return flights;
  },
);

export const selectSortedFlightsSlice = (length: number) =>
  createSelector(selectSortedFlights, flights => flights.slice(0, length));

export const selectHaveItemsToDisplaying = (lenthOfDisplayed: number) =>
  createSelector(selectSortedFlights, flights => flights.length > lenthOfDisplayed);
