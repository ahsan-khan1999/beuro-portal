import { DropDownNonFillIcon } from "@/assets/svgs/components/drop-down-icon-non-fill";
import { OptionsFieldProps } from "@/types/global";
import React from "react";
import { combineClasses } from "@/utils/utility";

export default function SelectField({
  title,
  label,
  options,
  border,
  handleChange,
  value,
  isOpen,
  dropDownIconClassName,
  setIsOpen,
  containerClassName,
}: OptionsFieldProps) {
  const defaultClasses = `border-b-[${border}px] border-slate-gray border-opacity-50  mx-3 relative flex items-center my-auto`;
  const containerClasses = combineClasses(defaultClasses, containerClassName);
  return (
    <>
      <div className={containerClasses}>
        <div
          className="flex  justify-between cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-[#4A13E7] me-2">{label}</span>
          <DropDownNonFillIcon
            label={label}
            isOpen={isOpen}
            className={dropDownIconClassName + " flex my-auto"}
          />
        </div>

        {isOpen && (
          <div className="bg-white flex-col absolute top-[36px] w-32  border-[1px] border-lightGray rounded-lg p-2">
            <div className="flex-col space-y-2">
              {options.map((item, key) => (
                <div
                  className="flex justify-center hover:bg-lightGray rounded-md cursor-pointer"
                  key={key}
                >
                  <span
                    onClick={() => {
                      handleChange(item);
                      setIsOpen(!isOpen);
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
