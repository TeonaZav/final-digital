import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import {
  setFilters,
  clearFilters as clearFiltersAction,
} from "../../features/products/productSlice";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);
  const [_, setSearchParams] = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(filters.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || "");
  const [onlySales, setOnlySales] = useState(filters.onlySales);

  const isFilterApplied = () => {
    return minPrice || maxPrice || onlySales;
  };
  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  const applyFilters = () => {
    const newFilters = {
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(onlySales && { onlySales: true }),
    };

    dispatch(setFilters(newFilters));

    setSearchParams((prevParams) => {
      const updatedParams = new URLSearchParams(prevParams);
      if (minPrice) updatedParams.set("minPrice", minPrice);
      if (maxPrice) updatedParams.set("maxPrice", maxPrice);
      if (onlySales) updatedParams.set("onlySales", true);
      else updatedParams.delete("onlySales");
      return updatedParams;
    });
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setOnlySales(false);

    dispatch(clearFiltersAction());
    setSearchParams({});
  };

  return (
    <div className="flex flex-col gap-4 border-r mt-4">
      <button
        onClick={toggleFilters}
        className="flex items-center text-xs font-bold"
      >
        დამატებითი ფილტრი
        {isFilterApplied() ? (
          <MdFilterAlt className="ml-auto text-xl" />
        ) : (
          <MdFilterAltOff className="ml-auto text-xl" />
        )}
      </button>
      <div
        className={`border-b mb-4 flex flex-col gap-4 rounded-lg py-4 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <h4 className="text-xs font-bold">ფასი</h4>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="დან"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="p-2 border rounded text-sm"
          />
          <input
            type="number"
            placeholder="მდე"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-2 border rounded text-sm"
          />
        </div>

        <h4 className="text-xs font-bold">შეთავაზებები</h4>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={onlySales}
            onChange={(e) => setOnlySales(e.target.checked)}
          />
          <label className="text-gray-700 text-sm">ფასდაკლებული</label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button onClick={applyFilters} className="p-2 ">
            გაფილტრე
          </Button>
          <Button
            onClick={clearFilters}
            className="p-2 bg-gray-500 text-white rounded"
          >
            გასუფთავება
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
