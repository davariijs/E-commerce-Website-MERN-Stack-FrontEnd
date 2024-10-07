import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const uriRequest = {
  method: 'GET',
  url: 'https://real-time-product-search.p.rapidapi.com/search-v2',
  params: {
    q: 'women tops',
    country: 'us, au, ca',
    language: 'en',
    page: '1',
    limit: '20',
    sort_by: 'BEST_MATCH',
    product_condition: 'ANY'
  },
  headers: {
    'x-rapidapi-key': 'f236aab844msh35009131391f471p141ab5jsnc7a7e72d7c98',
    'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com'
  }
};

export const getWomenDresses = createAsyncThunk(
  "womenDressesList/getWomenDresses", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const womenDressesSlice = createSlice({
  name: "womenDressesList",
  initialState: {
    womenDress: {},
    isLoading: 'idle',
    hasError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWomenDresses.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(getWomenDresses.fulfilled, (state, action) => {
        state.womenDress = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getWomenDresses.rejected, (state, action) => {
        state.hasError = action.hasError.message;
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectwomenDresses = state => state.womenDressesList.womenDress;
export const selectLoadingState = state => state.womenDressesList.isLoading;
export const selectErrorState = state => state.womenDressesList.hasError;

export default womenDressesSlice.reducer;