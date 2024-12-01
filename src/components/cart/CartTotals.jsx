import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, CardBody, Button } from "@material-tailwind/react";

const CartTotals = () => {
  const { cartItems, numItemsInCart, cartTotal, shipping, tax, orderTotal } =
    useSelector((state) => state?.cartState);
  const user = useSelector((state) => state.userState.user);

  return (
    <Card className="card bg-base-200">
      <CardBody className="card-body">
        <div className="flex justify-between items-center font-bold mb-4">
          <span>{`პროდუქტები (${numItemsInCart}) `}</span>
          <span>{cartTotal} ₾</span>
        </div>
        <ul className="border-b mb-4 pb-2">
          {cartItems.map((item, index) => {
            return (
              <li
                key={`${index}_${item.id}`}
                className="flex justify-between gap-4"
              >
                <span>{item?.cartProduct?.title}</span>
                <span>{item?.count}</span>
                <span>{item?.cartProduct?.price} ₾</span>
              </li>
            );
          })}
        </ul>

        <p className="border-base-300 flex justify-between border-b pb-2">
          <span>მიტანის საფასური: </span>
          <span className="font-medium">{shipping} ₾</span>
        </p>

        <p className="mt-4 flex justify-between pb-2 text-base font-bold text-gray-900">
          <span>ჯამური ფასი </span>
          <span>{orderTotal} ₾</span>
        </p>

        {user ? (
          <Link to="/checkout" className="btn btn-primary btn-block mt-8">
            <Button className="bg-indigo-700 w-full text-base">ყიდვა</Button>
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary btn-block mt-8">
            <Button className="bg-indigo-700 w-full text-base">ყიდვა</Button>
          </Link>
        )}
      </CardBody>
    </Card>
  );
};
export default CartTotals;
