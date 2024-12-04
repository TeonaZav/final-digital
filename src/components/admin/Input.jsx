import { useFormContext } from "react-hook-form";

const Input = ({ type = "text", fieldName }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors?.[fieldName];

  return (
    <input
      type={type}
      id={fieldName}
      {...register(fieldName)}
      className={`w-full h-10 px-4 py-[1.15rem] text-base rounded-md outline-none border ${
        fieldError ? "border-red-500" : "border-gray-300"
      } text-gray-800 bg-white`}
    />
  );
};

export default Input;
