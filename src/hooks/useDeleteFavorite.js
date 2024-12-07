import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteFavoriteApi } from "../services/api";

export const useDeleteFavorite = (accessToken) => {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingFavorite, mutate: deleteFavorite } = useMutation(
    {
      mutationFn: (id) => {
        return deleteFavoriteApi(id, accessToken);
      },
      onSuccess: () => {
        toast.info("პროდუქტი წაიშალა მოწომებული სიიდან");
        queryClient.invalidateQueries(["favorites"]);
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return { isDeletingFavorite, deleteFavorite };
};
