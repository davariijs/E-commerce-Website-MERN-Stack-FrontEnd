import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/store";

interface FilterState {
  valuesFilter: number[],
}

// Define initial state
const initialState: FilterState = {
  valuesFilter: [19,200],
};

const filterProductsSlice = createSlice({
  name: "filterProducts",
  initialState,
  reducers: {
    setValuesFilter: (state, action:PayloadAction<FilterState['valuesFilter']>) => {
        state.valuesFilter = action.payload
      },
  }
});

// Selectors
export const selectFilterPrices = (state:RootState) => state.filterProducts.valuesFilter;

//reducers
export const { setValuesFilter } = filterProductsSlice.actions;

export default filterProductsSlice.reducer;