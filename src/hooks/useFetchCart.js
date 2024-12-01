import { useQuery } from "@tanstack/react-query";
import { fetchCartFromAPI } from "../services/api";

export const useFetchCart = (accessToken) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCartFromAPI(accessToken),
    enabled: !!accessToken,
  });

  return { cart: data, isLoading, error };
};
