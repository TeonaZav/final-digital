import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { FiShoppingCart } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { ProductQuickView, ImageWithSkeleton } from "./..";

import { useAddProductToCart } from "../../hooks/useAddProductToCart";
import { addItem } from "../../features/cart/cartSlice";

const ProductCard = (product) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const { id, title, price, salePrice, image } = product;

  const accessToken = useSelector(
    (state) => state.userState?.user?.access_token
  );

  const { addProduct, isLoading: isAdding } = useAddProductToCart(accessToken);

  const handleAdd = () => {
    if (accessToken) {
      addProduct(product);
    } else {
      dispatch(addItem({ ...product, count: 1 }));
    }
  };

  return (
    <article className="relative min-w-[160px] min-h-72 rounded-lg transition-transform duration-300 hover:scale-105 group">
      <Link
        to={`/products/${id}`}
        onClick={() => console.log(`/products/${title}`)}
      >
        <figure className="relative flex justify-center items-center w-full h-[180px] border rounded-lg">
          <ImageWithSkeleton
            src={image}
            alt={title}
            className="rounded-lg !object-contain"
            skeletonClassName="h-full rounded-lg"
          />

          <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center bg-white opacity-0 translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 w-full">
            <Button
              className="w-full flex items-center text-gray-600 hover:bg-white hover:text-gray-800 bg-transparent"
              onClick={(e) => {
                e.preventDefault();
                handleOpen();
              }}
              variant="text"
            >
              <IoEyeOutline className="mr-2" />
              სწრაფი ნახვა
            </Button>
          </div>
        </figure>
      </Link>

      <div className="p-3 bg-white flex flex-col justify-between">
        <div className="flex items-center">
          <Typography className="font-bold text-sm">
            {salePrice ? salePrice : price} ₾
          </Typography>

          {salePrice && price > salePrice && (
            <>
              <Typography className="text-xs text-gray-500 line-through ml-2">
                {price} ₾
              </Typography>
              <div className="ml-auto text-white bg-red-500 text-xs font-bold px-2 py-1 rounded">
                -{Math.round(((price - salePrice) / price) * 100)}%
              </div>
            </>
          )}
        </div>

        <Typography className="font-medium text-sm mt-1 truncate" title={title}>
          {title}
        </Typography>
      </div>

      <Button
        className="absolute bottom-7 left-0 right-0 opacity-0 translate-y-full px-4 py-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 flex items-center w-full"
        onClick={handleAdd}
        variant="gradient"
        disabled={isAdding}
      >
        <FiShoppingCart className="mr-2" />
        დამატება
      </Button>

      <ProductQuickView
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        product={product}
      />
    </article>
  );
};

export default ProductCard;
