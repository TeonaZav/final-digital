import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { deleteCategoryApi } from "../services/api";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingCategory, mutate: deleteCategory } = useMutation(
    {
      mutationFn: ({ id, accessToken }) =>
        deleteCategoryApi(id, accessToken),
      onSuccess: () => {
        toast.info("კატეგორია წაიშალა");
        queryClient.invalidateQueries(["productCategories"]);
      },
      onError: (err) => toast.error(err.message || "დაფიქსირდა შეცდომა"),
    }
  );

  return { isDeletingCategory, deleteCategory };
};
