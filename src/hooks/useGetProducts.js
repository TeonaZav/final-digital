import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/api";

export const useGetProducts = (filters) => {
  const { data, error, isFetching } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
    keepPreviousData: true,
  });

  const products = data?.products || [];
  console.log(products);
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / filters.pageSize);

  return { products, totalPages, error, isFetching };
};
