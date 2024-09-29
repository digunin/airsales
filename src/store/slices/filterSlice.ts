import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FiltersState, TransferPayload } from '../types';

const initialState: FiltersState = {
  transfers: [false, false],
  price: { from: null, to: null },
  airlines: [],
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setTransfers: (state, action: PayloadAction<TransferPayload>) => {
      const [index, value] = action.payload;
      state.transfers[index] = value;
    },
    setPriceFrom: (state, action: PayloadAction<number | null>) => {
      state.price.from = action.payload;
    },
    setPriceTo: (state, action: PayloadAction<number | null>) => {
      state.price.to = action.payload;
    },
    toggleAirline: (state, action: PayloadAction<string>) => {
      const index = state.airlines.findIndex(airline => airline === action.payload);
      if (index < 0) {
        state.airlines.push(action.payload);
        return;
      }
      state.airlines.splice(index, 1);
    },
  },
});

export const { setTransfers, setPriceFrom, setPriceTo, toggleAirline } = filterSlice.actions;

export default filterSlice.reducer;
