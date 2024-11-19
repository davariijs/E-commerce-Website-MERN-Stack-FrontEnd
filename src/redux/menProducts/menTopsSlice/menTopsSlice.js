import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const uriRequest = {
  method: 'GET',
  url: 'https://real-time-product-search.p.rapidapi.com/search',
  params: {
    q: 'men tops',
    country: 'us, au, ca',
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

export const getMenTops = createAsyncThunk(
  "MenTopsList/getMenTops", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const MenTopsSlice = createSlice({
  name: "MenTopsList",
  initialState: {
    menTops: {},
    isLoading: 'idle',
    hasError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenTops.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(getMenTops.fulfilled, (state, action) => {
        state.menTops = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getMenTops.rejected, (state, action) => {
        state.hasError = action.hasError.message;
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectMenTops = state => state.MenTopsList.menTops;
export const selectLoadingState = state => state.MenTopsList.isLoading;
export const selectErrorState = state => state.MenTopsList.hasError;

export default MenTopsSlice.reducer;