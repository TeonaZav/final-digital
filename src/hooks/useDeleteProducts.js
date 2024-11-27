import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteProduct } from "../services/apiInvoices";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteProd } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("product successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteProd };
};
