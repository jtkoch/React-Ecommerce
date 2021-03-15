import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label }) => {
  const { control } = useFormContext();
  const isError = false;

  return (
    <div>
      <Controller
        as={<input />}
        className="w-full border-solid border-b-2 border-light-blue-500 focus:outline-none text-sm mb-5"
        control={control}
        name={name}
        label={label}
        required
        placeholder={label}
        defaultValue=""
        error={isError}
      />
    </div>
  );
};

export default FormInput;
