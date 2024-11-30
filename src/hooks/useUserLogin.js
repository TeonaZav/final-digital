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
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          access_token: loginData.access_token,
          refresh_token: loginData.refresh_token,
        })
      );

      dispatch(
        loginUserAction({
          token: loginData.access_token,
          refreshToken: loginData.refresh_token,
        })
      );

      try {
        const userDetails = await fetchUserDetails(loginData.access_token);

        // localStorage.setItem("userDetails", JSON.stringify(userDetails));
        dispatch(
          loginUserAction({
            ...loginData,
            userDetails,
          })
        );

        toast.success("Logged in successfully");
        navigate("/products");
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

  return {
    login,
    isLoggingIn,
  };
};
