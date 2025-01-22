import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
    cart: [],
    loading: false,
    error: null,
};

// Async thunk for fetching the cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async (uid) => {
    const response = await axios.get(`http://localhost:5000/cart/${uid}`); // Use uid here
    return response.data.items; // Assuming the response contains an 'items' array
});

// Async thunk for adding to cart
export const addToCart = createAsyncThunk('cart/addToCart', async ({ uid, item }) => {
    await axios.post('http://localhost:5000/cart', { uid, item }); // Use uid here
    return item; // Return the item for state update
});

// Async thunk for removing from cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ uid, itemId }) => {
    await axios.delete(`http://localhost:5000/cart/${uid}/${itemId}`); // Use uid here
    return itemId; // Return the item ID for state update
});

// Cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                const existingItem = state.cart.find(item => item.productId === action.payload.productId);
                if (existingItem) {
                    existingItem.quantity += 1; // Update quantity if it exists
                } else {
                    state.cart.push({ ...action.payload, quantity: 1 }); // Add new item
                }
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cart = state.cart.filter(item => item.productId !== action.payload);
            });
    },
});

// Export actions and reducer
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;