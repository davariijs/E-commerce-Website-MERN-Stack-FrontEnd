import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductCategory } from 'src/redux/types/types';
import { RootState } from 'src/store';

interface ProductState {
  MenTShirts: ProductCategory | null; // The product details or null if not loaded
  isLoading: 'idle' | 'loading' | 'succeeded' | 'failed'; // Use string union for loading states
  hasError: string | null; // Store error messages as strings
}

// Define initial state
const initialState: ProductState = {
  MenTShirts: null,
  isLoading: 'idle',
  hasError: null,
};

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
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
  },
};

export const getMenTShirts = createAsyncThunk<ProductCategory>(
  'MenTShirtsList/getMenTShirts',
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const MenTShirtsSlice = createSlice({
  name: 'MenTShirtsList',
  reducers: {},
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getMenTShirts.pending, state => {
        state.isLoading = 'loading';
      })
      .addCase(getMenTShirts.fulfilled, (state, action: PayloadAction<ProductCategory>) => {
        state.MenTShirts = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getMenTShirts.rejected, (state, action) => {
        state.hasError = action.error.message || 'Failed to fetch products';
        state.isLoading = 'failed';
      });
  },
});

// Selectors
export const selectMenTShirts = (state: RootState): ProductCategory | null =>
  state.MenTShirtsList.MenTShirts;
export const selectLoadingState = (state: RootState): 'idle' | 'loading' | 'succeeded' | 'failed' =>
  state.MenTShirtsList.isLoading;
export const selectErrorState = (state: RootState): string | null => state.MenTShirtsList.hasError;

export default MenTShirtsSlice.reducer;
