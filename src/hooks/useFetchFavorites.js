import { useQuery } from "@tanstack/react-query";
import { fetchFavorites } from "../services/api";

export const useFetchFavorites = (accessToken) => {
  const {
    data,
    isLoading: isFavoritesLoading,
    error,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const favorites = await fetchFavorites(accessToken);
      return favorites;
    },
    enabled: !!accessToken,
    onError: (error) => {
      console.error("დაფიქსირდა შეცდომა:", error);
    },
  });

  return { favorites: data, isFavoritesLoading, error };
};
