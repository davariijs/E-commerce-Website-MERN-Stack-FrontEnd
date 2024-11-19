import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




const uriRequest = {
  method: 'GET',
  url: 'https://real-time-product-search.p.rapidapi.com/product-details',
  params: {
    product_id: '11577822456427762145',
    country: 'us, au, ca, nz, tk, nf, hm, cx, cc',
    language: 'en'
  },
  headers: {
    'x-rapidapi-key': '3699a5185fmshe0db227da19099cp1a6b23jsn73e9b3010639',
    'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com'
  }
};

export const getSingleProduct = createAsyncThunk(
  "singleProductList/getSingleProduct", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const singleProductSlice = createSlice({
  name: "singleProductList",
  initialState: {
    singleProduct: {},
    isLoading: 'idle',
    hasError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProduct.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.singleProduct = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.hasError = action.hasError.message;
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectSingleProduct = state => state.singleProductList.singleProduct;
export const selectLoadingState = state => state.singleProductList.isLoading;
export const selectErrorState = state => state.singleProductList.hasError;

export default singleProductSlice.reducer;