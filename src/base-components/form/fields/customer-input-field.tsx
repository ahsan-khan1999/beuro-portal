// import { InputSuccessIcon } from "@/assets/svgs/components/input-succes-icon";
import { InputProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import Image from "next/image";
import { useEffect, useState } from "react";
import { InputEmail } from "@/assets/svgs/components/inputEmail";

export const CustomerInputField = ({
  id,
  inputType,
  value,
  name,
  register,
  placeholder,
  className,
  disabled,
  setValue,
}: InputProps) => {
  const defaultClasses = `border border-dark rounded-lg w-full   p-4 outline-none text-dark text-sm focus:border-primary `;
  const classes = combineClasses(defaultClasses, className);
  useEffect(() => setValue && setValue(name, value), []);

  return (
    <div className={` relative w-full flex items-center `}>
      <input
        id={id}
        type={inputType}
        className={`${classes}`}
        defaultValue={value}
        {...register(name)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};
