import { useSelector } from "react-redux";
import { Card, CardBody, Button, Typography } from "@material-tailwind/react";
import { LuTruck } from "react-icons/lu";
import { CardTitle } from "./../";
import usePurchase from "../../hooks/usePurchase";

const ChekoutTotals = ({ selectedPayment, cartItems }) => {
  const {
    numItemsInCart,
    cartTotalGross,
    shipping,
    orderTotal,
    totalDiscount,
  } = useSelector((state) => state?.cartState);

  const accessToken = useSelector(
    (state) => state.userState?.user?.access_token
  );
  const { isPurchasing, purchaseProducts } = usePurchase();

  const handleCheckout = () => {
    if (!cartItems.length) {
      toast.error("თქვენი კალათა ცარიელია");
      return;
    }

    const purchaseData = {
      totalItems: numItemsInCart,
      totalPrice: orderTotal,
    };

    purchaseProducts({ data: purchaseData, accessToken });
  };
  return (
    <Card className="card bg-base-200  shadow-sm shadow-blue-gray-50 border h-max bg-white">
      <CardBody className="card-body flex flex-col gap-4 px-3">
        <CardTitle title="შეკვეთის დეტალები" />

        <div className="flex justify-between items-center text-gray-900 text-xs font-semibold">
          <Typography className="text-sm font-medium">{`ნივთები (${numItemsInCart}) `}</Typography>
          <Typography className="text-sm font-medium">
            {cartTotalGross} ₾
          </Typography>
        </div>

        <div className="border-base-300 flex justify-between">
          <Typography className="text-xs font-semibold text-gray-900">
            ჯამური ფასდაკლება:
          </Typography>
          <Typography className="text-xs font-semibold text-pink-800">
            -{totalDiscount} ₾
          </Typography>
        </div>
        <div className="flex justify-between items-center bg-green-50 py-2 px-1 rounded-md">
          <Typography className="text-green-500 w-full flex items-center gap-2 text-sm font-semibold">
            <LuTruck className="text-lg" />
            მიტანის საფასური:
          </Typography>
          <Typography className="font-semibold text-xs">{shipping}₾</Typography>
        </div>

        <div className="flex justify-between font-bold text-gray-900 border-t pt-2">
          <Typography className="text-sm text-black font-bold">
            ჯამური ფასი:
          </Typography>
          <Typography className="text-sm text-black font-bold">
            {orderTotal} ₾
          </Typography>
        </div>

        <Button
          disabled={!selectedPayment}
          loading={isPurchasing}
          className="bg-gray-300 w-full text-sm text-gray-700"
          onClick={handleCheckout}
        >
          აირჩიეთ გადახდის მეთოდი
        </Button>
      </CardBody>
    </Card>
  );
};

export default ChekoutTotals;
