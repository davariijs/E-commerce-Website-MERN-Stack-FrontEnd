import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authenticatedFetch } from "src/services/authService";

export interface WishListItem {
  _id?: string,
  title: string,
  image: string,
  price: string,
  pathname: string,
  uid: string,
}

interface WishListState {
  items: WishListItem[],
  loading: boolean,
  error: string | null,
}

const initialState: WishListState = {
  items: [],
  loading: false,
  error: null,
}

// Async thunk to fetch wishlist from MongoDB
export const fetchWishlist = createAsyncThunk("wishlist/fetchWishlist", 
  async (uid: string | null, { rejectWithValue }) => {
    try {
      const response = await authenticatedFetch(
        `${process.env.REACT_APP_URL_API}/api/wishlist/${uid}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }
      
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error fetching wishlist:', error);
      return rejectWithValue(error.message || 'Failed to fetch wishlist');
    }
  }
);

// Async thunk to add an item to wishlist
export const addWishlistItem = createAsyncThunk(
  "wishlist/addItem",
  async (item: Omit<WishListItem, '_id'>, { rejectWithValue }) => {
    try {
      const response = await authenticatedFetch(
        `${process.env.REACT_APP_URL_API}/api/wishlist`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to add item to wishlist');
      }
      
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error adding to wishlist:', error);
      return rejectWithValue(error.message || 'Failed to add to wishlist');
    }
  }
);

// Async thunk to remove an item from wishlist
export const removeWishlistItem = createAsyncThunk(
  "wishlist/removeItem",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await authenticatedFetch(
        `${process.env.REACT_APP_URL_API}/api/wishlist/${id}`,
        {
          method: 'DELETE',
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to remove item from wishlist');
      }
      
      return id; // Return the id to remove from state
    } catch (error: any) {
      console.error('Error removing from wishlist:', error);
      return rejectWithValue(error.message || 'Failed to remove from wishlist');
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Local reducer - might still be useful for optimistic updates
    addToWishlist: (state, action) => {
      state.items.push(action.payload);
    },
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
        state.error = null;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      // Add item
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addWishlistItem.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Remove item
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.error = null;
      })
      .addCase(removeWishlistItem.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;