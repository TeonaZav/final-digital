import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { removeItem } from "../features/cart/cartSlice";
import { deleteCartItem } from "../services/api";

export const useDeleteCartItem = (accessToken) => {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingCartItem, mutate: deleteItem } = useMutation({
    mutationFn: (cartItemId) => {
      return deleteCartItem(cartItemId, accessToken);
    },
    onSuccess: () => {
      toast.info("პროდუქტი წაიშალა კალათიდან");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeletingCartItem, deleteItem };
};

export const handleCartItemDelete = (
  e,
  cartItemId,
  product_id,
  deleteItem,
  accessToken,
  dispatch
) => {
  e.preventDefault();

  if (accessToken) {
    deleteItem(cartItemId);
  } else {
    dispatch(removeItem({ product_id }));
  }
};
