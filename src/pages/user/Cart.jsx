import { useSelector } from "react-redux";
import { CartItemList, CartTotals, Heading } from "./../../components";
import { useFetchFavorites } from "../../hooks/useFetchFavorites";
import ProductsSlider from "../../components/products/ProductsSlider";

const Cart = () => {
  const { numItemsInCart } = useSelector((state) => state?.cartState);
  const accessToken = useSelector(
    (state) => state.userState?.loginData?.access_token
  );

  const { favorites } = useFetchFavorites(accessToken);

  return (
    <div className="flex flex-col gap-40">
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
      {accessToken && (
        <section className="flex flex-col gap-6">
          <Heading heading="მოწონებული პროდუქტები" />
          {!favorites?.length === 0 ? (
            <p>მოწონებული პროდუქტები არ მოიძებნა</p>
          ) : (
            <ProductsSlider products={favorites} />
          )}
        </section>
      )}
    </div>
  );
};
export default Cart;
