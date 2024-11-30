import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

import {
  Navbar,
  Button,
  IconButton,
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
import { CiSettings } from "react-icons/ci";
import { IoPersonCircle } from "react-icons/io5";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { RxHamburgerMenu } from "react-icons/rx";
import { clearCart } from "../../features/cart/cartSlice";
import { logoutUser } from "../../features/user/userSlice";
import logo from "./../../assets/logo-blue.svg";
import { useGetCategories } from "../../hooks/useGetCategories";
import { handleCategoryClickLogic } from "../../utils/categoryUtils";
import { clearFilters } from "../../features/products/productSlice";

const Navigation = () => {
  const [_, setSearchParams] = useSearchParams();
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.userState.user);
  const { categories } = useGetCategories();

  const clearParams = () => {
    setSearchParams({});
    dispatch(clearFilters());
  };

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logoutUser());
    clearParams();

    queryClient.clear();
    navigate("/products");
    localStorage.removeItem("loginData");
    localStorage.removeItem("cart");
  };

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
            <IconButton variant="text" className="block md:hidden">
              <RxHamburgerMenu className="text-2xl" />
            </IconButton>
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

        <div className="hidden md:flex h-full  items-center gap-4">
          <Badge
            className="px-1.5 py-0.5 text-[8px]"
            content={numItemsInCart || 0}
          >
            <NavLink to="/cart" className="text-blue-gray-600 py-0">
              <PiShoppingCartSimpleLight className="h-10 w-7" />
            </NavLink>
          </Badge>

          <>
            {user ? (
              <Menu>
                <MenuHandler>
                  <Button
                    variant="outlined"
                    className="rounded-full p-3 bg-indigo-200 text-indigo-500 border-indigo-300"
                  >
                    <GoPerson />
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem className="flex items-center gap-1">
                    <CiSettings /> დეტალები
                  </MenuItem>
                  <MenuItem className="flex items-center gap-2">
                    <IoPersonCircle />
                    <Typography variant="small" className="font-medium">
                      ჩემი პროფილი
                    </Typography>
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
                  className="flex items-center gap-x-2 p-1 font-medium border-borderColor"
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
