import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'src/store';

interface Product  {
  id?: string;
  webID?: number;
  productTitle: string;
  price: {
    regularPrice: {
      minPrice: number;
    };
  };
  url: string;
  brand: string;
  avgRating?: number;
  sizeChartURL?: string;
  color: string;
  minPrice: number;
  videos?: { url: string }[];
  images: { url: string }[];
  swatchImages: { URL: string; color: string }[];
  styleGuide?: {
    sizeChartURL?: string;
  };
}

interface Payload {
  products: Product[];
}

interface ProductDetails {
  payload: Payload;
}

interface ProductState {
  ProductsDetails: ProductDetails | null; // The product details or null if not loaded
  isLoading: 'idle' | 'loading' | 'succeeded' | 'failed'; // Use string union for loading states
  hasError: string | null; // Store error messages as strings
}

// Define initial state
const initialState: ProductState = {
  ProductsDetails: null,
  isLoading: 'idle',
  hasError: null,
};

// Create the async thunk
export const fetchProductDetails = createAsyncThunk<ProductDetails, number | string>(
  'ProductsDetailsList/getDetails',
  async (productId) => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://kohls.p.rapidapi.com/products/detail',
        params: { webID: productId }, // Pass the dynamic parameter here
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
          'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
        },
      });

      // Return the API response
      return response.data;
    } catch (error:any) {
      console.error(error);
      throw error;
    }
  }
);


const productsDetailsSlice = createSlice({
  name: "ProductsDetailsList",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
      state.isLoading = 'loading';
    })
      .addCase(fetchProductDetails.fulfilled, (state, action:PayloadAction<ProductDetails>) => {
        state.ProductsDetails = action.payload;
        state.isLoading = 'succeeded';
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.hasError = action.error.message || 'Failed to fetch product details';
        state.isLoading = 'failed';
      })
  }
});

// Selectors
export const selectProductsDetails =( state:RootState ): ProductDetails | null=> state.ProductsDetailsList.ProductsDetails;
export const selectLoadingState =( state:RootState ): 'idle' | 'loading' | 'succeeded' | 'failed'=> state.ProductsDetailsList.isLoading;
export const selectErrorState =( state:RootState ): string | null=> state.ProductsDetailsList.hasError;

export default productsDetailsSlice.reducer;