import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { loginUser as loginUserAPI } from "../services/api";
import {
  loginUser as loginUserAction,
  logoutUser,
} from "../features/user/userSlice";

export const useUserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: loginUserAPI,
    onSuccess: (loginData) => {
      try {
     
        const decodedToken = jwtDecode(loginData.access_token);
        const expirationTime = decodedToken.exp * 1000;

        if (!decodedToken.exp || expirationTime < Date.now()) {
          throw new Error("Invalid or expired token");
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
          access_token: loginData.access_token,
          refresh_token: loginData.refresh_token,
          expirationTime,
        };

   
        localStorage.setItem("loginData", JSON.stringify(authData));

 
        dispatch(loginUserAction(authData));

     
        const logoutTimer = expirationTime - Date.now() - 60000; 
        if (logoutTimer > 0) {
          setTimeout(() => {
            localStorage.removeItem("loginData");
            dispatch(logoutUser());
            toast.info("Session expired. Please log in again.");
            navigate("/login");
          }, logoutTimer);
        }

        toast.success("Logged in successfully");
        navigate("/products"); 
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Invalid token received. Please try again.");
        localStorage.removeItem("loginData");
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
