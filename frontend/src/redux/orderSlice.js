import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    clearOrders: (state) => {
      state.orders = []; // Reset orders array
    },
  },
});

export const { placeOrder, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
