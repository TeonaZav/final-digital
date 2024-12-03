import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestRoute = ({ children }) => {
  const accessToken = useSelector(
    (state) => state.userState?.loginData?.access_token
  );

  if (accessToken) {
    return <Navigate to="/products" replace />;
  }

  return children;
};

export default GuestRoute;
