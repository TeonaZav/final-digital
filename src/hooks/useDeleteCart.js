import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteCart } from "../services/api";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { isLoading: isDeleting, mutate: emptyCart } = useMutation({
    mutationFn: (accessToken) => deleteCart(accessToken),
    onSuccess: () => {
      dispatch(clearCart());
      toast.success("პროდუქტები წაიშალა კალათიდან");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (err) => {
      console.error("Failed to clear cart:", err);
      toast.error("დაფიქსირდა შეცდომა: კალათა ვერ წაიშალა.");
    },
  });

  return { isDeleting, emptyCart };
};
