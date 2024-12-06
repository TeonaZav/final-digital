import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { refreshAuthToken } from "../services/api";
import {
  loginUser as loginUserAction,
  logoutUser,
} from "../features/user/userSlice";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const useAuthToken = () => {
  const dispatch = useDispatch();

  const { mutate: refreshToken } = useMutation({
    mutationFn: refreshAuthToken,
    onSuccess: (newTokenData) => {
      try {
        const decodedToken = jwtDecode(newTokenData.access_token);
        const expirationTime = decodedToken.exp * 1000;

        if (expirationTime < Date.now()) {
          throw new Error("Token is already expired");
        }

        const authData = {
          user: {
            id: decodedToken.id,
            email: decodedToken.email,
            first_name: decodedToken.first_name,
            last_name: decodedToken.last_name,
            phone_number: decodedToken.phone_number,
            role: decodedToken.role,
          },
          access_token: newTokenData.access_token,
          refresh_token: newTokenData.refresh_token,
          expirationTime,
        };

        localStorage.setItem("loginData", JSON.stringify(authData));
        dispatch(loginUserAction(authData));

        const refreshTimer = expirationTime - Date.now() - 60000;
        if (refreshTimer > 0) {
          setTimeout(() => {
            refreshToken({ refresh_token: newTokenData.refresh_token });
          }, refreshTimer);
        }
      } catch (error) {
        console.error("Error processing new token:", error);
        toast.error("Invalid or expired token. Please log in again.");
        localStorage.removeItem("loginData");
        dispatch(logoutUser());
      }
    },
    onError: () => {
      localStorage.removeItem("loginData");
      dispatch(logoutUser());
      toast.error("Session expired. Please log in again.");
    },
  });

  return { refreshToken };
};
