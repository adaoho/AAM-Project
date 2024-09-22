import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import productSlice from "./features/product/productSlice";
import userSlice from "./features/user/userSlice";
import componentSlice from "./features/component/componentSlice";

export default configureStore({
  reducer: {
    cart: cartSlice,
    product: productSlice,
    user: userSlice,
    component: componentSlice,
  },
});

export const endPoint = "http://localhost:3000/";
