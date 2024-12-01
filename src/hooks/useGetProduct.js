import { useQuery } from "@tanstack/react-query";
import { fetchSingleProduct } from "../services/api";

export const useGetProduct = (id) => {
  const { data, error, isFetching } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchSingleProduct(id),
    enabled: !!id,
  });

  return {
    product: data || null,
    error,
    isFetching,
  };
};
