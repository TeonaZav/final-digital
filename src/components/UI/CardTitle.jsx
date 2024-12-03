import { Typography } from "@material-tailwind/react";

const CardTitle = ({ title }) => {
  return (
    <Typography variant="h3" className="text-sm text-black mb-4">
      {title}
    </Typography>
  );
};

export default CardTitle;
