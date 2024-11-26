import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./../features";

const store = configureStore({
  reducer: {
    userState: userReducer,
  },
});

export default store;
