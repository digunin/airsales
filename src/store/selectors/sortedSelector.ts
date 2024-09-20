import { createSelector } from '@reduxjs/toolkit';
import { selectAllFlights } from './allFlightsSelector';
import { RootState } from '..';
import {
  fromDeaprtureTimeToReturningTime,
  fromHomeFlightDuration,
  returnToHomeFlightDuration,
  totalFlightsDuration,
} from './utils';

export const selectSortParams = createSelector(
  (state: RootState) => state.sortingState,
  sortingState => sortingState,
);

export const selectSortedFlights = createSelector(selectAllFlights, selectSortParams, (flights, { mode, order }) => {
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
});
