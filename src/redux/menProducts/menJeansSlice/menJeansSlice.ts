import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductCategory } from 'src/redux/types/types';
import { RootState } from 'src/store';

interface ProductState {
  MenJeans: ProductCategory | null; // The product details or null if not loaded
  isLoading: 'idle' | 'loading' | 'succeeded' | 'failed'; // Use string union for loading states
  hasError: string | null; // Store error messages as strings
}

// Define initial state
const initialState: ProductState = {
  MenJeans: null,
  isLoading: 'idle',
  hasError: null,
};

const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: 'men jeans',
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
  },
};

export const getMenJeans = createAsyncThunk<ProductCategory>(
  'MenJeansList/getMenJeans',
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const MenJeansSlice = createSlice({
  name: 'MenJeansList',
  reducers: {},
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getMenJeans.pending, state => {
        state.isLoading = 'loading';
      })
      .addCase(getMenJeans.fulfilled, (state, action: PayloadAction<ProductCategory>) => {
        state.MenJeans = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getMenJeans.rejected, (state, action) => {
        state.hasError = action.error.message || 'Failed to fetch products';
        state.isLoading = 'failed';
      });
  },
});

// Selectors
export const selectMenJeans = (state: RootState): ProductCategory | null =>
  state.MenJeansList.MenJeans;
export const selectLoadingState = (state: RootState): 'idle' | 'loading' | 'succeeded' | 'failed' =>
  state.MenJeansList.isLoading;
export const selectErrorState = (state: RootState): string | null => state.MenJeansList.hasError;

export default MenJeansSlice.reducer;
