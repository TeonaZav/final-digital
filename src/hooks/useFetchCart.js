import { useQuery } from "@tanstack/react-query";
import { fetchCartFromAPI } from "../services/api";
import { useDispatch } from "react-redux";
import { setCartItems } from "../features/cart/cartSlice";
import { syncCartAfterLogin } from "../utils/cartUtils";

export const useFetchCart = (accessToken) => {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const backendCart = await fetchCartFromAPI(accessToken);
      console.log("Fetched backend cart:", backendCart);

      const mergedCart = await syncCartAfterLogin(dispatch, backendCart);

      console.log("Processed and merged cart:", mergedCart);

      dispatch(setCartItems(mergedCart));

      localStorage.removeItem("cart");

      return mergedCart;
    },
    enabled: !!accessToken,
    onError: (error) => {
      console.error("Error fetching cart:", error);
    },
  });

  return { cart: data, isLoading, error };
};
