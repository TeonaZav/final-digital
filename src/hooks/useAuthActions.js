import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { clearCart } from "../features/cart/cartSlice";
import { logoutUser } from "../features/user/userSlice";
import { clearFilters } from "../features/products/productSlice";

export const useAuthActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [_, setSearchParams] = useSearchParams();

  const clearParams = () => {
    setSearchParams({});
    dispatch(clearFilters());
  };

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logoutUser());
    clearParams();

    queryClient.clear();
    localStorage.removeItem("loginData");
    localStorage.removeItem("cart");

    navigate("/products");
  };

  return { handleLogout, clearParams };
};
