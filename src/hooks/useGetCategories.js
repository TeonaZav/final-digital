import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../services/api";

export const useGetCategories = () => {
  const { data, error } = useQuery({
    queryKey: ["productCategories"],
    queryFn: fetchCategories,
    suspense: true,
  });

  const categories = data ? data : [];
  return { categories, error };
};
