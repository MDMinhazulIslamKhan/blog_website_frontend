"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { useFormContext, Controller } from "react-hook-form";
interface IInput {
  name: string;
  label?: string;
  required?: boolean;
  size?: "md" | "sm";
}

const FormImageInput = ({ name, label, size, required }: IInput) => {
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
        render={({ field: { onChange } }) => (
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => onChange(e.target.files as FileList)}
            className={`bg-gray-50 border border-gray-300 rounded-lg block w-full p-2 ${
              size == "md" ? "max-w-md" : "max-w-xs"
            }`}
          />
        )}
      />
      <small className="text-red-500 mt-1 ml-1">{errorMessage}</small>
    </>
  );
};

export default FormImageInput;
