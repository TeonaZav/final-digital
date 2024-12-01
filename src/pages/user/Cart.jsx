import { useSelector } from "react-redux";
import { CartItemList, CartTotals, Heading } from "./../../components";

const Cart = () => {
  const { numItemsInCart } = useSelector((state) => state?.cartState);

  return (
    <section className="flex flex-col gap-6">
      <Heading heading="ჩემი კალათა" />
      {numItemsInCart === 0 ? (
        <p>კალათა ცარიელია</p>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <CartItemList />
          </div>
          <div className="lg:col-span-4 lg:pl-4">
            <CartTotals />
          </div>
        </div>
      )}
    </section>
  );
};
export default Cart;
