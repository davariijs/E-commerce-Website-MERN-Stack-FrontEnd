import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: 'men T-shirt',
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST
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