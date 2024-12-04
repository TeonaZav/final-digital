import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createProduct } from "../services/api";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: createNewProduct, isLoading: isCreating } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("პროდუქტი წარმატებით დაემატა");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createNewProduct };
};
