import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeItem } from "../features/cart/cartSlice";
import { deleteCartItem } from "../services/api";

export const useDeleteCartItem = (accessToken, product_id) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { isLoading: isDeletingCartItem, mutate: deleteItem } = useMutation({
    mutationFn: (cartItemId) => {
      return deleteCartItem(cartItemId, accessToken);
    },
    onSuccess: () => {
      dispatch(removeItem({ product_id }));
      toast.success("პროდუქტი წაიშალა კალათიდან");

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
