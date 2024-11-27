import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../services/apiInvoices";
import { toast } from "react-hot-toast";

export const useEditProduct = (id = "") => {
  const queryClient = useQueryClient();

  const { mutate: editInvoice, isLoading: isEditing } = useMutation({
    mutationFn: ({ changedData }) => updateProduct(changedData, id),
    onSuccess: () => {
      toast.success("Product successfully updated");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", id] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editInvoice };
};
