import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  IconButton,
  Drawer,
  Typography,
  Badge,
} from "@material-tailwind/react";
import { RiHomeLine } from "react-icons/ri";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import { IoPersonCircle } from "react-icons/io5";
import { useAuthActions } from "../../hooks/useAuthActions";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const BottomNavigation = ({ accessToken }) => {
  const [openBottom, setOpenBottom] = useState(false);
  const { handleLogout } = useAuthActions();
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  const openDrawerBottom = () => setOpenBottom(true);
  const closeDrawerBottom = () => setOpenBottom(false);

  return (
    <>
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
          {accessToken ? (
            <div className="inline-flex flex-col items-center justify-center">
              <IconButton onClick={openDrawerBottom} variant="text">
                <GoPerson className="text-3xl" />
              </IconButton>
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `inline-flex flex-col items-center justify-center ${
                  isActive
                    ? "text-indigo-500 font-bold text-3xl"
                    : "text-gray-500"
                }`
              }
            >
              <GoPerson className="text-3xl" />
            </NavLink>
          )}
        </div>
      </nav>
      <Drawer
        placement="bottom"
        open={openBottom}
        onClose={closeDrawerBottom}
        className="p-4 h-screen"
      >
        <ul className="flex flex-col gap-8 text-base text-gray-700">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <MdOutlineAdminPanelSettings />
            <Typography variant="small" className="font-medium">
              ადმინ პანელი
            </Typography>
          </Link>
          <li className=" pb-6 border-b">
            <Link to="/profile" className="flex items-center gap-2">
              <IoPersonCircle />
              <Typography variant="small" className="font-medium">
                ჩემი პროფილი
              </Typography>
            </Link>
          </li>
          <li className="flex items-center gap-2 " onClick={handleLogout}>
            <FiLogOut />
            <Typography variant="small" className="font-medium">
              გამოსვლა
            </Typography>
          </li>
        </ul>
      </Drawer>
    </>
  );
};

export default BottomNavigation;
