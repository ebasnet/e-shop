import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [], // Ensure the state has the 'orders' key to store the array of orders
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.orders.push(action.payload.orderDetails); // Push the new order into the 'orders' array
    },
  },
});

export const { placeOrder } = orderSlice.actions;

export default orderSlice.reducer;
