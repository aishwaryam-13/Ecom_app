import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../productReducer/ProductReducer";
import cartReducer from "../cartReducer/CartSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});

export default store;
