import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authenticatedFetch } from 'src/services/authService';

export interface TCartItem {
  _id?: string;
  quantity: number;
  title: string;
  image: string;
  price: number;
  color: string;
  webID?: number;
}

// Define CartState type
interface CartState {
  cart: {
    uid: string | null;
    items: TCartItem[];
    _id: string | null;
  };
  totalQuantity: number;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: CartState = {
  cart: {
    uid: null,
    items: [],
    _id: null,
  },
  totalQuantity: 0,
  loading: false,
  error: null,
};

// Async thunk for fetching the cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (uid: string | null, { rejectWithValue }) => {
    try {
      const response = await authenticatedFetch(`${process.env.REACT_APP_URL_API}/api/cart/${uid}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      const data = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching cart:', error);
        return rejectWithValue(
          (error as unknown as { response?: { data: string } }).response?.data ||
            (error as Error).message
        );
      }
      console.error('Unexpected error:', error);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Async thunk for adding an item to the cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ uid, item }: { uid: string | null; item: TCartItem }, { rejectWithValue }) => {
    try {
      const response = await authenticatedFetch(`${process.env.REACT_APP_URL_API}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, item }),
      });
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      const data = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error Adding to Cart:', error);
        return rejectWithValue(
          (error as unknown as { response?: { data: string } }).response?.data ||
            (error as Error).message
        );
      }
      console.error('Unexpected error:', error);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Async thunk for removing an item from the cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ uid, itemId }: { uid: string | null; itemId: string }, { rejectWithValue }) => {
    try {
      const response = await authenticatedFetch(
        `${process.env.REACT_APP_URL_API}/api/cart/${uid}/${itemId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }

      const data = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error removing item from cart:', error);
        return rejectWithValue(
          (error as unknown as { response?: { data: string } }).response?.data ||
            (error as Error).message
        );
      }
      console.error('Unexpected error:', error);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Async thunk for increasing item quantity
export const increaseQuantityAsync = createAsyncThunk(
  'cart/increaseQuantityAsync',
  async ({ uid, itemId }: { uid: string | null; itemId: string }, { rejectWithValue }) => {
    try {
      const response = await authenticatedFetch(
        `${process.env.REACT_APP_URL_API}/api/cart/increase/${uid}/${itemId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to increase quantity');
      }

      const data = await response.json();
      return data;
    } catch (error: unknown) {
      console.error('Error increasing quantity:', error);
      if (error instanceof Error) {
        if (error instanceof Error) {
          return rejectWithValue(
            (error as { response?: { data: string } }).response?.data || error.message
          );
        }
        return rejectWithValue('An unexpected error occurred');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Async thunk for decreasing item quantity
export const decreaseQuantityAsync = createAsyncThunk(
  'cart/decreaseQuantityAsync',
  async ({ uid, itemId }: { uid: string | null; itemId: string }, { rejectWithValue }) => {
    try {
      const response = await authenticatedFetch(
        `${process.env.REACT_APP_URL_API}/api/cart/decrease/${uid}/${itemId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to decrease quantity');
      }

      const data = await response.json();
      return data;
    } catch (error: unknown) {
      console.error('Error decreasing quantity:', error);
      if (error instanceof Error) {
        if (error instanceof Error) {
          return rejectWithValue(
            (error as { response?: { data: string } }).response?.data || error.message
          );
        }
        return rejectWithValue('An unexpected error occurred');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Utility function to calculate total quantity from items array
const calculateTotalQuantity = (items: TCartItem[]): number => {
  if (!Array.isArray(items)) return 0; // Ensure the input is an array
  return items.reduce((total, item) => total + item.quantity, 0);
};

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: state => {
      state.cart = { uid: null, items: [], _id: null }; // Reset cart
      state.totalQuantity = 0; // Reset total quantity
    },
  },
  extraReducers: builder => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartState['cart']>) => {
        // state.cart = action.payload.cart || action.payload; // Ensure cart has uid and items
        state.cart = action.payload;
        state.totalQuantity = calculateTotalQuantity(state.cart?.items || []); // Fallback to empty array
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add to cart
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartState['cart']>) => {
        state.cart = action.payload; // Save the updated cart object
        state.totalQuantity = calculateTotalQuantity(state.cart?.items || []); // Recalculate total quantity
      })
      .addCase(addToCart.rejected, (state, action) => {
        // state.error = action.payload || action.error.message;
        state.error = action.payload as string;
      })

      // Remove from cart
      .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<CartState['cart']>) => {
        state.cart = action.payload; // Save the updated cart object
        state.totalQuantity = calculateTotalQuantity(state.cart?.items || []); // Recalculate total quantity
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Increase item quantity
      .addCase(
        increaseQuantityAsync.fulfilled,
        (state, action: PayloadAction<CartState['cart']>) => {
          state.cart = action.payload; // Save the updated cart object
          state.totalQuantity = calculateTotalQuantity(state.cart?.items || []); // Recalculate total quantity
        }
      )
      .addCase(increaseQuantityAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Decrease item quantity
      .addCase(
        decreaseQuantityAsync.fulfilled,
        (state, action: PayloadAction<CartState['cart']>) => {
          state.cart = action.payload; // Save the updated cart object
          state.totalQuantity = calculateTotalQuantity(state.cart?.items || []); // Recalculate total quantity
        }
      )
      .addCase(decreaseQuantityAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
