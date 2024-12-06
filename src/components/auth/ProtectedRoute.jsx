import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useAuthToken } from "../../hooks/useAuthToken";

const REFRESH_THRESHOLD = 60000; 
const EXPIRATION_GRACE_PERIOD = 5000;

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { refreshToken } = useAuthToken();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const accessToken = useSelector(
    (state) => state.userState?.loginData?.access_token
  );
  const refreshTokenValue = useSelector(
    (state) => state.userState?.loginData?.refresh_token
  );

  useEffect(() => {
    if (accessToken && !isRefreshing) {
      try {
        const decodedToken = jwtDecode(accessToken);
        const expirationTime = decodedToken.exp * 1000;

        if (
          expirationTime - Date.now() < REFRESH_THRESHOLD &&
          refreshTokenValue
        ) {
          setIsRefreshing(true); 
          refreshToken({ refresh_token: refreshTokenValue }).finally(() => {
            setIsRefreshing(false); 
          });
        } else if (expirationTime + EXPIRATION_GRACE_PERIOD <= Date.now()) {
          localStorage.removeItem("loginData");
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("loginData");
        window.location.href = "/login";
      }
    }
  }, [accessToken, refreshToken, refreshTokenValue, isRefreshing]);
  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
