import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCategory } from "../services/api";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const { mutate: createCat, isLoading: isCreating } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("New category successfully created");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCat };
};
