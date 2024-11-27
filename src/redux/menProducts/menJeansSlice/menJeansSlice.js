import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    q: "men jeans",
    country: 'us, au, ca, nz, tk, nf, hm, cx, cc',
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

export const getMenJeans = createAsyncThunk(
  "MenJeansList/getMenJeans", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const MenJeansSlice = createSlice({
  name: "MenJeansList",
  initialState: {
    MenJeans: {},
    isLoading: 'idle',
    hasError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenJeans.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(getMenJeans.fulfilled, (state, action) => {
        state.MenJeans = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getMenJeans.rejected, (state, action) => {
        state.hasError = action.hasError.message;
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectMenJeans = state => state.MenJeansList.MenJeans;
export const selectLoadingState = state => state.MenJeansList.isLoading;
export const selectErrorState = state => state.MenJeansList.hasError;

export default MenJeansSlice.reducer;