import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


export interface WishListItem {
  _id?: string,
  title: string,
  image: string,
  price: string,
  pathname:string,
  uid: string,
}

// Define CartState type
interface WishListState {
  items: WishListItem[], // Wishlist items
  loading: boolean, // Loading state for async actions
  error: string | null, // Error state for async actions
}

// Define initial state
const initialState: WishListState =  {
  items: [], // Wishlist items
  loading: false, // Loading state for async actions
  error: null, // Error state for async actions
}

// Async thunk to fetch wishlist from MongoDB
export const fetchWishlist = createAsyncThunk("wishlist/fetchWishlist", async (uid: string | null , { rejectWithValue }) => {
  try {
  const response = await axios.get(`${process.env.REACT_APP_URL_API}/add-wishlist/${uid}`);
  return response.data;
  } catch (error: any) {
    console.error('Error fetching wishlist:', error);
    return rejectWithValue(error.response?.data || error.message);
  }
  
});


const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Add item to Redux only (for optimistic updates or local-only wishlist)
    addToWishlist: (state, action) => {
      state.items.push(action.payload);
    },
    // Remove item from Redux
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action: PayloadAction<WishListState['items']>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;