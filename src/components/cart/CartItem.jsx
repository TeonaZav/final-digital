import { useDispatch, useSelector } from "react-redux";
import { Typography, Checkbox } from "@material-tailwind/react";
import { IoTrashBinOutline } from "react-icons/io5";
import { ImageWithSkeleton } from "../";
import {
  handleCartItemDelete,
  useDeleteCartItem,
} from "../../hooks/useDeleteCartItem";

const CartItem = ({ cartItem, onCheckboxChange, isChecked }) => {
  const { title, price, salePrice, image,  } = cartItem;
  const accessToken = useSelector(
    (state) => state.userState?.user?.access_token
  );

  const dispatch = useDispatch();

  const { deleteItem, isDeletingCartItem } = useDeleteCartItem(
    accessToken,
    cartItem?.product_id
  );

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    onCheckboxChange(cartItem?.product_id, isChecked);
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
      <Checkbox
        id={`select-${cartItem?.product_id}`}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />

      <figure className="h-24 w-24 rounded-lg border shadow-lg">
        <ImageWithSkeleton
          src={image}
          alt={title}
          className="h-full object-cover"
        />
      </figure>

      <div className="flex flex-col justify-between ml-6">
        <h3 className="font-medium capitalize">{title}</h3>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-4"
            onClick={removeItemFromTheCart}
            disabled={isDeletingCartItem}
          >
            <IoTrashBinOutline /> წაშალე
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 justify-self-end ml-auto">
        <Typography className="font-bold text-base text-gray-800">
          {salePrice && salePrice < price ? `${salePrice} ₾` : `${price} ₾`}
        </Typography>
        {salePrice && salePrice < price && (
          <>
            <Typography className="text-base text-gray-500 line-through ml-2">
              {price} ₾
            </Typography>
            <div className="text-white bg-red-300 text-xs font-bold px-2 py-1 rounded ml-2">
              -{Math.round(((price - salePrice) / price) * 100)}%
            </div>
          </>
        )}
      </div>
    </article>
  );
};

export default CartItem;
