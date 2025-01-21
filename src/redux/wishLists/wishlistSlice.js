import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch wishlist from MongoDB
export const fetchWishlist = createAsyncThunk("wishlist/fetchWishlist", async (uid) => {
  const response = await axios.get(`http://localhost:5000/add-wishlist/${uid}`);
  return response.data;
});


const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [], // Wishlist items
    loading: false, // Loading state for async actions
    error: null, // Error state for async actions
  },
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
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;