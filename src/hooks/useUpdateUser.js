import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUserApi } from "../services/api";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({ data, accessToken }) => updateUserApi(data, accessToken),
    onSuccess: () => {
      toast.success("მონაცემები დარედაქტირდა");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      const errorMessage = err?.response?.data?.message || "დაფიქსირდა შეცდომა";
      toast.error(errorMessage);
    },
  });

  return { isUpdating, updateUser };
};
