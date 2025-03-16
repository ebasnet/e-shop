import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  subtotal: 0, // To store subtotal
  total: 0, // To store total price
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { key, id, size } = action.payload;

      const existingItem = state.cartItems.find((item) => item.key === key);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }

      cartSlice.caseReducers.calculateTotals(state); // Recalculate totals
    },

    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== id || item.size !== size // Filter by both id and size
      );

      cartSlice.caseReducers.calculateTotals(state); // Recalculate totals
    },

    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const item = state.cartItems.find(
        (item) => item.id === id && item.size === size
      );
      if (item && quantity > 0) {
        item.quantity = quantity;
      }

      cartSlice.caseReducers.calculateTotals(state); // Recalculate totals
    },

    // Calculate subtotal and total (delivery fee will be handled outside this slice)
    calculateTotals: (state) => {
      state.subtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      // Calculate total without delivery fee for now
      state.total = state.subtotal;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
