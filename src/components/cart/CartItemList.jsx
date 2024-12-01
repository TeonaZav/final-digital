import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox } from "@material-tailwind/react";
import { IoTrashBinOutline } from "react-icons/io5";
import CartItem from "./CartItem";

const CartItemsList = () => {
  const cartItems = useSelector((state) => state.cartState.cartItems);
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);

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

  const handleDeleteAll = () => {
    dispatch(clearCart());
    setSelectedItems([]);
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
          onClick={handleDeleteAll}
          disabled={selectedItems.length <= 0}
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
