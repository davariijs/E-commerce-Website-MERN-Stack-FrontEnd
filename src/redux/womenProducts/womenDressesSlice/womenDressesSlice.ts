import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductCategory } from "src/redux/types/types";
import { RootState } from "src/store";


interface ProductState {
  WomenDresses: ProductCategory | null; // The product details or null if not loaded
  isLoading: 'idle' | 'loading' | 'succeeded' | 'failed'; // Use string union for loading states
  hasError: string | null; // Store error messages as strings
}

// Define initial state
const initialState: ProductState = {
  WomenDresses: null,
  isLoading: 'idle',
  hasError: null,
};

const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: 'dress',
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST
  }
};

export const getWomenDresses = createAsyncThunk<ProductCategory>(
  "WomenDressesList/getWomenDresses", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const womenDressesSlice = createSlice({
  name: "WomenDressesList",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWomenDresses.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(getWomenDresses.fulfilled, (state, action: PayloadAction<ProductCategory>) => {
        state.WomenDresses = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getWomenDresses.rejected, (state, action) => {
        state.hasError = action.error.message || "Failed to fetch products";
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectWomenDresses = (state:RootState):ProductCategory | null => state.WomenDressesList.WomenDresses;
export const selectLoadingState = (state:RootState):'idle' | 'loading' | 'succeeded' | 'failed' => state.WomenDressesList.isLoading;
export const selectErrorState = (state:RootState):string | null => state.WomenDressesList.hasError;

export default womenDressesSlice.reducer;