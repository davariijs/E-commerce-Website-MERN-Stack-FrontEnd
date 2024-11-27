import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
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
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST
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