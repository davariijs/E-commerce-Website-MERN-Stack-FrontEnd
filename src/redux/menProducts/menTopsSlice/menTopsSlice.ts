import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductCategory } from 'src/redux/types/types';
import { RootState } from 'src/store';

interface ProductState {
  menTops: ProductCategory | null; // The product details or null if not loaded
  isLoading: 'idle' | 'loading' | 'succeeded' | 'failed'; // Use string union for loading states
  hasError: string | null; // Store error messages as strings
}

// Define initial state
const initialState: ProductState = {
  menTops: null,
  isLoading: 'idle',
  hasError: null,
};

const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: 'men tops',
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
  },
};

export const getMenTops = createAsyncThunk<ProductCategory>('MenTopsList/getMenTops', async () => {
  try {
    const response = await axios.request(uriRequest);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
});

const MenTopsSlice = createSlice({
  name: 'MenTopsList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMenTops.pending, state => {
        state.isLoading = 'loading';
      })
      .addCase(getMenTops.fulfilled, (state, action: PayloadAction<ProductCategory>) => {
        state.menTops = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getMenTops.rejected, (state, action) => {
        state.hasError = action.error.message || 'Failed to fetch products';
        state.isLoading = 'failed';
      });
  },
});

// Selectors
export const selectMenTops = (state: RootState): ProductCategory | null =>
  state.MenTopsList.menTops;
export const selectLoadingState = (state: RootState): 'idle' | 'loading' | 'succeeded' | 'failed' =>
  state.MenTopsList.isLoading;
export const selectErrorState = (state: RootState): string | null => state.MenTopsList.hasError;

export default MenTopsSlice.reducer;
