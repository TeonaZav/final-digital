import { Button } from "@material-tailwind/react";
import { FiShoppingCart } from "react-icons/fi";
import { LuTruck } from "react-icons/lu";
import ProductPrice from "./ProductPrice";

const PriceSection = ({ price, salePrice }) => {
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-300 w-full h-max flex flex-col justify-between gap-4">
      <ProductPrice price={price} salePrice={salePrice} className="text-xl" />
      <div className="flex items-center gap-2">
        <LuTruck className="text-green-400 text-2xl" /> მიწოდება მთელი ქვეყნის
        მასშტაბით
      </div>

      <div className="w-full flex flex-wrap justify-between gap-4">
        <Button
          className="p-4 flex items-center justify-center w-full lg:w-[47%]"
          onClick={(e) => e.preventDefault()}
          variant="gradient"
        >
          <FiShoppingCart className="mr-2" />
          დამატება
        </Button>
        <Button className="p-4 bg-indigo-600 w-full lg:w-[47%]">ყიდვა</Button>
      </div>
    </div>
  );
};

export default PriceSection;
