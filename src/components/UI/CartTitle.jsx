import { Typography } from "@material-tailwind/react";

const CartTitle = ({ title }) => {
  return (
    <Typography variant="h3" className="text-sm text-black mb-4">
      {title}
    </Typography>
  );
};

export default CartTitle;
