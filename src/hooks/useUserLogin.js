import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser as loginUserAPI } from "../services/api";
import { loginUser as loginUserAction } from "../features/user/userSlice";

export const useUserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: loginUserAPI,
    onSuccess: (loginData) => {
      const expiresIn = loginData.expires_in || 3600;
      const expirationTime = Date.now() + expiresIn * 1000;

      const loginPayload = {
        access_token: loginData.access_token,
        refresh_token: loginData.refresh_token,
        expirationTime,
      };

      localStorage.setItem("loginData", JSON.stringify(loginPayload));

      dispatch(
        loginUserAction({
          access_token: loginData.access_token,
          refresh_token: loginData.refresh_token,
        })
      );

      setTimeout(() => {
        localStorage.removeItem("loginData");
        dispatch(logoutUser());
        toast.info("Session expired. Please log in again.");
        navigate("/login");
      }, expiresIn * 1000);

      toast.success("Logged in successfully");
      navigate("/products");
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
