import { flightsAPI } from '../api/flightsAPI';
import filterSlice from './slices/filterSlice';
import sortingState from './slices/sortingSlice';

export default {
  sortingState,
  filterSlice,
  [flightsAPI.reducerPath]: flightsAPI.reducer,
};
