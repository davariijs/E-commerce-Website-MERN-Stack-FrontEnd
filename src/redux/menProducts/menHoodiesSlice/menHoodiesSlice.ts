import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductCategory } from "src/redux/types/types";
import { RootState } from "src/store";

interface ProductState {
  MenHoodies: ProductCategory | null; // The product details or null if not loaded
  isLoading: 'idle' | 'loading' | 'succeeded' | 'failed'; // Use string union for loading states
  hasError: string | null; // Store error messages as strings
}

// Define initial state
const initialState: ProductState = {
    MenHoodies: null,
    isLoading: 'idle',
    hasError: null,
};

const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: "men hoodie",
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST
  }
};

export const getMenHoodies = createAsyncThunk<ProductCategory>(
  "MenHoodiesList/getMenHoodies", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const MenHoodiesSlice = createSlice({
  name: "MenHoodiesList",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMenHoodies.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(getMenHoodies.fulfilled, (state, action: PayloadAction<ProductCategory>) => {
        state.MenHoodies = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getMenHoodies.rejected, (state, action) => {
        state.hasError = action.error.message || "Failed to fetch products";
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectMenHoodies = (state:RootState):ProductCategory | null => state.MenHoodiesList.MenHoodies;
export const selectLoadingState = (state:RootState):'idle' | 'loading' | 'succeeded' | 'failed' => state.MenHoodiesList.isLoading;
export const selectErrorState = (state:RootState):string | null => state.MenHoodiesList.hasError;

export default MenHoodiesSlice.reducer;