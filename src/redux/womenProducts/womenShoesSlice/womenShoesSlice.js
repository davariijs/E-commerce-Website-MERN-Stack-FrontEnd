import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: 'women shoes',
  },
  headers: {
    'x-rapidapi-key': '3699a5185fmshe0db227da19099cp1a6b23jsn73e9b3010639',
    'x-rapidapi-host': 'kohls.p.rapidapi.com'
  }
};


export const getWomenShoes = createAsyncThunk(
  "WomenShoesList/getWomenShoes", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const WomenShoesSlice = createSlice({
  name: "WomenShoesList",
  initialState: {
    WomenShoes: {},
    isLoading: 'idle',
    hasError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWomenShoes.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(getWomenShoes.fulfilled, (state, action) => {
        state.WomenShoes = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getWomenShoes.rejected, (state, action) => {
        state.hasError = action.hasError.message;
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectWomenShoes = state => state.WomenShoesList.WomenShoes;
export const selectLoadingState = state => state.WomenShoesList.isLoading;
export const selectErrorState = state => state.WomenShoesList.hasError;

export default WomenShoesSlice.reducer;