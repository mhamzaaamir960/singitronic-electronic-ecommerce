import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import categorySlice from "./slices/categorySlice";
import productsSlice from "./slices/productSlice"

export const store = configureStore({
  reducer: {
    authSlice: authSlice,
    categorySlice: categorySlice,
    productsSlice: productsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
