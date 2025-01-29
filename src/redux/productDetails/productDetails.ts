import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Create the async thunk
export const fetchProductDetails = createAsyncThunk(
  'ProductsDetailsList/getDetails',
  async (productId) => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://kohls.p.rapidapi.com/products/detail',
        params: { webID: productId }, // Pass the dynamic parameter here
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
          'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
        },
      });

      // Return the API response
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);


const productsDetailsSlice = createSlice({
  name: "ProductsDetailsList",
  initialState: {
    ProductsDetails: {},
    isLoading: 'idle',
    hasError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.ProductsDetails = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.hasError = action.hasError.message;
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectProductsDetails = state => state.ProductsDetailsList.ProductsDetails;
export const selectLoadingState = state => state.ProductsDetailsList.isLoading;
export const selectErrorState = state => state.ProductsDetailsList.hasError;

export default productsDetailsSlice.reducer;