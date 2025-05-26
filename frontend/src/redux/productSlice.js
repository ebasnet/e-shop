// src/redux/productSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // product list
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { setProducts, addProduct } = productSlice.actions;
export default productSlice.reducer;
