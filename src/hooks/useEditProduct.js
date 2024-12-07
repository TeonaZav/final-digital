import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateProduct } from "../services/api";

export const useEditProduct = (accessToken) => {
  const queryClient = useQueryClient();

  const { mutate: editProduct, isLoading: isEditing } = useMutation({
    mutationFn: ({ formData }) => updateProduct(formData, accessToken),
    onSuccess: (updatedProduct) => {
      queryClient.invalidateQueries(["products"]);
      if (updatedProduct?.id) {
        queryClient.invalidateQueries({
          queryKey: ["products", updatedProduct.id],
        });
      }
      toast.success("პროდუქტი წარმატებით დარედაქტირდა");
    },
    onError: (err) => {
      const errorMessage =
        err.message || "პროდუქტის დარედაქტირება ვერ მოხერხდა";
      console.log(err);
      toast.error(errorMessage);
    },
  });

  return { isEditing, editProduct };
};
