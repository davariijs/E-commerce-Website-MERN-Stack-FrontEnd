import { createSlice } from "@reduxjs/toolkit";



const filterProductsSlice = createSlice({
  name: "filterProducts",
  initialState: {
    valuesFilter: [19,200],
  },
  reducers: {
    setValuesFilter: (state, action) => {
        state.valuesFilter = action.payload
      },
  }
});

// Selectors
export const selectFilterPrices = state => state.filterProducts.valuesFilter;

//reducers
export const { setValuesFilter } = filterProductsSlice.actions;

export default filterProductsSlice.reducer;