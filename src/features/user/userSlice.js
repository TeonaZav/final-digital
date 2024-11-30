import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getUserFromLocalStorage = () => {
  const loginData = JSON.parse(localStorage.getItem("loginData")) || null;
  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || null;
  return loginData ? { ...loginData, userDetails } : null;
};

const initialState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const loginData = {
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
      };

  
      state.user = {
        ...state.user,
        ...loginData,
      };

    
      localStorage.setItem("loginData", JSON.stringify(loginData));

   
      if (action.payload.userDetails) {
        state.user.userDetails = action.payload.userDetails;

      }
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("loginData");
      localStorage.removeItem("userDetails");
      toast.success("Logged out successfully");
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
