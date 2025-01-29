import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: "men coat",
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST
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