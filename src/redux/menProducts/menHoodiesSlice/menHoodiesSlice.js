import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: "men hoodie",
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST
  }
};

export const getMenHoodies = createAsyncThunk(
  "MenHoodiesList/getMenHoodies", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const MenHoodiesSlice = createSlice({
  name: "MenHoodiesList",
  initialState: {
    MenHoodies: {},
    isLoading: 'idle',
    hasError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenHoodies.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(getMenHoodies.fulfilled, (state, action) => {
        state.MenHoodies = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getMenHoodies.rejected, (state, action) => {
        state.hasError = action.hasError.message;
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectMenHoodies = state => state.MenHoodiesList.MenHoodies;
export const selectLoadingState = state => state.MenHoodiesList.isLoading;
export const selectErrorState = state => state.MenHoodiesList.hasError;

export default MenHoodiesSlice.reducer;