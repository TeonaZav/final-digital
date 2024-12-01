import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import { LuTruck } from "react-icons/lu";
import ProductPrice from "./ProductPrice";

import { useAddProductToCart } from "../../hooks/useAddProductToCart";
import { addItem } from "../../features/cart/cartSlice";

const PriceSection = ({ product }) => {
  const { price, salePrice } = product;
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.userState?.user?.access_token
  );

  const { addProduct, isLoading: isAdding } = useAddProductToCart(accessToken);

  const handleAdd = () => {
    if (accessToken) {
      addProduct(product);
    } else {
      dispatch(addItem({ ...product, count: 1 }));
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-300 w-full h-max flex flex-col justify-between gap-4">
      <ProductPrice price={price} salePrice={salePrice} className="text-xl" />
      <div className="flex items-center gap-2">
        <LuTruck className="text-green-400 text-2xl" /> მიწოდება მთელი ქვეყნის
        მასშტაბით
      </div>

      <Button
        className="p-4 flex items-center justify-center w-full"
        onClick={handleAdd}
        variant="gradient"
        loading={isAdding}
      >
        <FiShoppingCart className="mr-2" />
        დამატება
      </Button>
    </div>
  );
};

export default PriceSection;
