import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createCategory } from "../services/api";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const { mutate: createNewCategory, isLoading: isCreating } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("ახალი კატეგორია წამატებით დაემატა");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createNewCategory };
};
