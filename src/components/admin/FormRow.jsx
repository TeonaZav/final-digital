import { useFormContext } from "react-hook-form";
import { Typography } from "@material-tailwind/react";
import { fadeInAnimationContfig } from "../../utils/animationConfig";
import { isEmptyObject } from "../../utils/helpers";
import { FaCheck } from "react-icons/fa6";

const FormRow = ({ label, children, fieldName, hintMessage = "" }) => {
  const {
    formState: { errors, dirtyFields, defaultValues, isValid },
    usingSessionData,
  } = useFormContext();

  const fieldError = errors?.[fieldName];
  const hasError = !!fieldError;
  const isDirty = dirtyFields[fieldName];

  const isValidField =
    (isDirty && !hasError) ||
    (usingSessionData &&
      defaultValues?.[fieldName] &&
      !hasError &&
      (!isEmptyObject(errors) || isValid));

  const message = fieldError?.message?.toString() || hintMessage;

  return (
    <div className="flex flex-col">
      <label className="text-xs  mb-1 transition-all font-semibold">
        {label}
      </label>
      {children}
      <span
        {...fadeInAnimationContfig}
        className={`gap-2 text-xs ${
          hasError
            ? "text-red-500"
            : isValidField
            ? "text-green-500"
            : "text-gray-700"
        }`}
      >
        {message && (
          <Typography className="flex items-center gap-1 text-[10px]">
            <FaCheck /> {message}
          </Typography>
        )}
      </span>
    </div>
  );
};

export default FormRow;
