import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartSlice";
import shopReducer from "./shopSlice";
import orderReducer from "./orderSlice";
import authReducer from "./authSlice";

// Persist configuration for the cart reducer
const cartPersistConfig = {
  key: "cart",
  storage,
};

// Persist configuration for the orders reducer
const ordersPersistConfig = {
  key: "orders",
  storage,
};

// Create persisted reducers
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedOrdersReducer = persistReducer(
  ordersPersistConfig,
  orderReducer
);

// Configure the store
export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    shop: shopReducer,
    orders: persistedOrdersReducer,
    auth: authReducer,
  },
});

// Create the persistor
export const persistor = persistStore(store);
