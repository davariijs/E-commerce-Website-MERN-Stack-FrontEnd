import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductCategory } from "src/redux/types/types";
import { RootState } from "src/store";

interface ProductState {
  MenShoes: ProductCategory | null; // The product details or null if not loaded
  isLoading: 'idle' | 'loading' | 'succeeded' | 'failed'; // Use string union for loading states
  hasError: string | null; // Store error messages as strings
}

// Define initial state
const initialState: ProductState = {
  MenShoes: null,
  isLoading: 'idle',
  hasError: null,
};


const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: 'men shoes',
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST
  }
};

export const getMenShoes = createAsyncThunk<ProductCategory>(
  "MenShoesList/getMenShoes", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const MenShoesSlice = createSlice({
  name: "MenShoesList",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMenShoes.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(getMenShoes.fulfilled, (state, action: PayloadAction<ProductCategory>) => {
        state.MenShoes = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getMenShoes.rejected, (state, action) => {
        state.hasError = action.error.message || "Failed to fetch products";
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectMenShoes = (state:RootState):ProductCategory | null => state.MenShoesList.MenShoes;
export const selectLoadingState = (state:RootState):'idle' | 'loading' | 'succeeded' | 'failed' => state.MenShoesList.isLoading;
export const selectErrorState = (state:RootState):string | null => state.MenShoesList.hasError;

export default MenShoesSlice.reducer;