import { Button, IconButton } from "@material-tailwind/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ProductPagination = ({
  active = 1,
  totalPages = 1,
  onPageChange,
  pageSize,
  onPageSizeChange,
}) => {
  if (!totalPages || totalPages < 1) {
    console.warn("Pagination not rendered due to invalid totalPages");
    return null;
  }

  const safeActive = Math.min(Math.max(active, 1), totalPages);

  const getItemProps = (index) => ({
    variant: safeActive === index ? "filled" : "text",
    onClick: () => onPageChange(index),
    className: `rounded-lg ${
      safeActive === index
        ? "bg-indigo-600 text-white"
        : "text-indigo-900 hover:bg-blue-50"
    }`,
  });

  const next = () => {
    if (safeActive < totalPages) onPageChange(safeActive + 1);
  };

  const prev = () => {
    if (safeActive > 1) onPageChange(safeActive - 1);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 lg:justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="text"
          className="rounded-lg px-2"
          onClick={prev}
          disabled={safeActive === 1}
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
          disabled={safeActive === totalPages}
        >
          <IoIosArrowForward />
        </Button>
      </div>

      <div className="flex items-center">
        <label htmlFor="pageSize" className="mr-2">
          ერთ გვერდზე:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="p-2 border rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
    </div>
  );
};

export default ProductPagination;
