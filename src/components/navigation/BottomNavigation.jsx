import { useSelector } from "react-redux";
import { RiHomeLine } from "react-icons/ri";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { Badge } from "@material-tailwind/react";

const BottomNavigation = () => {
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  return (
    <nav className="md:hidden fixed bottom-0 z-50 w-full -translate-x-1/2 shadow-lg bg-white border-t border-gray-200 left-1/2">
      <div className="grid h-full w-full grid-cols-3 mx-auto py-6">
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `inline-flex flex-col items-center justify-center ${
              isActive ? "text-indigo-500 font-bold" : "text-gray-500"
            }`
          }
        >
          <RiHomeLine className="text-3xl" />
          <span className="sr-only">Home</span>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `inline-flex flex-col items-center justify-center ${
              isActive ? "text-indigo-500 font-bold" : "text-gray-500"
            }`
          }
        >
          <Badge
            className="text-[8px] bg-orange-800 px-2"
            content={numItemsInCart || 0}
          >
            <PiShoppingCartSimpleLight className="text-3xl" />

            <span className="sr-only">Cart</span>
          </Badge>
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            `inline-flex flex-col items-center justify-center ${
              isActive ? "text-indigo-500 font-bold text-3xl" : "text-gray-500"
            }`
          }
        >
          <GoPerson className="text-3xl" />
        </NavLink>
        <span className="sr-only">login</span>
      </div>
    </nav>
  );
};

export default BottomNavigation;
