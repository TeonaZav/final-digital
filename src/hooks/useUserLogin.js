// import { useMutation } from "@tanstack/react-query";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { loginUser as loginUserAPI } from "../services/api";
// import { loginUser as loginUserAction } from "../features/user/userSlice";

// export const useUserLogin = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { mutate: login, isLoading: isLoggingIn } = useMutation({
//     mutationFn: loginUserAPI,
//     onSuccess: (data) => {
//       dispatch(loginUserAction(data));
//       toast.success("Logged in successfully");
//       navigate("/");
//     },
//     onError: (error) => {
//       const errorMessage =
//         error?.response?.data?.message || "Please check your credentials.";
//       toast.error(errorMessage);
//     },
//   });

//   const loginAsGuestUser = async () => {
//     try {
//       const guestData = {
//         email: "test@test.com",
//         password: "secret",
//       };
//       const data = await loginUserAPI(guestData);
//       dispatch(loginUserAction(data));
//       toast.success("Welcome guest user");
//       navigate("/");
//     } catch (error) {
//       const errorMessage =
//         error?.response?.data?.message || "Guest login failed. Try again.";
//       toast.error(errorMessage);
//     }
//   };

//   return {
//     login,
//     isLoggingIn,
//     loginAsGuestUser,
//   };
// };

import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser as loginUserAPI, fetchUserDetails } from "../services/api";
import { loginUser as loginUserAction } from "../features/user/userSlice";

export const useUserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: loginUserAPI,
    onSuccess: async (loginData) => {
      dispatch(loginUserAction(loginData)); // Save token and basic login info

      try {
        const userDetails = await fetchUserDetails(loginData.access_token); // Pass access_token to fetch user details
        dispatch(loginUserAction({ ...loginData, ...userDetails })); // Merge login and user info
        toast.success("Logged in successfully");
        navigate("/");
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        toast.error("Failed to fetch user details. Please try again.");
      }
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Please check your credentials.";
      toast.error(errorMessage);
    },
  });

  const loginAsGuestUser = async () => {
    try {
      const guestData = {
        email: "test@test.com",
        password: "secret",
      };
      const loginData = await loginUserAPI(guestData);
      dispatch(loginUserAction(loginData));

      try {
        const userDetails = await fetchUserDetails(loginData.access_token); // Fetch guest user details
        dispatch(loginUserAction({ ...loginData, ...userDetails }));
        toast.success("Welcome guest user");
        navigate("/");
      } catch (error) {
        console.error("Failed to fetch guest user details:", error);
        toast.error("Failed to fetch guest user details. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Guest login failed. Try again.";
      toast.error(errorMessage);
    }
  };

  return {
    login,
    isLoggingIn,
    loginAsGuestUser,
  };
};
