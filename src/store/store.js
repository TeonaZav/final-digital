import { configureStore } from "@reduxjs/toolkit";

import { userReducer, cartReducer, productReducer } from "./../features";

const store = configureStore({
  reducer: {
    userState: userReducer,
    cartState: cartReducer,
    products: productReducer,
  },
});

export default store;
