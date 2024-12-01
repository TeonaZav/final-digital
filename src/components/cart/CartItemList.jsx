import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartItemsList = () => {
  const cartItems = useSelector((state) => state.cartState.cartItems);
  console.log(cartItems);
  return (
    <>
      {cartItems.map((item) => {
        return <CartItem key={item.id} cartItem={item} />;
      })}
    </>
  );
};
export default CartItemsList;
