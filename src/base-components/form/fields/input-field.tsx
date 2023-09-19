// import { InputSuccessIcon } from "@/assets/svgs/components/input-succes-icon";
import { InputProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import Image from "next/image";
import { useEffect } from "react";
import emailIcon from "@/assets/svgs/input-email.svg";

export const InputField = ({
  id,
  inputType,
  value,
  name,
  register,
  placeholder,
  className,
  success,
  disabled,
  setValue,
}: InputProps) => {
  const defaultClasses = `border border-borderColor rounded-lg w-full h-12 ${
    success ? "pl-4 pr-10" : name == "email" ? "pl-10 pr-4" : "px-4"
  } py-3 focus:border-primary outline-none text-dark text-sm`;
  const classes = combineClasses(defaultClasses, className);
  useEffect(() => setValue && setValue(name, value), []);

  return (
    <div className="relative w-full">
      {name == "email" && (
        <Image
          src={emailIcon}
          alt="Email Icon"
          className="absolute top-5 left-4"
        />
      )}
      <input
        id={id}
        type={inputType}
        defaultValue={value}
        {...register(name)}
        placeholder={placeholder}
        className={`${classes}`}
        disabled={disabled}
      />
      {/* {success && (
        <InputSuccessIcon className="text-middle-green absolute top-2/4 right-4 transform -translate-y-2/4" />
      )} */}
    </div>
  );
};
