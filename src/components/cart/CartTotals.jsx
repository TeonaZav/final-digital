import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, CardBody, Button } from "@material-tailwind/react";
import { LuTruck } from "react-icons/lu";

const CartTotals = () => {
  const {
    cartItems,
    numItemsInCart,
    cartTotalGross,
    cartTotal,
    shipping,
    orderTotal,
    totalDiscount,
  } = useSelector((state) => state?.cartState);
  
  const accessToken = useSelector(
    (state) => state.userState?.loginData?.access_token
  );

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
                className="flex justify-between gap-4 text-sm"
              >
                <span>{item?.title}</span>
                <span>{item?.count}</span>
                <span>{item?.price * item.count} ₾</span>
              </li>
            );
          })}
        </ul>

        <p className="border-base-300 flex justify-between border-b pb-2">
          <span>ფასდაკლებამდე: </span>
          <span className="font-medium text-sm">{cartTotalGross} ₾</span>
        </p>
        <p className="border-base-300 flex justify-between border-b pb-2">
          <span>ფასდაკლება: </span>
          <span className="font-medium text-sm">-{totalDiscount} ₾</span>
        </p>
        <p className="border-base-300 flex justify-between border-b pb-2">
          <span className="flex items-center gap-2">
            <LuTruck />
            მიტანის საფასური:{" "}
          </span>
          <span className="font-medium">{shipping} ₾</span>
        </p>
        <p className="mt-4 flex justify-between pb-2 text-base font-bold text-gray-900">
          <span>ჯამური ფასი: </span>
          <span>{orderTotal} ₾</span>
        </p>

        {accessToken ? (
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
