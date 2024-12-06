import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useAuthToken } from "../../hooks/useAuthToken";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { refreshToken } = useAuthToken();

  const accessToken = useSelector(
    (state) => state.userState?.loginData?.access_token
  );

  const refreshTokenValue = useSelector(
    (state) => state.userState?.loginData?.refresh_token
  );

  useEffect(() => {
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        const expirationTime = decodedToken.exp * 1000;

        if (expirationTime - Date.now() < 60000 && refreshTokenValue) {
          refreshToken({ refresh_token: refreshTokenValue });
        } else if (expirationTime < Date.now()) {
          localStorage.removeItem("loginData");
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("loginData");
        window.location.href = "/login";
      }
    }
  }, [accessToken, refreshToken, refreshTokenValue]);

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
