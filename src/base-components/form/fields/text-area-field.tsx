// import { InputSuccessIcon } from "@/assets/svgs/components/input-succes-icon";
import { TextAreaProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import { useEffect, useState } from "react";

export const TextAreaField = ({
  id,
  register,
  rows,
  value,
  name,
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
    <div className={`relative w-full flex items-center `}>
      <textarea
        onFocus={() => setInputFocus(true)}
        onBlurCapture={() => setInputFocus(false)}
        rows={rows}
        id={id}
        className={`${classes}`}
        defaultValue={value}
        {...register(name)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};
