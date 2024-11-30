import { Button, IconButton } from "@material-tailwind/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ProductPagination = ({ active, totalPages, onPageChange }) => {
  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    onClick: () => onPageChange(index),
    className: `rounded-lg ${
      active === index ? "bg-indigo-600 text-white" : "text-indigo-900"
    }`,
  });

  const next = () => {
    if (active === totalPages) return;
    onPageChange(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    onPageChange(active - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="rounded-lg px-2"
        onClick={prev}
        disabled={active === 1}
      >
        <IoIosArrowBack />
      </Button>

      <div className="flex items-center gap-2">
        {[...Array(totalPages).keys()].map((_, index) => (
          <IconButton key={index} {...getItemProps(index + 1)}>
            {index + 1}
          </IconButton>
        ))}
      </div>

      <Button
        variant="text"
        className="px-2 rounded-lg"
        onClick={next}
        disabled={active === totalPages}
      >
        <IoIosArrowForward />
      </Button>
    </div>
  );
};

export default ProductPagination;
