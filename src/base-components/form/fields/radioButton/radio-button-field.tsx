import { RadioButtonProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import React, { useEffect } from "react";

export const RadioButtonField = ({
  id,
  value,
  name,
  register,
  className,
  label,
  checked,
  setValue,
  disabled,
  onClick,
  onChange,
  fieldIndex

}: RadioButtonProps) => {
  const defaultClasses = `border-2 border-lightGray rounded-lg w-5 h-5 px-4 py-3 text-primary bg-secondary  cursor-pointer`;
  const classes = combineClasses(defaultClasses, className);
  // useEffect(() => {
  //   if (value && setValue) setValue(name, value)

  // }, [value])
  const { onChange: registerOnChange } = register(name);
  const conditionalOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    if (onChange) {
      onChange(e.target.value,fieldIndex);
    } else {

      registerOnChange(e);
    }
  };

  return (
    <div className="flex gap-x-2 items-center  bg-white">
      <input
        id={id}
        type="radio"
        // defaultValue={value}
        checked={checked}
        {...register(name)}
        className={`${classes}`}
        value={value}
        disabled={disabled}
        // onChangeCapture={() => {
        //   console.log("change");
        //   onClick && onClick()
        // }}
        onChange={conditionalOnChange}
      />
      <span className="ms-0 text-sm">{label}</span>
    </div>
  );
};
