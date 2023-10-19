// import { InputSuccessIcon } from "@/assets/svgs/components/input-succes-icon";
import { InputProps, TextAreaProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import Image from "next/image";
import { useEffect, useState } from "react";
import { InputEmail } from "@/assets/svgs/components/inputEmail";
import addtionalDetailImg from "@/assets/pngs/addtional_details.png";

export const TextAreaField = ({
  id,
  inputType,
  value,
  name,
  register,
  placeholder,
  className,
  disabled,
  setValue,
}: TextAreaProps) => {
  const [inputFocus, setInputFocus] = useState(false);
  const defaultClasses = `border border-borderColor rounded-lg w-full  ${
    true ? "pl-4 pr-10" : "pl-10 pr-4"
  } py-[10px] outline-none text-dark text-sm focus:border-primary  `;
  const classes = combineClasses(defaultClasses, className);
  useEffect(() => setValue && setValue(name, value), []);

  return (
    <div className={` relative w-full flex items-center `}>
      <input
        onFocus={() => setInputFocus(true)}
        // onBlur={() => setInputFocus(false)}
        onBlurCapture={() => setInputFocus(false)}
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
