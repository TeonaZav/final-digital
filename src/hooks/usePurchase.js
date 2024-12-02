import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";
import { purchase } from "../services/api";

export const usePurchase = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading: isPurchasing, mutate: purchaseProducts } = useMutation({
    mutationFn: ({ data, accessToken }) => {
      return purchase(data, accessToken);
    },
    onSuccess: () => {
      dispatch(clearCart());
      navigate("/cart");
      toast.success("შეკვეთა წარმატებით შესრულდა!");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      console.error("Error processing purchase:", error);
      toast.error("შეკვეთის დამუშავება ვერ მოხერხდა");
    },
  });

  return { isPurchasing, purchaseProducts };
};

export default usePurchase;
