import { createSelector } from '@reduxjs/toolkit';
import { flightsAPI } from '../../api/flightsAPI';
import { Flight } from '../types';

export const selectAllFlights = createSelector(flightsAPI.endpoints.loadData.select(), loadedData => {
  const emptyData: Flight[] = [];
  return loadedData.data?.result.flights || emptyData;
});
