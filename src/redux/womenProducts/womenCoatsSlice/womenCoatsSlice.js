import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const uriRequest = {
  method: 'GET',
  url: 'https://real-time-product-search.p.rapidapi.com/search-v2',
  params: {
    q: "women coat",
    country: 'us, au, ca, nz, tk, nf, hm, cx, cc',
    language: 'en',
    page: '1',
    limit: '100',
    sort_by: 'BEST_MATCH',
    product_condition: 'ANY'
  },
  headers: {
    'x-rapidapi-key': '3699a5185fmshe0db227da19099cp1a6b23jsn73e9b3010639',
    'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com'
  }
};

export const getWomenCoats = createAsyncThunk(
  "WomenCoatsList/getWomenCoats", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const womenCoatsSlice = createSlice({
  name: "WomenCoatsList",
  initialState: {
    WomenCoats: {},
    isLoading: 'idle',
    hasError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWomenCoats.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(getWomenCoats.fulfilled, (state, action) => {
        state.WomenCoats = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getWomenCoats.rejected, (state, action) => {
        state.hasError = action.hasError.message;
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectWomenCoats = state => state.WomenCoatsList.WomenCoats;
export const selectLoadingState = state => state.WomenCoatsList.isLoading;
export const selectErrorState = state => state.WomenCoatsList.hasError;

export default womenCoatsSlice.reducer;