import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
  Input,
  Typography,
} from "@material-tailwind/react";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import { FiSearch, FiLogOut } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { RxHamburgerMenu } from "react-icons/rx";
import { clearCart } from "../../features/cart/cartSlice";
import { logoutUser } from "../../features/user/userSlice";
import logo from "./../../assets/logo-blue.svg";
import { useGetCategories } from "../../hooks/useGetCategories";

const Navigation = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.userState.user);
  const { categories } = useGetCategories();
  console.log(user);

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logoutUser());
    queryClient.removeQueries();
    navigate("/");
  };

  return (
    <Navbar className="shadow-none border-b border-gray-300 sticky top-0 flex z-[999] h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 ">
      <div className="w-full container max-w-[1240px] flex flex-col lg:flex-row mx-auto justify-between items-center h-full relative gap-4">
        <div className="flex items-center gap-4 justify-between w-full lg:w-max">
          <Link to="/">
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
                  className={`h-3.5 w-3.5 transition-transform ${
                    openMenu ? "rotate-90" : ""
                  }`}
                />
              </Button>
            </MenuHandler>
            <IconButton variant="text" className="block xl:hidden">
              <RxHamburgerMenu className="text-2xl" />
            </IconButton>
            <MenuList>
              {categories.map((category) => (
                <Link to={`/products/${category.name}`} key={category.id}>
                  <MenuItem>{category.name}</MenuItem>
                </Link>
              ))}
            </MenuList>
          </Menu>
        </div>

        <div className="relative flex w-full gap-2 md:w-2/5">
          <Input
            type="search"
            placeholder="Search"
            containerProps={{
              className: "min-w-[288px]",
            }}
            className="pr-9 placeholder:text-indigo-900 !bg-indigo-100 focus:border-none"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          <FiSearch className="!absolute right-3 top-[13px] text-indigo-900" />
        </div>

        <div className="hidden xl:flex h-full  items-center gap-4">
          {/* CART LINK */}
          <Badge
            className="px-1.5 py-0.5 text-[8px]"
            content={numItemsInCart || 0}
          >
            <NavLink to="/cart" className="text-blue-gray-600 py-0">
              <PiShoppingCartSimpleLight className="h-10 w-7" />
            </NavLink>
          </Badge>

          {/* USER SECTION */}
          <>
            {!user ? (
              <Menu>
                <MenuHandler>
                  <Button
                    variant="outlined"
                    className="rounded-full p-3 bg-indigo-200 text-indigo-500 border-indigo-300"
                  >
                    <GoPerson />
                  </Button>
                </MenuHandler>
                <MenuList className="text-xs w-20">
                  <MenuItem className="flex items-center gap-1">
                    <CiSettings /> დეტალები
                  </MenuItem>
                </MenuList>
                <MenuList>
                  <MenuItem className="flex items-center gap-2">
                    <IoPersonCircle />
                    <Typography variant="small" className="font-medium">
                      ჩემი პროფილი
                    </Typography>
                  </MenuItem>

                  <MenuItem className="flex items-center gap-2">
                    <MdOutlineAdminPanelSettings />
                    <Typography variant="small" className="font-medium">
                      ადმინ პანელი
                    </Typography>
                  </MenuItem>

                  <hr className="my-2 border-blue-gray-50" />
                  <MenuItem className="flex items-center gap-2 ">
                    <FiLogOut />
                    <Typography variant="small" className="font-medium">
                      გამოსავლა
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
