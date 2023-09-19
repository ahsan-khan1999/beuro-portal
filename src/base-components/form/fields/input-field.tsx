// import { InputSuccessIcon } from "@/assets/svgs/components/input-succes-icon";
import { InputProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import { useEffect } from "react";

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
  setValue
}: InputProps) => {
  const defaultClasses = `border-2 border-lightGray rounded-lg h-12 w-full ${success ? 'pl-4 pr-10' : 'px-4'} py-3 focus:border-primary outline-none`;
  const classes = combineClasses(defaultClasses, className);
  useEffect(() => setValue && setValue(name, value), [])

  return (
    <div className="relative w-full">
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
