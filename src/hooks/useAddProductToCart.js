import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../services/api";
import { toast } from "react-toastify";

export const useAddProductToCart = (accessToken) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: addProduct, isLoading } = useMutation({
    mutationFn: (product) => addProductToCart(product, accessToken),
    onSuccess: (product) => {
      dispatch(addItem(product));

      queryClient.invalidateQueries(["cart"]);

      toast.success("Product added to cart");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add product to cart.");
    },
  });

  return { addProduct, isLoading };
};
