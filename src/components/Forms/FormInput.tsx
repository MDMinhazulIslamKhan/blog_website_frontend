"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { useFormContext, Controller } from "react-hook-form";
interface IInput {
  name: string;
  type?: string;
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  required?: boolean;
  size?: "md" | "sm";
}

const FormInput = ({
  name,
  type,
  value,
  placeholder,
  label,
  size,
  required,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      <label className="text-xs">
        <span className="label-text">
          {required ? <span className="text-red-500 inline">*</span> : null}
          {label ? label : null}
        </span>
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            type={type}
            placeholder={placeholder}
            {...field}
            value={value ? value : field.value}
            className={`bg-gray-50 border border-gray-300 rounded-lg block w-full p-2 ${
              size == "md" ? "max-w-md" : "max-w-xs"
            }`}
          />
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormInput;
