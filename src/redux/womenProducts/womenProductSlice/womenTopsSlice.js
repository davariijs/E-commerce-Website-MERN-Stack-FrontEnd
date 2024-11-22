import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: 'women top',
  },
  headers: {
    'x-rapidapi-key': '3699a5185fmshe0db227da19099cp1a6b23jsn73e9b3010639',
    'x-rapidapi-host': 'kohls.p.rapidapi.com'
  }
};

export const getWomenDresses = createAsyncThunk(
  "womenTopsList/getWomenDresses", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const womenTopsSlice = createSlice({
  name: "womenTopsList",
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
export const selectwomenDresses = state => state.womenTopsList.womenDress;
export const selectLoadingState = state => state.womenTopsList.isLoading;
export const selectErrorState = state => state.womenTopsList.hasError;

export default womenTopsSlice.reducer;