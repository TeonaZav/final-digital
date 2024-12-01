import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
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
      const existingItem = state.cartItems.find(
        (i) => i.product_id === product.product_id
      );

      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.cartItems.push({ ...product, count: 1 });
      }

      state.numItemsInCart += 1;
      state.cartTotal += product.price;
      cartSlice.caseReducers.calculateTotals(state);

      toast.success("Item added to cart");
      saveCartToLocalStorage(state);
    },
    removeItem: (state, action) => {
      const { product_id } = action.payload;
      const product = state.cartItems.find((i) => i.product_id === product_id);
      state.cartItems = state.cartItems.filter(
        (i) => i.product_id !== product_id
      );
      state.numItemsInCart -= product.count;
      state.cartTotal -= product.price * product.count;
      cartSlice.caseReducers.calculateTotals(state);

      toast.error("Item removed from cart");
      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      Object.assign(state, defaultState);
      toast.info("Cart cleared");
      localStorage.removeItem("cart");
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.numItemsInCart = action.payload.reduce(
        (total, item) => total + item.count,
        0
      );
      state.cartTotal = action.payload.reduce(
        (total, item) => total + item.cartProduct.price * item.count,
        0
      );
      cartSlice.caseReducers.calculateTotals(state);
    },
    calculateTotals: (state) => {
      state.cartTotal = state.cartItems.reduce((total, item) => {
        const price = item.cartProduct.salePrice || item.cartProduct.price; // Use salePrice if available
        return total + price * item.count;
      }, 0);

      state.totalDiscount = state.cartItems.reduce((total, item) => {
        if (item.cartProduct.salePrice) {
          return (
            total +
            (item.cartProduct.price - item.cartProduct.salePrice) * item.count
          );
        }
        return total;
      }, 0);

      state.orderTotal = state.cartTotal + state.shipping;

      saveCartToLocalStorage(state);
    },
  },
});

export const { addItem, removeItem, clearCart, setCartItems, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
