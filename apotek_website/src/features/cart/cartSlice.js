import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemsToCart: (state, action) => {
      const newItem = action.payload.data;
      const qtyItem = action.payload.qty;
      const indexProduct = state.cartItems.findIndex(
        (product) => product.product.id === newItem.id
      );

      if (indexProduct !== -1) {
        toast.error(`Produk sudah ada di Keranjang`);
      } else {
        state.cartItems.push({
          product: newItem,
          quantity: qtyItem,
          totalPrice: qtyItem * newItem.price,
        });
        toast.success("Produk berhasil dipilih");
      }
    },
    removeItemsFormCart: (state, action) => {
      const selectItem = action.payload;
      const updatedCart = state.cartItems.filter((product) => {
        return product.product.id !== selectItem.product.id;
      });

      state.cartItems = updatedCart;
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
    addQuantityItemsCart: (state, action) => {
      const selectItem = action.payload;
      const indexProduct = state.cartItems.findIndex(
        (product) => product.id === selectItem.id
      );

      state.cartItems[indexProduct].quantity += 1;
      state.cartItems[indexProduct].totalPrice =
        state.cartItems[indexProduct].quantity * selectItem.price;
    },
    minusQuantityItemsCart: (state, action) => {
      const selectItem = action.payload;
      const indexProduct = state.cartItems.findIndex(
        (product) => product.id === selectItem.id
      );

      if (state.cartItems[indexProduct].quantity > 1) {
        state.cartItems[indexProduct].quantity -= 1;
        state.cartItems[indexProduct].totalPrice =
          state.cartItems[indexProduct].quantity * selectItem.price;
      } else {
        const updatedCart = state.cartItems.filter(
          (product) => product.id !== selectItem.id
        );
        state.cartItems = updatedCart;
      }
    },
    changeQuantityItemsCart: (state, action) => {
      const item = action.payload;

      if (item && item.newQuantity >= 1) {
        const indexProduct = state.cartItems.findIndex(
          (product) => product.id === item.product.id
        );

        if (indexProduct !== -1) {
          state.cartItems[indexProduct].quantity += item.newQuantity;
          state.cartItems[indexProduct].totalPrice =
            state.cartItems[indexProduct].quantity *
            state.cartItems[indexProduct].price;
        } else {
          state.cartItems.push({
            ...item.product,
            quantity: item.newQuantity,
            totalPrice: item.newQuantity * item.product.price,
          });
        }
      }
    },
  },
});

export const {
  addItemsToCart,
  removeItemsFormCart,
  clearCart,
  addQuantityItemsCart,
  minusQuantityItemsCart,
  changeQuantityItemsCart,
} = cartSlice.actions;
export default cartSlice.reducer;

// selector
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalItems = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrices = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.totalPrice, 0);
