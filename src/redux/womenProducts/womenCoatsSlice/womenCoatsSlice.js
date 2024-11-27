import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: 'women coat',
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST
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