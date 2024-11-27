import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCategory } from "../services/apiInvoices";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCat } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCat };
};
