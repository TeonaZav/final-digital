import { Input, Typography } from "@material-tailwind/react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "./../";

const FormField = ({
  name,
  label,
  type = "text",
  placeholder,
  size = "md",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4 flex flex-col gap-2">
      <Typography variant="h6" color="blue-gray" className="-mb-1">
        {label}
      </Typography>
      <Input
        type={type}
        size={size}
        placeholder={placeholder}
        {...register(name)}
        error={!!errors[name]}
      />
      <ErrorMessage error={errors[name]} />
    </div>
  );
};

export default FormField;
