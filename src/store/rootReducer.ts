import { flightsAPI } from '../api/flightsAPI';
import filterState from './slices/filterSlice';
import sortingState from './slices/sortingSlice';

export default {
  sortingState,
  filterState,
  [flightsAPI.reducerPath]: flightsAPI.reducer,
};
