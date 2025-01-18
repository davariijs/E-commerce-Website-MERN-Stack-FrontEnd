import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array to hold cart items
    totalQuantity: 0, // Total number of items in the cart
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // Check if the item already exists in the cart
      const existingItem = state.items.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if already in cart
      } else {
        state.items.push({ ...item, quantity: 1 }); // Add new item to the cart
      }

      state.totalQuantity += 1; // Increment total quantity
    },
    removeFromCart: (state, action) => {
      const id = action.payload;

      const existingItem = state.items.find((cartItem) => cartItem.id === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity; // Decrease total quantity
        state.items = state.items.filter((cartItem) => cartItem.id !== id); // Remove item
      }
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;

      const existingItem = state.items.find((cartItem) => cartItem.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalQuantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;

      const existingItem = state.items.find((cartItem) => cartItem.id === id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalQuantity -= 1;
      } else if (existingItem && existingItem.quantity === 1) {
        // If the quantity becomes 0 after decreasing, remove the item from the cart
        state.totalQuantity -= 1;
        state.items = state.items.filter((cartItem) => cartItem.id !== id);
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;