import { Link, NavLink, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Navbar,
  Button,
  Badge,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import logo from "./../../assets/logo-blue.svg";
import { useGetCategories } from "../../hooks/useGetCategories";
import { handleCategoryClickLogic } from "../../utils/categoryUtils";

import { useAuthActions } from "../../hooks/useAuthActions";

const Navigation = ({ accessToken }) => {
  const { handleLogout, clearParams } = useAuthActions();
  const [_, setSearchParams] = useSearchParams();
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  const dispatch = useDispatch();

  const { categories } = useGetCategories();

  return (
    <Navbar className="shadow-none border-b border-gray-300 sticky top-0 flex z-[999] h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 ">
      <div className="w-full container max-w-[1240px] flex flex-col md:flex-row mx-auto justify-between items-center h-full relative gap-4">
        <div className="flex items-center gap-4 justify-between w-full md:w-max">
          <Link to="/products" onClick={clearParams}>
            <img src={logo} alt="vendoo logo" className="w-36" />
          </Link>
          <Menu>
            <MenuHandler>
              <Button
                variant="outlined"
                className="border-gray-300 p-1.5 flex items-center gap-3 text-sm font-normal capitalize tracking-normal ring-0"
              >
                კატეგორიები
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform `}
                />
              </Button>
            </MenuHandler>
            <MenuList className="flex flex-col">
              {categories.map((category) => (
                <Link key={category.id} to="/products">
                  <MenuItem
                    onClick={() =>
                      handleCategoryClickLogic(
                        category.name,
                        setSearchParams,
                        dispatch
                      )
                    }
                  >
                    {category.name}
                  </MenuItem>
                </Link>
              ))}
            </MenuList>
          </Menu>
        </div>

        <div className="hidden md:flex h-full items-center gap-6">
          <NavLink
            to="/cart"
            className="shrink-0 mt-1 inline-flex flex-col items-center justify-center text-gray-500"
          >
            <Badge
              className="text-[8px] bg-orange-800 shrink-0 px-2"
              content={numItemsInCart || 0}
            >
              <PiShoppingCartSimpleLight className="text-3xl" />

              <span className="sr-only">Cart</span>
            </Badge>
          </NavLink>

          <>
            {accessToken ? (
              <Menu>
                <MenuHandler>
                  <Button
                    variant="outlined"
                    className="rounded-full p-2 bg-white text-gray-900 border-gray-400"
                  >
                    <GoPerson className="text-xl font-bold" />
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem>
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center gap-2"
                    >
                      <MdOutlineAdminPanelSettings />
                      <Typography variant="small" className="font-medium">
                        ადმინ პანელი
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/profile" className="flex items-center gap-2">
                      <IoPersonCircle />
                      <Typography variant="small" className="font-medium">
                        ჩემი პროფილი
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem
                    className="flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <FiLogOut />
                    <Typography variant="small" className="font-medium">
                      გამოსვლა
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Link to="/login">
                <Button
                  variant="outlined"
                  className="flex text-sm items-center gap-x-2 p-1.5 font-medium border-gray-300"
                >
                  <GoPerson />
                  შესვლა
                </Button>
              </Link>
            )}
          </>
        </div>
      </div>
    </Navbar>
  );
};

export default Navigation;
