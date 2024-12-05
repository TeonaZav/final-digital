import { useFormContext, Controller } from "react-hook-form";
import Select from "react-select";

const SelectField = ({ options, fieldName }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const hasError = errors?.[fieldName];

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: { onChange, value, ...rest } }) => (
        <Select
          {...rest}
          options={options}
          value={options.find((option) => option.value === value) || null}
          onChange={(selectedOption) => onChange(selectedOption.value)}
          className={`w-full h-14 rounded-md text-xs  ${
            hasError
              ? "border-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-gray-400"
          }`}
          styles={{
            indicatorSeparator: () => ({ display: "none" }),
            menu: (provided) => ({
              ...provided,
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              boxShadow: "none",
              color: "#374151",
            }),
            menuList: (provided) => ({
              ...provided,
              padding: 0,
              maxHeight: "20.7rem",
            }),
            option: (provided) => ({
              ...provided,
              padding: "0.75rem",
              fontSize: "0.875rem",
              borderBottom: "1px solid #d1d5db",
              cursor: "pointer",
            }),
          }}
          placeholder=""
        />
      )}
    />
  );
};

export default SelectField;
