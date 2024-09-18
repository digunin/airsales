import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlightsSorting, SortingState } from "../types";

const initialState: SortingState = {
  mode: "price-asc",
};

const sortingSlice = createSlice({
  name: "sorting",
  initialState,
  reducers: {
    setSortingMode: (state, action: PayloadAction<FlightsSorting>) => {
      state.mode = action.payload;
    },
  },
});

export const { setSortingMode } = sortingSlice.actions;

export default sortingSlice.reducer;
