import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductCategory } from 'src/redux/types/types';
import { RootState } from 'src/store';

interface ProductState {
  MenCoats: ProductCategory | null; // The product details or null if not loaded
  isLoading: 'idle' | 'loading' | 'succeeded' | 'failed'; // Use string union for loading states
  hasError: string | null; // Store error messages as strings
}

// Define initial state
const initialState: ProductState = {
  MenCoats: null,
  isLoading: 'idle',
  hasError: null,
};

const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: 'men coat',
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
  },
};

export const getMenCoats = createAsyncThunk<ProductCategory>(
  'MenCoatsList/getMenCoats',
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const MenCoatsSlice = createSlice({
  name: 'MenCoatsList',
  reducers: {},
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getMenCoats.pending, state => {
        state.isLoading = 'loading';
      })
      .addCase(getMenCoats.fulfilled, (state, action: PayloadAction<ProductCategory>) => {
        state.MenCoats = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getMenCoats.rejected, (state, action) => {
        state.hasError = action.error.message || 'Failed to fetch products';
        state.isLoading = 'failed';
      });
  },
});

// Selectors
export const selectMenCoats = (state: RootState): ProductCategory | null =>
  state.MenCoatsList.MenCoats;
export const selectLoadingState = (state: RootState): 'idle' | 'loading' | 'succeeded' | 'failed' =>
  state.MenCoatsList.isLoading;
export const selectErrorState = (state: RootState): string | null => state.MenCoatsList.hasError;

export default MenCoatsSlice.reducer;
