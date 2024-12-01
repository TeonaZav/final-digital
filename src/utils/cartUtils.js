import { fetchCartFromAPI } from "../services/api";
import { setCartItems } from "../features/cart/cartSlice";

// export const syncCartAfterLogin = async (dispatch, accessToken) => {
//   try {
//     const backendCart = await fetchCartFromAPI(accessToken);

//     const localCart = JSON.parse(localStorage.getItem("cart"))?.cartItems || [];

//     const mergedCart = [...backendCart, ...localCart].reduce((acc, item) => {
//       const existing = acc.find((i) => i.product_id === item.product_id);
//       if (existing) {
//         existing.count += item.count;
//       } else {
//         acc.push(item);
//       }
//       return acc;
//     }, []);

//     dispatch(setCartItems(mergedCart));

//     localStorage.removeItem("cart");
//   } catch (error) {
//     console.error("Failed to sync cart:", error);
//   }
// };
// export const syncCartAfterLogin = async (dispatch, accessToken) => {
//   try {
//     // Fetch the backend cart
//     const backendCart = await fetchCartFromAPI(accessToken);

//     // Fetch the local cart
//     const localCart = JSON.parse(localStorage.getItem("cart"))?.cartItems || [];

//     // Normalize backend cart structure to match local cart
//     const normalizedBackendCart = backendCart.map((item) => ({
//       product_id: item.product_id,
//       count: item.count,
//       price: item.cartProduct.salePrice || item.cartProduct.price, // Use salePrice if available
//       salePrice: item.cartProduct.salePrice,
//       title: item.cartProduct.title,
//       image: item.cartProduct.image,
//       description: item.cartProduct.description,
//       category: item.cartProduct.category,
//     }));

//     // Merge backend and local carts
//     const mergedCart = [...normalizedBackendCart, ...localCart].reduce(
//       (acc, item) => {
//         const existing = acc.find((i) => i.product_id === item.product_id);
//         if (existing) {
//           existing.count += item.count; // Combine quantities
//         } else {
//           acc.push(item);
//         }
//         return acc;
//       },
//       []
//     );

//     // Dispatch the merged cart to Redux
//     dispatch(setCartItems(mergedCart));

//     // Clear the local cart after syncing
//     localStorage.removeItem("cart");
//   } catch (error) {
//     console.error("Failed to sync cart:", error);
//   }
// };

export const syncCartAfterLogin = async (dispatch, backendCart) => {
  try {
    const formattedBackendCart = backendCart.map((item) => ({
      cartItemId: item.id,
      product_id: item.product_id,
      title: item.cartProduct.title,
      price: item.cartProduct.price,
      salePrice: item.cartProduct.salePrice || item.cartProduct.price,
      image: item.cartProduct.image,
      count: item.count,
    }));

    const localCart = Array.isArray(
      JSON.parse(localStorage.getItem("cart"))?.cartItems
    )
      ? JSON.parse(localStorage.getItem("cart")).cartItems
      : [];

    const uniqueCartMap = new Map();

    formattedBackendCart.forEach((item) => {
      uniqueCartMap.set(item.product_id, item);
    });

    localCart.forEach((item) => {
      if (uniqueCartMap.has(item.product_id)) {
        const existingItem = uniqueCartMap.get(item.product_id);
        existingItem.count += item.count;
      } else {
        uniqueCartMap.set(item.product_id, item);
      }
    });

    const mergedCart = Array.from(uniqueCartMap.values());

    dispatch(setCartItems(mergedCart));

    localStorage.removeItem("cart");
  } catch (error) {
    console.error("Failed to sync cart:", error);
  }
};
