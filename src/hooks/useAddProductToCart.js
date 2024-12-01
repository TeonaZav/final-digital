import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToCart } from "../services/api";
import { toast } from "react-toastify";

export const useAddProductToCart = (accessToken) => {
  const queryClient = useQueryClient();

  const { mutate: addProduct, isLoading } = useMutation({
    mutationFn: (product) => {
      return addProductToCart(product.id, accessToken);
    },

    onSuccess: async () => {
      toast.success("პროდუქტი დაემატა კალათაში");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message || "დაფიქსირდა შეცდომა");
    },
  });

  return { addProduct, isLoading };
};
