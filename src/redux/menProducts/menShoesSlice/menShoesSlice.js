import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const uriRequest = {
  method: 'GET',
  url: 'https://real-time-product-search.p.rapidapi.com/search',
  params: {
    q: "men shoes",
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

export const getMenShoes = createAsyncThunk(
  "MenShoesList/getMenShoes", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const MenShoesSlice = createSlice({
  name: "MenShoesList",
  initialState: {
    MenShoes: {},
    isLoading: 'idle',
    hasError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenShoes.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(getMenShoes.fulfilled, (state, action) => {
        state.MenShoes = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getMenShoes.rejected, (state, action) => {
        state.hasError = action.hasError.message;
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectMenShoes = state => state.MenShoesList.MenShoes;
export const selectLoadingState = state => state.MenShoesList.isLoading;
export const selectErrorState = state => state.MenShoesList.hasError;

export default MenShoesSlice.reducer;