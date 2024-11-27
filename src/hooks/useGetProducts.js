import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/api";

export const useGetProducts = () => {
  const { data, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: fetchProducts,
    suspense: true,
  });

  const products = data ? data : [];
  return { products, error };
};
