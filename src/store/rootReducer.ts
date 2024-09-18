import { flightsAPI } from "../api/flightsAPI";
import sortingState from "./slices/sortingSlice";

export default {
  sortingState,
  [flightsAPI.reducerPath]: flightsAPI.reducer,
};
