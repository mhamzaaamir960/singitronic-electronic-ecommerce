import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import categorySlice from "./slices/categorySlice";
import productsSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";
import orderSlice from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    authSlice: authSlice,
    categorySlice: categorySlice,
    productsSlice: productsSlice,
    cartSlice: cartSlice,
    wishlistSlice: wishlistSlice,
    orderSlice: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
