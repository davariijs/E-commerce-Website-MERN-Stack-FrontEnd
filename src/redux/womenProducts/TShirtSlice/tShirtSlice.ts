import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductCategory } from "src/redux/types/types";
import { RootState } from "src/store";


interface ProductState {
  WomenTShirts: ProductCategory | null; // The product details or null if not loaded
  isLoading: 'idle' | 'loading' | 'succeeded' | 'failed'; // Use string union for loading states
  hasError: string | null; // Store error messages as strings
}

// Define initial state
const initialState: ProductState = {
  WomenTShirts: null,
  isLoading: 'idle',
  hasError: null,
};

const uriRequest = {
  method: 'GET',
  url: 'https://kohls.p.rapidapi.com/products/list',
  params: {
    limit: '48',
    offset: '8',
    keyword: 'women T-shirt',
  },
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST
  }
};

export const getWomenTShirts = createAsyncThunk<ProductCategory>(
  "womenTShirtsList/getWomenTShirts", 
  async () => {
    try {
      const response = await axios.request(uriRequest);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const WomenTShirtsSlice = createSlice({
  name: "womenTShirtsList",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWomenTShirts.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(getWomenTShirts.fulfilled, (state, action: PayloadAction<ProductCategory>) => {
        state.WomenTShirts = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(getWomenTShirts.rejected, (state, action) => {
        state.hasError = action.error.message || "Failed to fetch products";
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectWomenTShirts = (state:RootState):ProductCategory | null => state.womenTShirtsList.WomenTShirts;
export const selectLoadingState = (state:RootState):'idle' | 'loading' | 'succeeded' | 'failed' => state.womenTShirtsList.isLoading;
export const selectErrorState = (state:RootState):string | null => state.womenTShirtsList.hasError;

export default WomenTShirtsSlice.reducer;