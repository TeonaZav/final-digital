import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs } from "@material-tailwind/react";
import { PiGreaterThan } from "react-icons/pi";
import { clearFilters } from "../../features/products/productSlice";

const BreadcrumbsNavigation = () => {
  const location = useLocation();
  const [_, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);

  const breadcrumbPaths = location.pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path, index, arr) => {
      const to = `/${arr.slice(0, index + 1).join("/")}`;
      return { name: decodeURIComponent(path), to };
    });

  if (breadcrumbPaths.length === 0 || breadcrumbPaths[0].name !== "products") {
    breadcrumbPaths.unshift({ name: "products", to: "/products" });
  }

  const clearParams = () => {
    setSearchParams({});
    dispatch(clearFilters());
  };

  return (
    <Breadcrumbs
      separator={<PiGreaterThan className="text-xs" />}
      className="mb-4 bg-transparent"
    >
      <Link
        to="/products"
        className="text-xs opacity-60 hover:opacity-100"
        onClick={clearParams}
      >
        პროდუქტები
      </Link>

      {filters.categoryName && (
        <span className="text-xs font-semibold">{filters.categoryName}</span>
      )}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNavigation;
