import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/api";
import { setProducts, setTotalPages } from "../features/products/productSlice";

export const useGetProducts = (filters) => {
  const dispatch = useDispatch();

  const { data, error, isFetching } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
    suspense: true,
  });

  useEffect(() => {
    if (data?.total) {
      const totalPages = Math.ceil(data.total / filters.pageSize);
      dispatch(setProducts(data.products));
      dispatch(setTotalPages(totalPages));
    }
  }, [data, filters.pageSize, dispatch]);

  return {
    products: data?.products || [],
    totalPages: data?.total ? Math.ceil(data.total / filters.pageSize) : 1,
    error,
    isFetching,
  };
};
