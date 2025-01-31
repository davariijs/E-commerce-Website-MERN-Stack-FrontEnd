import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductCategory } from "src/redux/types/types";
import { RootState } from "src/store";

interface ProductState {
  WomenHoodies: ProductCategory | null; // The product details or null if not loaded
  isLoading: 'idle' | 'loading' | 'succeeded' | 'failed'; // Use string union for loading states
  hasError: string | null; // Store error messages as strings
}

// Define initial state
const initialState: ProductState = {
  WomenHoodies: null,
  isLoading: 'idle',
  hasError: null,
};

const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: 'women hoodie',
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST
  }
};

export const getWomenHoodies = createAsyncThunk<ProductCategory>(
  "WomenHoodiesList/getWomenHoodies", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const womenHoodiesSlice = createSlice({
  name: "WomenHoodiesList",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWomenHoodies.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(getWomenHoodies.fulfilled, (state, action: PayloadAction<ProductCategory>) => {
        state.WomenHoodies = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getWomenHoodies.rejected, (state, action) => {
        state.hasError = action.error.message || "Failed to fetch products";
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectWomenHoodies = (state:RootState):ProductCategory | null => state.WomenHoodiesList.WomenHoodies;
export const selectLoadingState = (state:RootState):'idle' | 'loading' | 'succeeded' | 'failed' => state.WomenHoodiesList.isLoading;
export const selectErrorState = (state:RootState):string | null => state.WomenHoodiesList.hasError;

export default womenHoodiesSlice.reducer;