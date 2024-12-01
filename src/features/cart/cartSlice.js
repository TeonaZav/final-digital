import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  cartTotalGross: 0,
  shipping: 5,
  orderTotal: 0,
  totalDiscount: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const saveCartToLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;

      const productId = product.product_id || product.id;
      const existingItem = state.cartItems.find(
        (item) => item.product_id === productId
      );

      if (existingItem) {
        existingItem.count += product.count || 1;
        toast.info("პროდუქტის რაოდენობა განახლდა კალათაში");
      } else {
        state.cartItems.push({
          ...product,
          product_id: productId,
          count: product.count || 1,
        });
        toast.success("პროდუქტი დაემატა კალათაში");
      }

      state.numItemsInCart = state.cartItems.reduce(
        (total, item) => total + item.count,
        0
      );

      state.cartTotal = state.cartItems.reduce(
        (total, item) => total + (item.salePrice || item.price) * item.count,
        0
      );

      state.totalDiscount = state.cartItems.reduce(
        (total, item) =>
          total + (item.price - (item.salePrice || item.price)) * item.count,
        0
      );

      cartSlice.caseReducers.calculateTotals(state);
      saveCartToLocalStorage(state);
    },
    removeItem: (state, action) => {
      const { product_id } = action.payload;

      console.log("Product ID to remove:", product_id);
      const existingItem = state.cartItems.find(
        (i) => i.product_id === product_id
      );

      if (existingItem) {
        if (existingItem.count > 1) {
          existingItem.count -= 1;
          state.numItemsInCart -= 1;
          state.cartTotal -= existingItem.salePrice || existingItem.price;
        } else {
          state.cartItems = state.cartItems.filter(
            (i) => i.product_id !== product_id
          );
          state.numItemsInCart -= 1;
          state.cartTotal -= existingItem.salePrice || existingItem.price;
        }

        toast.success("პროდუქტი წაიშალა კალათიდან");
      } else {
        toast.error("პროდუქტი არ არის კალათაში");
      }

      cartSlice.caseReducers.calculateTotals(state);
      saveCartToLocalStorage(state);
    },

    clearCart: (state) => {
      Object.assign(state, defaultState);
      localStorage.removeItem("cart");
    },

    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.numItemsInCart = action.payload.reduce(
        (acc, item) => acc + item.count,
        0
      );
      state.cartTotalGross = action.payload.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
      state.cartTotal = action.payload.reduce(
        (acc, item) => acc + (item.salePrice || item.price) * item.count,
        0
      );
      cartSlice.caseReducers.calculateTotals(state);
    },

    calculateTotals: (state) => {
      state.orderTotal = state.cartTotal + state.shipping;

      state.totalDiscount = state.cartItems.reduce((total, item) => {
        if (item.salePrice) {
          total += (item.price - item.salePrice) * item.count;
        }
        return total;
      }, 0);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, clearCart, setCartItems, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
