import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { deleteProductApi } from "../services/api";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingProduct, mutate: deleteProduct } = useMutation({
    mutationFn: ({ id, accessToken }) => deleteProductApi(id, accessToken),
    onSuccess: () => {
      toast.info("პროდუქტი წაიშალა");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (err) => toast.error(err.message || "დაფიქსირდა შეცდომა"),
  });

  return { isDeletingProduct, deleteProduct };
};
