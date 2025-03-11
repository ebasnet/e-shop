// src/redux/shopSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { products } from "../assets/assets";

const initialState = {
  products,
  currency: "Rs.",
  delivery_fee: 100,
  search: " ",
  showSearch: false,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setShowSearch: (state, action) => {
      state.showSearch = action.payload;
    },
  },
});

export const { setSearch, setShowSearch } = shopSlice.actions;
export default shopSlice.reducer;
