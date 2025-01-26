import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
    cart: {
        uid: null, // Store the user ID
        items: [], // Store the cart items
    },
    totalQuantity: 0, // Track the total number of items in the cart
    loading: false,
    error: null,
};

// Async thunk for fetching the cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async (uid, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:5000/cart/${uid}`);
        return response.data; // Full cart object is returned
    } catch (error) {
        console.error('Error fetching cart:', error);
        return rejectWithValue(error.response.data);
    }
});

// Async thunk for adding an item to the cart
export const addToCart = createAsyncThunk('cart/addToCart', async ({ uid, item }, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/cart', { uid, item });
        console.log('Backend response for addToCart:', response.data); // Debugging the response
        return response.data; // Full updated cart object
    } catch (error) {
        console.error('Error adding to cart:', error);
        return rejectWithValue(error.response.data);
    }
});

// Async thunk for removing an item from the cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ uid, itemId }, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`http://localhost:5000/cart/${uid}/${itemId}`);
        console.log('Item removed, backend response:', response.data); // Debugging the response
        return response.data; // Full updated cart object
    } catch (error) {
        console.error('Error removing item from cart:', error);
        return rejectWithValue(error.response.data);
    }
});

// Async thunk for increasing item quantity
export const increaseQuantityAsync = createAsyncThunk(
    'cart/increaseQuantityAsync',
    async ({ uid, itemId }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:5000/cart/increase/${uid}/${itemId}`);
            return response.data; // Full updated cart object
        } catch (error) {
            console.error('Error increasing quantity:', error);
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
            return response.data; // Full updated cart object
        } catch (error) {
            console.error('Error decreasing quantity:', error);
            return rejectWithValue(error.response.data);
        }
    }
);

// Utility function to calculate total quantity from items array
const calculateTotalQuantity = (items) => {
    if (!Array.isArray(items)) return 0; // Ensure the input is an array
    return items.reduce((total, item) => total + item.quantity, 0);
};

// Cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = { uid: null, items: [] }; // Reset cart
            state.totalQuantity = 0; // Reset total quantity
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cart = action.payload.cart || action.payload; // Ensure cart has uid and items
                state.totalQuantity = calculateTotalQuantity(state.cart.items || []); // Fallback to empty array
                state.loading = false;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            
            // Add to cart
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cart = action.payload.cart || action.payload; // Save the updated cart object
                state.totalQuantity = calculateTotalQuantity(state.cart.items || []); // Recalculate total quantity
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })
            
            // Remove from cart
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cart = action.payload.cart || action.payload; // Save the updated cart object
                state.totalQuantity = calculateTotalQuantity(state.cart.items || []); // Recalculate total quantity
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })
            
            // Increase item quantity
            .addCase(increaseQuantityAsync.fulfilled, (state, action) => {
                state.cart = action.payload.cart || action.payload; // Save the updated cart object
                state.totalQuantity = calculateTotalQuantity(state.cart.items || []); // Recalculate total quantity
            })
            .addCase(increaseQuantityAsync.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })
            
            // Decrease item quantity
            .addCase(decreaseQuantityAsync.fulfilled, (state, action) => {
                state.cart = action.payload.cart || action.payload; // Save the updated cart object
                state.totalQuantity = calculateTotalQuantity(state.cart.items || []); // Recalculate total quantity
            })
            .addCase(decreaseQuantityAsync.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            });
    },
});

// Export actions and reducer
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;