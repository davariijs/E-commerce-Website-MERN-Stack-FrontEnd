import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: 'men shoes',
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST
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