import { Card } from "@material-tailwind/react";
import { CardBody } from "@material-tailwind/react";
import ProductListItem from "./ProductListItem";
import { CartTitle } from "../";

const CheckoutProductList = ({ cartItems = [] }) => {
  return (
    <Card className="w-full col-span-5 border shadow-sm shadow-blue-gray-50">
      <CardBody className="w-full">
        <CartTitle title="ნივთების სია" />
        <ul className="flex flex-col gap-3">
          {cartItems.map((item, index) => (
            <ProductListItem
              key={`${item.product_id}-${index}`}
              cartItem={item}
            />
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};
export default CheckoutProductList;
