import { Typography } from "@material-tailwind/react";

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <Typography color="red" variant="small">
      {error.message}
    </Typography>
  );
};

export default ErrorMessage;
