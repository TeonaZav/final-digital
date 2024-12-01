import { fetchCartFromAPI } from "../services/api";
import { setCartItems } from "../features/cart/cartSlice";

export const syncCartAfterLogin = async (dispatch, accessToken) => {
  try {
    const backendCart = await fetchCartFromAPI(accessToken);

    const localCart = JSON.parse(localStorage.getItem("cart"))?.cartItems || [];

    const mergedCart = [...backendCart, ...localCart].reduce((acc, item) => {
      const existing = acc.find((i) => i.product_id === item.product_id);
      if (existing) {
        existing.count += item.count;
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

    dispatch(setCartItems(mergedCart));

    localStorage.removeItem("cart");
  } catch (error) {
    console.error("Failed to sync cart:", error);
  }
};
