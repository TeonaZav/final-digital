import { NavLink, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import { setFilters } from "../../features/products/productSlice";
import CategoryList from "../categories/CategoryList";

const SidebarMenu = () => {
  const dispatch = useDispatch();
  const [_, setSearchParams] = useSearchParams();
  const currentCategory = useSelector(
    (state) => state.products.filters.categoryName
  );
  const handleAllProductsClick = () => {
    dispatch(
      setFilters({
        categoryName: "",
        page: 1,
      })
    );
  };

  return (
    <nav
      className={`w-full h-max pb-6 bg-transparent z-[600] overflow-x-hidden transition-all duration-1000 ease-in border-b`}
    >
      {currentCategory ? (
        <NavLink
          to={"/products"}
          onClick={() => {
            setSearchParams({});
            dispatch(clearFilters());
          }}
        >
          <Typography
            variant="h5"
            className="mb-3 font-bold flex items-center gap-2 leading-none"
          >
            <span>
              {"< "}
              უკან დაბრუნება
            </span>
          </Typography>
        </NavLink>
      ) : (
        <button
          onClick={handleAllProductsClick}
          className="mb-3 font-bold flex items-center gap-2 cursor-pointer text-left hover:underline"
        >
          <Typography variant="h5">კატეგორია</Typography>
        </button>
      )}

      <CategoryList />
    </nav>
  );
};

export default SidebarMenu;
