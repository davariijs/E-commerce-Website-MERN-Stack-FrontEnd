import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const uriRequest = {
  method: 'GET',
  url: 'https://real-time-product-search.p.rapidapi.com/search',
  params: {
    q: "men coat",
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

export const getMenCoats = createAsyncThunk(
  "MenCoatsList/getMenCoats", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const MenCoatsSlice = createSlice({
  name: "MenCoatsList",
  initialState: {
    MenCoats: {},
    isLoading: 'idle',
    hasError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenCoats.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(getMenCoats.fulfilled, (state, action) => {
        state.MenCoats = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getMenCoats.rejected, (state, action) => {
        state.hasError = action.hasError.message;
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectMenCoats = state => state.MenCoatsList.MenCoats;
export const selectLoadingState = state => state.MenCoatsList.isLoading;
export const selectErrorState = state => state.MenCoatsList.hasError;

export default MenCoatsSlice.reducer;