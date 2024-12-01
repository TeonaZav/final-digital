import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox } from "@material-tailwind/react";
import { IoTrashBinOutline } from "react-icons/io5";
import CartItem from "./CartItem";
import { useDeleteCart } from "../../hooks/useDeleteCart";
import { clearCart } from "../../features/cart/cartSlice";

const CartItemsList = () => {
  const cartItems = useSelector((state) => state.cartState.cartItems);

  const dispatch = useDispatch();

  const accessToken = useSelector(
    (state) => state.userState?.user?.access_token
  );

  const [selectedItems, setSelectedItems] = useState([]);
  const { emptyCart, isDeleting } = useDeleteCart();

  useEffect(() => {
    const allProductIds = cartItems.map((item) => item.product_id);
    setSelectedItems(allProductIds);
  }, [cartItems]);

  const handleCheckboxChange = (product_id, isChecked) => {
    if (isChecked) {
      setSelectedItems((prev) => [...prev, product_id]);
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== product_id));
    }
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      const allProductIds = cartItems.map((item) => item.product_id);
      setSelectedItems(allProductIds);
    } else {
      setSelectedItems([]);
    }
  };

  const handleEmptyCart = (e) => {
    e.preventDefault();
    if (accessToken) {
      emptyCart(accessToken);
      setSelectedItems([]);
    } else {
      dispatch(clearCart());
      setSelectedItems([]);
    }
  };

  return (
    <div className="w-[80%]">
      <div className="flex items-center pb-4 border-b">
        <Checkbox
          id="select-all"
          label="მონიშნე ყველა"
          ripple
          checked={
            selectedItems.length === cartItems.length && cartItems.length > 0
          }
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
        <Button
          variant="text"
          className="text-sm flex items-center gap-1"
          onClick={handleEmptyCart}
          disabled={selectedItems.length <= 0 || isDeleting}
        >
          <IoTrashBinOutline className="text-xl" /> წაშალე ყველა
        </Button>
      </div>

      {cartItems.map((item, index) => (
        <CartItem
          key={`${item.product_id}-${index}`}
          cartItem={item}
          onCheckboxChange={handleCheckboxChange}
          isChecked={selectedItems.includes(item.product_id)}
        />
      ))}
    </div>
  );
};

export default CartItemsList;
