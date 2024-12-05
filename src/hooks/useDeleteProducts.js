import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteProductApi } from "../services/api";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingProduct, mutate: deleteProduct } = useMutation({
    mutationFn: ({ id, accessToken }) => deleteProductApi(id, accessToken),
    onSuccess: () => {
      toast.info("კატეგორია წაიშალა");
      queryClient.invalidateQueries(["productCategories"]);
    },
    onError: (err) => toast.error(err.message || "დაფიქსირდა შეცდომა"),
  });

  return { isDeletingProduct, deleteProduct };
};
