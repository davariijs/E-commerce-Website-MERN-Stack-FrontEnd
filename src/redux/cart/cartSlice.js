import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
    cart: [],
    totalQuantity: 0, // Add totalQuantity to track the number of items in cart
    loading: false,
    error: null,
};

// Async thunk for fetching the cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async (uid, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:5000/cart/${uid}`);
        console.log("Fetched cart from backend:", response.data); // Log the fetched cart
        return response.data.items; // Assuming the response contains an 'items' array
    } catch (error) {
        console.error("Error fetching cart:", error); // Log the error
        return rejectWithValue(error.response.data);
    }
});

// Async thunk for adding to cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ uid, item }, { rejectWithValue }) => {
      try {
        const response = await axios.post("http://localhost:5000/cart", { uid, item });
        console.log("Backend response:", response.data); // Log backend response for debugging
        return response.data; // This should return { cart: ... }
      } catch (error) {
        console.error("Error adding to cart:", error);
        return rejectWithValue(error.response.data);
      }
    }
  );

// Async thunk for removing from cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ uid, itemId }, { rejectWithValue }) => {
    try {
        await axios.delete(`http://localhost:5000/cart/${uid}/${itemId}`);
        return itemId; // Return the item ID for state update
    } catch (error) {
        console.error("Error removing item from cart:", error);
        return rejectWithValue(error.response.data);
    }
});

// Async thunk for increasing item quantity
export const increaseQuantityAsync = createAsyncThunk(
    'cart/increaseQuantityAsync',
    async ({ uid, itemId }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:5000/cart/increase/${uid}/${itemId}`);
            return response.data.cart; // Return the updated cart
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for decreasing item quantity
export const decreaseQuantityAsync = createAsyncThunk(
    'cart/decreaseQuantityAsync',
    async ({ uid, itemId }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:5000/cart/decrease/${uid}/${itemId}`);
            return response.data.cart; // Return the updated cart
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Utility function to calculate total quantity
const calculateTotalQuantity = (cart) => {
    return cart.reduce((total, item) => total + item.quantity, 0);
};

// Cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = [];
            state.totalQuantity = 0; // Reset quantity when cart is cleared
        },
        increaseQuantity: (state, action) => {
            const item = state.cart.find((item) => item._id === action.payload);
            if (item) {
                item.quantity += 1;
                state.totalQuantity += 1; // Increment total quantity
            }
        },
        decreaseQuantity: (state, action) => {
            const itemId = action.payload;
            console.log("Action payload (itemId):", itemId); // Log the itemId being passed
            console.log("Current cart:", state.cart); // Log the cart state before changes

            // Find the item in the cart
            const itemIndex = state.cart.findIndex((item) => item._id === itemId);

            if (itemIndex !== -1) {
                const item = state.cart[itemIndex];
                if (item.quantity > 1) {
                    state.cart[itemIndex] = {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                } else {
                    // Remove the item if quantity becomes 0
                    state.cart = state.cart.filter((item) => item._id !== itemId);
                }
            }

            // Update total quantity immutably
            state.totalQuantity = calculateTotalQuantity(state.cart);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cart = action.payload || []; // Ensure cart is always an array
                state.totalQuantity = calculateTotalQuantity(state.cart);
                state.loading = false;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                console.log("Action payload:", action.payload); // Debug action payload
              
                // Check if payload contains 'cart' and 'items'
                const cartItems = action.payload?.cart?.items || []; // Safely access 'items'
              
                cartItems.forEach((newItem) => {
                  const existingItem = state.cart.find(
                    (item) => item.webID === newItem.webID && item.color === newItem.color
                  );
              
                  if (existingItem) {
                    // If the item already exists, update its quantity
                    existingItem.quantity = newItem.quantity;
                  } else {
                    // If the item does not exist, add it to the cart
                    state.cart.push(newItem);
                  }
                });
              
                state.totalQuantity = calculateTotalQuantity(state.cart);
              })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                console.log("Removing item with ID:", action.payload); // Log the itemId
                state.cart = state.cart.filter(item => item.webID !== action.payload); // Use webID to match
                state.totalQuantity = calculateTotalQuantity(state.cart); // Update total quantity
            })
            .addCase(increaseQuantityAsync.fulfilled, (state, action) => {
                console.log("Cart after increasing quantity:", action.payload); // Debug
                state.cart = action.payload.items || [];
                state.totalQuantity = calculateTotalQuantity(state.cart);
            })
            .addCase(decreaseQuantityAsync.fulfilled, (state, action) => {
                console.log("Cart after decreasing quantity:", action.payload); // Debug
                state.cart = action.payload.items || [];
                state.totalQuantity = calculateTotalQuantity(state.cart);
            });
    },
});

// Export actions and reducer
export const { clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;