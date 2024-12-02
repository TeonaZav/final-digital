import { useState } from "react";
import { useSelector } from "react-redux";
import {
  CheckoutProductList,
  CheckoutTotals,
  PaymentOptions,
} from "../../components";

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const cartItems = useSelector((state) => state.cartState.cartItems);

  const handlePaymentChange = (paymentId) => {
    setSelectedPayment(paymentId);
  };
  return (
    <div className="grid grid-cols-12 gap-6 w-full p-4 ">
      <div className="col-span-8 space-y-4">
        <CheckoutProductList cartItems={cartItems} />
        <PaymentOptions
          selectedPayment={selectedPayment}
          onSelectOption={handlePaymentChange}
        />
      </div>

      <div className="col-span-4">
        <CheckoutTotals
          selectedPayment={selectedPayment}
          cartItems={cartItems}
        />
      </div>
    </div>
  );
};

export default Checkout;
