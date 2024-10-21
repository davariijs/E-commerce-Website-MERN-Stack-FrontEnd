import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const uriRequest = {
  method: 'GET',
  url: 'https://real-time-product-search.p.rapidapi.com/search-v2',
  params: {
    q: 'men T-shirt',
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

export const getMenTShirts = createAsyncThunk(
  "MenTShirtsList/getMenTShirts", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const MenTShirtsSlice = createSlice({
  name: "MenTShirtsList",
  initialState: {
    MenTShirts: {},
    isLoading: 'idle',
    hasError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenTShirts.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(getMenTShirts.fulfilled, (state, action) => {
        state.MenTShirts = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getMenTShirts.rejected, (state, action) => {
        state.hasError = action.hasError.message;
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectMenTShirts = state => state.MenTShirtsList.MenTShirts;
export const selectLoadingState = state => state.MenTShirtsList.isLoading;
export const selectErrorState = state => state.MenTShirtsList.hasError;

export default MenTShirtsSlice.reducer;