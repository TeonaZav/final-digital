import { useDispatch, useSelector } from "react-redux";
import { Typography, ButtonGroup, Button } from "@material-tailwind/react";
import { ImageWithSkeleton } from "../";
import {
  handleCartItemDelete,
  useDeleteCartItem,
} from "../../hooks/useDeleteCartItem";
import { useAddProductToCart } from "../../hooks/useAddProductToCart";
import { addItem } from "../../features/cart/cartSlice";

const ProductListItem = ({ cartItem }) => {
  const { title, price, salePrice, image, count } = cartItem;

  const accessToken = useSelector(
    (state) => state.userState?.user?.access_token
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
    <li className="flex flex-col flex-wrap gap-y-4">
      <div className="flex gap-6">
        <figure className="h-14 w-14 rounded-lg border shadow-lg">
          <ImageWithSkeleton
            src={image}
            alt={title}
            className="h-full object-cover"
          />
        </figure>
        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-[12px]">{title}</h3>
          <div className="flex items-center ">
            <Typography className="font-bold text-xs text-gray-800">
              {salePrice && salePrice < price
                ? `${salePrice * count} ₾`
                : `${price * count} ₾`}
            </Typography>
            {salePrice && salePrice < price && (
              <>
                <Typography className=" text-xs text-gray-500 line-through ml-2">
                  {price * count} ₾
                </Typography>
                <div className="text-white bg-red-300 text-[10px] font-bold px-2 py-0.5 rounded ml-2">
                  -{Math.round(((price - salePrice) / price) * 100)}%
                </div>
              </>
            )}
          </div>
        </div>
        <ButtonGroup
          className="text-[10px] ml-auto border rounded-lg"
          color="white"
        >
          <Button
            onClick={removeItemFromTheCart}
            color="white"
            className="py-0 px-3 text-xs shadow-none leading-none"
            disabled={isDeletingCartItem}
          >
            -
          </Button>
          <Button
            color="white"
            className="py-0 px-3 text-xs leading-none shadow-none"
          >
            {count}
          </Button>
          <Button
            onClick={handleAdd}
            color="white"
            className="py-0 px-3  text-gray-900 text-xs shadow-none leading-none"
            disabled={isAdding}
          >
            +
          </Button>
        </ButtonGroup>
      </div>
    </li>
  );
};
export default ProductListItem;
