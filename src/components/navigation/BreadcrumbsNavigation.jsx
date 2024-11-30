import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs } from "@material-tailwind/react";
import { PiGreaterThan } from "react-icons/pi";

const BreadcrumbsNavigation = () => {
  const location = useLocation();

  const breadcrumbPaths = location.pathname
    .split("/")
    .filter((path) => path !== "")
    .map((path, index, arr) => {
      const to = `/${arr.slice(0, index + 1).join("/")}`;
      return { name: decodeURIComponent(path), to };
    });

  const pathTranslations = {
    products: "პროდუქტები",
  };

  return (
    <Breadcrumbs
      separator={<PiGreaterThan className="text-xs" />}
      className="mb-4 bg-transparent"
    >
      <Link to="/" className="text-xs opacity-60 hover:opacity-100">
        მთავარი
      </Link>
      {breadcrumbPaths.map((breadcrumb, index) => (
        <Link
          key={index}
          to={breadcrumb.to}
          className={`text-xs ${
            index === breadcrumbPaths.length - 1
              ? "font-semibold"
              : "opacity-60 hover:opacity-100"
          }`}
        >
          {pathTranslations[breadcrumb.name] || breadcrumb.name}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNavigation;
