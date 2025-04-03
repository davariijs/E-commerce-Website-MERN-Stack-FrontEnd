import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductCategory } from 'src/redux/types/types';
import { RootState } from 'src/store';

interface ProductState {
  SearchResults: ProductCategory | null; // The product details or null if not loaded
  isLoading: boolean; // Use string union for loading states
  hasError: string | null; // Store error messages as strings
}

// Define initial state
const initialState: ProductState = {
  SearchResults: null,
  isLoading: false,
  hasError: null,
};

interface UriRequest {
  method: 'GET';
  url: string;
  params: {
    limit: string;
    offset: string;
    keyword: string;
  };
  headers: {
    'x-rapidapi-key': string | undefined;
    'x-rapidapi-host': string | undefined;
  };
}

// Create the request configuration with proper types
const createUriRequest = (query: string): UriRequest => ({
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: query,
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
  },
});

// Async thunk to fetch search results
export const fetchSearchResults = createAsyncThunk<ProductCategory, string>(
  'SearchList/fetchSearchResults',
  async (query: string): Promise<ProductCategory> => {
    try {
      // Use the request configuration
      const uriRequest = createUriRequest(query);

      // Make the request with axios
      const response = await axios.request<ProductCategory>({
        method: uriRequest.method,
        url: uriRequest.url,
        params: uriRequest.params,
        headers: uriRequest.headers,
      });

      // Return the response data
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch search results');
    }
  }
);

const SearchSlice = createSlice({
  name: 'SearchList',
  reducers: {},
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchSearchResults.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action: PayloadAction<ProductCategory>) => {
        state.isLoading = false;
        state.SearchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = action.error.message || 'Failed to fetch products';
      });
  },
});

// Selectors
export const selectSearch = (state: RootState): ProductCategory | null =>
  state.SearchList.SearchResults;
export const selectLoadingState = (state: RootState): boolean => state.SearchList.isLoading;
export const selectErrorState = (state: RootState): string | null => state.SearchList.hasError;

export default SearchSlice.reducer;
