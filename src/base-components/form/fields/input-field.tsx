// import { InputSuccessIcon } from "@/assets/svgs/components/input-succes-icon";
import { InputProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import Image from "next/image";
import { useEffect, useState } from "react";
import emailIcon from "@/assets/svgs/input-email.svg";
import { InputEmail } from "@/assets/svgs/components/inputEmail";

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
  const [inputFocus, setInputFocus] = useState(false);
  const defaultClasses = `border border-borderColor rounded-lg w-full  ${
    success ? "pl-4 pr-10" : name == "email" ? "pl-10 pr-4" : "px-4"
  } py-[10px] focus:border-primary outline-none text-dark text-sm`;
  const classes = combineClasses(defaultClasses, className);
  useEffect(() => setValue && setValue(name, value), []);
  console.log(inputFocus);

  return (
    <div className="relative w-full">
      {name == "email" && (
        <InputEmail
          pathClass={inputFocus ? "fill-primary" : "fill-[#8F8F8F]"}
          className="absolute top-4 left-4"
        />
      )}
      <input
        onFocus={() => setInputFocus(true)}
        // onBlur={()=>setInputFocus(false)}
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
