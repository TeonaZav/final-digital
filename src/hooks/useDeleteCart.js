import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCartItem } from "../services/apiInvoices";

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCart } = useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      toast.success("პროდუქტი წაიშალა კალათიდან");

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCart };
};
