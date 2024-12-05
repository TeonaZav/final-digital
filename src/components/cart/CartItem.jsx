import { useDispatch, useSelector } from "react-redux";
import { Typography, ButtonGroup, Button } from "@material-tailwind/react";

import { ImageWithSkeleton } from "../";
import {
  handleCartItemDelete,
  useDeleteCartItem,
} from "../../hooks/useDeleteCartItem";
import { useAddProductToCart } from "../../hooks/useAddProductToCart";
import { addItem } from "../../features/cart/cartSlice";

const CartItem = ({ cartItem }) => {
  const { title, price, salePrice, image, count } = cartItem;

  const accessToken = useSelector(
    (state) => state.userState?.loginData?.access_token
  );

  const dispatch = useDispatch();

  const { deleteItem, isDeletingCartItem } = useDeleteCartItem(
    accessToken,
    cartItem?.product_id
  );
  const { addProduct, isLoading: isAdding } = useAddProductToCart(accessToken);

  const handleAdd = () => {
    if (accessToken) {
      addProduct({ ...cartItem, id: cartItem.product_id });
    } else {
      dispatch(
        addItem({
          ...cartItem,
          id: cartItem.product_id,
          product_id: cartItem.product_id,
          count: 1,
        })
      );
    }
  };

  const removeItemFromTheCart = (e) => {
    handleCartItemDelete(
      e,
      cartItem.cartItemId,
      cartItem?.product_id,
      deleteItem,
      accessToken,
      dispatch
    );
  };

  return (
    <article className="border-base-300 mb-12 flex flex-col flex-wrap gap-y-4 border-b py-6 last:border-b-0 sm:flex-row">
      <div className="flex gap-6">
        <figure className="h-24 w-24 rounded-lg border shadow-lg">
          <ImageWithSkeleton
            src={image}
            alt={title}
            className="h-full object-cover"
          />
        </figure>
        <h3 className="font-medium capitalize">{title}</h3>
      </div>

      <div className="flex lg:flex-col items-center gap-2 lg:justify-self-end lg:ml-auto">
        <Typography className="font-bold text-base text-gray-800">
          {salePrice && salePrice < price
            ? `${salePrice * count} ₾`
            : `${price * count} ₾`}
        </Typography>
        {salePrice && salePrice < price && (
          <>
            <Typography className="text-base text-gray-500 line-through ml-2">
              {price * count} ₾
            </Typography>
            <div className="text-white bg-red-300 text-xs font-bold px-2 py-1 rounded ml-2">
              -{Math.round(((price - salePrice) / price) * 100)}%
            </div>
          </>
        )}

        <ButtonGroup className="text-xs" color="white">
          <Button
            onClick={removeItemFromTheCart}
            color="white"
            className="py-2 px-3 bg-gray-200 text-gray-900"
            disabled={isDeletingCartItem}
          >
            -
          </Button>
          <Button
            disabled
            color="white"
            className="py-2 px-3 bg-gray-200 text-gray-900"
          >
            {count}
          </Button>
          <Button
            onClick={handleAdd}
            color="white"
            className="py-2 px-3 bg-gray-200 text-gray-900"
            disabled={isAdding}
          >
            +
          </Button>
        </ButtonGroup>
      </div>
    </article>
  );
};

export default CartItem;
