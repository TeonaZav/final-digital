import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchUserDetails } from "../services/api";

export const useUserDetails = (token) => {
  const dispatch = useDispatch();

  const {
    data: userDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userDetails", token],
    queryFn: () => fetchUserDetails(token),
    enabled: !!token,
    onSuccess: (data) => {
      dispatch(updateUserDetailsAction(data));
    },
    onError: (err) => {
      console.error("Failed to fetch user details:", err);
      toast.error("Failed to fetch user details. Please try again.");
    },
  });

  return { userDetails, isLoading, error };
};
