import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getLoginDataFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("loginData")) || null;

const getUserDetailsFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("userDetails")) || null;

const initialState = {
  loginData: getLoginDataFromLocalStorage(),
  userDetails: getUserDetailsFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { access_token, refresh_token } = action.payload;

      const loginData = { access_token, refresh_token };
      state.loginData = loginData;

      localStorage.setItem("loginData", JSON.stringify(loginData));

      if (action.payload.userDetails) {
        state.userDetails = action.payload.userDetails;
        localStorage.setItem(
          "userDetails",
          JSON.stringify(action.payload.userDetails)
        );
      }
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;

      localStorage.setItem("userDetails", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.loginData = null;
      state.userDetails = null;

      localStorage.removeItem("loginData");
      localStorage.removeItem("userDetails");

      toast.info("Logged out");
    },
  },
});

export const { loginUser, setUserDetails, logoutUser } = userSlice.actions;

export default userSlice.reducer;
