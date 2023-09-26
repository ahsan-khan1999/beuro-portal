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
  svg,
  alt,
}: InputProps) => {
  const [inputFocus, setInputFocus] = useState(false);
  const defaultClasses = `border border-borderColor rounded-lg w-full  ${
    success ? "pl-4 pr-10" : name == "email" ? "pl-10 pr-4" : "pl-10 pr-4"
  } py-[10px] outline-none text-dark text-sm focus:border-primary `;
  const classes = combineClasses(defaultClasses, className);
  useEffect(() => setValue && setValue(name, value), []);

  return (
    <div className={` relative w-full flex items-center `}>
      {name == "email" && (
        <InputEmail
          pathClass={inputFocus ? "fill-primary" : "fill-[#8F8F8F]"}
          className="absolute top-4 left-4"
        />
      )}
      {svg && (
        <Image src={svg} alt={alt} className="mr-3 absolute top-4 left-4" />
      )}

      <input
        onFocus={() => setInputFocus(true)}
        // onBlur={()=>setInputFocus(false)}
        id={id}
        type={inputType}
        className={`${classes}`}
        defaultValue={value}
        {...register(name)}
        placeholder={placeholder}
        disabled={disabled}
      />
      {/* {success && (
        <InputSuccessIcon className="text-middle-green absolute top-2/4 right-4 transform -translate-y-2/4" />
      )} */}
    </div>
  );
};
