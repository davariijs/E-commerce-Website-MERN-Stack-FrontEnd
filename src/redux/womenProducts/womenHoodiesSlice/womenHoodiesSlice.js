import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: 'women hoodie',
  },
  headers: {
    'x-rapidapi-key': '3699a5185fmshe0db227da19099cp1a6b23jsn73e9b3010639',
    'x-rapidapi-host': 'kohls.p.rapidapi.com'
  }
};

export const getWomenHoodies = createAsyncThunk(
  "WomenHoodiesList/getWomenHoodies", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const womenHoodiesSlice = createSlice({
  name: "WomenHoodiesList",
  initialState: {
    WomenHoodies: {},
    isLoading: 'idle',
    hasError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWomenHoodies.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(getWomenHoodies.fulfilled, (state, action) => {
        state.WomenHoodies = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getWomenHoodies.rejected, (state, action) => {
        state.hasError = action.hasError.message;
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectWomenHoodies = state => state.WomenHoodiesList.WomenHoodies;
export const selectLoadingState = state => state.WomenHoodiesList.isLoading;
export const selectErrorState = state => state.WomenHoodiesList.hasError;

export default womenHoodiesSlice.reducer;