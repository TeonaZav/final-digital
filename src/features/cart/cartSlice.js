import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  cartTotalGross: 0,
  shipping: 5,
  orderTotal: 0,
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
      console.log(product);

      const productId = product.product_id || product.id;

      state.cartItems.push({
        ...product,
        product_id: productId,
        count: product.count || 1,
      });

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

      toast.success("პროდუქტი დაემატა კალათაში");
    },
    removeItem: (state, action) => {
      const { product_id } = action.payload;
      console.log(product_id, state.cartItems);
      const product = state.cartItems.find((i) => i.product_id === product_id);
      state.cartItems = state.cartItems.filter(
        (i) => i.product_id !== product_id
      );
      state.numItemsInCart -= product.count;
      state.cartTotal -= product.price * product.count;

      cartSlice.caseReducers.calculateTotals(state);
      saveCartToLocalStorage(state);
    },

    clearCart: (state) => {
      Object.assign(state, defaultState);
      localStorage.removeItem("cart");
      toast.info("პროდუქცია წაიშალა კალათიდან");
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
