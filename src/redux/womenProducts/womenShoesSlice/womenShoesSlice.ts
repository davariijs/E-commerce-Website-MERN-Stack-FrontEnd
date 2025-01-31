import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductCategory } from "src/redux/types/types";
import { RootState } from "src/store";

interface ProductState {
  WomenShoes: ProductCategory | null; // The product details or null if not loaded
  isLoading: 'idle' | 'loading' | 'succeeded' | 'failed'; // Use string union for loading states
  hasError: string | null; // Store error messages as strings
}

// Define initial state
const initialState: ProductState = {
  WomenShoes: null,
  isLoading: 'idle',
  hasError: null,
};

const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: 'women shoes',
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST
  }
};


export const getWomenShoes = createAsyncThunk<ProductCategory>(
  "WomenShoesList/getWomenShoes", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const WomenShoesSlice = createSlice({
  name: "WomenShoesList",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWomenShoes.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(getWomenShoes.fulfilled, (state, action: PayloadAction<ProductCategory>) => {
        state.WomenShoes = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getWomenShoes.rejected, (state, action) => {
        state.hasError = action.error.message || "Failed to fetch products";
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectWomenShoes = (state:RootState):ProductCategory | null => state.WomenShoesList.WomenShoes;
export const selectLoadingState = (state:RootState):'idle' | 'loading' | 'succeeded' | 'failed' => state.WomenShoesList.isLoading;
export const selectErrorState = (state:RootState):string | null => state.WomenShoesList.hasError;

export default WomenShoesSlice.reducer;