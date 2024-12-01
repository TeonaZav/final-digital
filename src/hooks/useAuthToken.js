import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { refreshAuthToken } from "../services/api"; 
import { loginUser as loginUserAction } from "../features/user/userSlice";

export const useAuthToken = () => {
  const dispatch = useDispatch();

  const { mutate: refreshToken } = useMutation(refreshAuthToken, {
    onSuccess: (newTokenData) => {
      const expiresIn = newTokenData.expires_in || 3600; 
      const expirationTime = Date.now() + expiresIn * 1000;

      localStorage.setItem(
        "loginData",
        JSON.stringify({
          access_token: newTokenData.access_token,
          refresh_token: newTokenData.refresh_token,
          expirationTime,
        })
      );

      dispatch(
        loginUserAction({
          token: newTokenData.access_token,
          refreshToken: newTokenData.refresh_token,
        })
      );


      setTimeout(() => {
        refreshToken(newTokenData.refresh_token);
      }, (expiresIn - 60) * 1000); 
    },
    onError: () => {
   
      localStorage.removeItem("loginData");
      dispatch(loginUserAction(null));
      toast.error("Session expired. Please log in again.");
    },
  });

  return { refreshToken };
};
