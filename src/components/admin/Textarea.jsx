import { useFormContext } from "react-hook-form";

const Textarea = ({ fieldName }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors?.[fieldName];
  const hasError = !!fieldError;

  return (
    <textarea
      id={fieldName}
      {...register(fieldName)}
      className={`h-32 p-4 text-base rounded-md resize-none outline-none border ${
        hasError ? "border-red-500" : "border-gray-300"
      }`}
    />
  );
};

export default Textarea;
