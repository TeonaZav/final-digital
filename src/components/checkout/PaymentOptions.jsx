import { Card, Radio } from "@material-tailwind/react";
import { CartTitle } from "./../";
import { RiVisaFill } from "react-icons/ri";
import { TbCurrencyLari } from "react-icons/tb";

const PaymentOptions = ({ selectedPayment, onSelectOption }) => {
  const options = [
    { id: "card", label: "ბარათი", icon: RiVisaFill },
    { id: "cash", label: "ნაღდი განაღდება", icon: TbCurrencyLari },
  ];

  console.log(selectedPayment);
  return (
    <Card className="w-full mx-auto p-4">
      <CartTitle title="გადახდის მეთოდი" />

      <ul className="space-y-3">
        {options.map((option) => (
          <li
            key={option.id}
            className={`flex items-center justify-between border rounded-lg px-4 py-2 ${
              selectedPayment === option.id ? "border-blue-500" : ""
            }`}
          >
            <div className="flex items-center">
              <Radio
                name="payment"
                id={`payment-${option.id}`}
                label={option.label}
                checked={selectedPayment === option.id}
                onChange={() => onSelectOption(option.id)}
                className="text-blue-500 focus:ring-blue-400"
              />
            </div>
            {option.icon && <option.icon className="text-lg text-gray-500" />}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default PaymentOptions;
