import { useDispatch } from "react-redux";
import { Typography } from "@material-tailwind/react";
import { removeItem } from "../../features/cart/cartSlice";
import { IoTrashBinOutline } from "react-icons/io5";
import { ImageWithSkeleton } from "./../";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const removeItemFromTheCart = () => {
    dispatch(removeItem({ cartID }));
  };

  const {
    cartProduct: { title, price, salePrice, image, description },
    count,
    id,
  } = cartItem;

  return (
    <article
      key={id}
      className="border-base-300 mb-12 flex flex-col flex-wrap gap-y-4 border-b pb-6 last:border-b-0 sm:flex-row"
    >
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
          <div className="form-control max-w-xs">{count}</div>

          <button
            className="flex items-center gap-4"
            onClick={removeItemFromTheCart}
          >
            <IoTrashBinOutline /> წაშალე
          </button>
        </div>
      </div>
      <div className="flex  flex-col items-center gap-2 justify-self-end ml-auto">
        <Typography className={`font-bold text-sm text-gray-900`}>
          {salePrice && salePrice < price ? `${salePrice} ₾` : `${price} ₾`}
        </Typography>
        {salePrice && salePrice < price && (
          <>
            <Typography className="text-xs text-gray-500 line-through ml-2">
              {price} ₾
            </Typography>
            <div className="text-white bg-red-500 text-xs font-bold px-2 py-1 rounded ml-2">
              -{Math.round(((price - salePrice) / price) * 100)}%
            </div>
          </>
        )}
      </div>
    </article>
  );
};
export default CartItem;
