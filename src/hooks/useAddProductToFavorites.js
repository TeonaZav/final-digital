import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToFavorites } from "../services/api";
import { toast } from "react-toastify";

export const useAddProductToFavorites = (accessToken) => {
  const queryClient = useQueryClient();

  const { mutate: addFavorite, isLoading: isAddingFavorite } =
    useMutation({
      mutationFn: (id) => {
        return addProductToFavorites(id, accessToken);
      },

      onSuccess: async () => {
        toast.success("დაემატა მოწომებულ პროდუქტებს");
        queryClient.invalidateQueries(["favorites"]);
      },
      onError: (err) => {
        console.log(err);
        toast.error(err.message || "დაფიქსირდა შეცდომა");
      },
    });

  return { addFavorite, isAddingFavorite };
};
