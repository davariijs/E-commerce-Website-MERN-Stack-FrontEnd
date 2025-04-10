import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductCategory } from 'src/redux/types/types';
import { RootState } from 'src/store';

interface ProductState {
  WomenCoats: ProductCategory | null; // The product details or null if not loaded
  isLoading: 'idle' | 'loading' | 'succeeded' | 'failed'; // Use string union for loading states
  hasError: string | null; // Store error messages as strings
}

// Define initial state
const initialState: ProductState = {
  WomenCoats: null,
  isLoading: 'idle',
  hasError: null,
};

const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: 'women coat',
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
  },
};

export const getWomenCoats = createAsyncThunk<ProductCategory>(
  'WomenCoatsList/getWomenCoats',
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const womenCoatsSlice = createSlice({
  name: 'WomenCoatsList',
  reducers: {},
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getWomenCoats.pending, state => {
        state.isLoading = 'loading';
      })
      .addCase(getWomenCoats.fulfilled, (state, action: PayloadAction<ProductCategory>) => {
        state.WomenCoats = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getWomenCoats.rejected, (state, action) => {
        state.hasError = action.error.message || 'Failed to fetch products';
        state.isLoading = 'failed';
      });
  },
});

// Selectors
export const selectWomenCoats = (state: RootState): ProductCategory | null =>
  state.WomenCoatsList.WomenCoats;
export const selectLoadingState = (state: RootState): 'idle' | 'loading' | 'succeeded' | 'failed' =>
  state.WomenCoatsList.isLoading;
export const selectErrorState = (state: RootState): string | null => state.WomenCoatsList.hasError;

export default womenCoatsSlice.reducer;
