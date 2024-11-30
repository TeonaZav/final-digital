import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: addUser, isLoading: isCreating } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("User successfully created");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
    onError: (err) => {
      const errorMessage =
        err?.response?.data?.message ||
        "Failed to create user. Please check the input fields.";
      if (
        err?.response?.data?.message?.includes("unique constraint") ||
        err?.response?.data?.message?.includes("duplicate key value")
      ) {
        toast.error("This email or phone number is already in use.");
      } else {
        toast.error(errorMessage);
      }
    },
  });

  return { isCreating, addUser };
};
