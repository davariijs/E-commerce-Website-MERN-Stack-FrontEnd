import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/categories/list',
  headers: {
    'x-rapidapi-key': '00294b188cmsh073ec3f6bd696bfp1baaa8jsnfb66ceaea66b',
    'x-rapidapi-host': 'kohls.p.rapidapi.com',
    "Access-Control-Allow-Origin": "http://localhost:3000/",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT",
    "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  }
};

export const getWomenDresses = createAsyncThunk(
  "womenDressesList/getWomenDresses", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const womenDressesSlice = createSlice({
  name: "womenDressesList",
  initialState: {
    womenDress: {},
    isLoading: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWomenDresses.pending, (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    })
      .addCase(getWomenDresses.fulfilled, (state, action) => {
        state.womenDress = action.payload;
        state.isLoading = false;
        state.hasError = false
      })
      .addCase(getWomenDresses.rejected, (state, action) => {
        state.hasError = true
        state.isLoading = false;
      })
  }
});

// Selectors
export const selectwomenDresses = state => state.womenDressesList.womenDress;
export const selectLoadingState = state => state.womenDressesList.isLoading;
export const selectErrorState = state => state.womenDressesList.hasError;

export default womenDressesSlice.reducer;