import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createCategory } from "../services/api";

export const useCreateCategory = (accessToken) => {
  const queryClient = useQueryClient();

  const { mutate: createNewCategory, isLoading: isCreating } = useMutation({
    mutationFn: (formData) => createCategory(formData, accessToken),
    onSuccess: () => {
      toast.success("ახალი კატეგორია წარმატებით დაემატა");
      queryClient.invalidateQueries({ queryKey: ["productCategories"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createNewCategory };
};
