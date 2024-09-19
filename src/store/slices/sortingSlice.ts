import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortMode, SortingState, SortOrder } from '../types';

const initialState: SortingState = {
  mode: 'price',
  order: 'asc',
};

const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    setSortMode: (state, action: PayloadAction<SortMode>) => {
      state.mode = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
  },
});

export const { setSortMode, setSortOrder } = sortingSlice.actions;

export default sortingSlice.reducer;
