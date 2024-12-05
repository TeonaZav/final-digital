import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { useAddProductToCart } from "../../hooks/useAddProductToCart";
import { addItem } from "../../features/cart/cartSlice";

const ProductQuickView = ({ open, onClose, product }) => {
  const productDetails = [
    {
      label: "ფასი:",
      value: <ProductPrice />,
    },
    {
      label: "კატეგორია:",
      value: product.category_name,
    },
    {
      label: "დასახელება:",
      value: product.title,
    },
  ];

  const accessToken = useSelector(
    (state) => state.userState?.loginData?.access_token
  );

  const dispatch = useDispatch();

  const { addProduct, isLoading: isAdding } = useAddProductToCart(accessToken);

  const handleAdd = () => {
    if (accessToken) {
      addProduct(product);
    } else {
      dispatch(addItem({ ...product, count: 1 }));
    }
  };
  return (
    <Dialog
      open={open}
      handler={onClose}
      className="w-full py-4 bg-white rounded-lg relative lg:min-w-[848px] lg:h-max overflow-hidden"
    >
      <DialogHeader className="flex justify-between items-center gap-4">
        <Typography className="font-bold text-xl text-gray-900">
          {product.description}
        </Typography>
        <IconButton className="text-2xl" onClick={onClose}>
          <IoCloseSharp />
        </IconButton>
      </DialogHeader>

      <DialogBody className="h-full flex flex-col lg:flex-row gap-4 justify-between">
        <figure className="mx-auto lg:mx-0 min-h-[300px] lg:w-1/2 border rounded-lg">
          <ImageWithSkeleton
            src={product.image}
            alt={product.title}
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
              onClick={handleAdd}
              variant="gradient"
              loading={isAdding}
            >
              <FiShoppingCart className="mr-2" />
              დამატება
            </Button>

            <Link to={`/products/${product.id}`}>
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
