import { useSelector } from "react-redux";
import { CartItemList, CartTotals } from "./../../components";

const Cart = () => {
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  if (numItemsInCart === 0) {
    return <p>კალათა ცარიელია</p>;
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <CartItemList />
      </div>
      <div className="lg:col-span-4 lg:pl-4">
        <CartTotals />
      </div>
    </div>
  );
};
export default Cart;
