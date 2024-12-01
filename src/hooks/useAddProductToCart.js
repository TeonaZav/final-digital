import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../services/api";
import { toast } from "react-toastify";
import { addItem } from "../features/cart/cartSlice";

export const useAddProductToCart = (accessToken) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: addProduct, isLoading } = useMutation({
    mutationFn: (product) => {
      console.log(product.id);
      return addProductToCart(product.id, accessToken);
    },

    onSuccess: async (product) => {
      queryClient.invalidateQueries(["cart"]);

      dispatch(addItem({ ...product, product_id: product.id, count: 1 }));
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message || "Failed to add product to cart.");
    },
  });

  return { addProduct, isLoading };
};
