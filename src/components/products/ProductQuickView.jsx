import { Link } from "react-router-dom";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { IoCloseSharp } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import ProductPrice from "./ProductPrice";
import ImageWithSkeleton from "../UI/ImageWithSkeleton";

const ProductQuickView = ({
  open,
  onClose,
  title,
  description,
  category_name,
  image,
  id,
}) => {
  const productDetails = [
    {
      label: "ფასი:",
      value: <ProductPrice />,
    },
    {
      label: "კატეგორია:",
      value: category_name,
    },
    {
      label: "დასახელება:",
      value: title,
    },
  ];

  return (
    <Dialog
      open={open}
      handler={onClose}
      className="w-full py-4 bg-white rounded-lg relative lg:min-w-[848px] lg:h-max overflow-hidden"
    >
      <DialogHeader className="flex justify-between items-center gap-4">
        <Typography className="font-bold text-xl text-gray-900">
          {description}
        </Typography>
        <IconButton className="text-2xl" onClick={onClose}>
          <IoCloseSharp />
        </IconButton>
      </DialogHeader>

      <DialogBody className="h-full flex flex-col lg:flex-row gap-4 justify-between">
        <figure className="mx-auto lg:mx-0 min-h-[300px] lg:w-1/2">
          <ImageWithSkeleton
            src={image}
            alt={title}
            className="rounded-lg"
            skeletonClassName="h-full rounded-lg"
          />
        </figure>
        <div className="lg:full flex flex-col justify-between gap-4">
          <ul>
            {productDetails.map((detail, index) => (
              <li
                key={`${index}_${detail.label}`}
                className="flex items-center gap-4"
              >
                <Typography className="mt-2 text-gray-400 font-semibold text-base shrink-0">
                  {detail.label}
                </Typography>
                <div className="mt-2 text-gray-900 font-medium text-sm">
                  {detail.value}
                </div>
              </li>
            ))}
          </ul>
          <div className="w-full flex flex-wrap justify-between gap-4">
            <Button
              className="p-4 flex items-center justify-center w-full lg:w-[47%]"
              onClick={(e) => e.preventDefault()}
              variant="gradient"
            >
              <FiShoppingCart className="mr-2" />
              დამატება
            </Button>
            <Button className="p-4 bg-indigo-600 w-full lg:w-[47%]">
              ყიდვა
            </Button>
            <Link to={`/products/${id}`} className="w-full">
              <Button className="p-4 bg-gray-400 w-full text-gray-900">
                სრულად ნახვა
              </Button>
            </Link>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};
export default ProductQuickView;
