// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { addProductToCart } from "../services/api";
// import { toast } from "react-toastify";

// export const useAddProductToCart = (accessToken) => {
//   const queryClient = useQueryClient();

//   const { mutate: addProduct, isLoading } = useMutation({
//     mutationFn: (id) => addProductToCart(id, accessToken),
//     onSuccess: () => {
//       toast.success("Product added to cart");
//       queryClient.invalidateQueries(["cart"]);
//     },
//     onError: (err) => {
//       toast.error(err.message || "Failed to add product to cart.");
//     },
//   });

//   return { addProduct, isLoading };
// };

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
      // Update Redux cart state
      dispatch(addItem(product));

      // Invalidate cart query
      queryClient.invalidateQueries(["cart"]);

      toast.success("Product added to cart");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add product to cart.");
    },
  });

  return { addProduct, isLoading };
};
