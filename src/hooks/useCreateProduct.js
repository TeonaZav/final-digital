import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createProduct } from "../services/api";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: createProd, isLoading: isCreating } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("New product successfully created");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createProd };
};
