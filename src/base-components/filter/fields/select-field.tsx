import { DropDownNonFillIcon } from "@/assets/svgs/components/drop-down-icon-non-fill";
import { OptionsFieldProps } from "@/types/global";
import React from "react";

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
}: OptionsFieldProps) {
  return (
    <>
      <div
        className={`border-b-[${border}px] border-slate-gray border-opacity-50  mx-3 relative flex my-auto`}
      >
        <div
          className="flex  justify-between cursor-pointer"
          onClick={() => {
            return !isOpen ? setIsOpen(label) : setIsOpen("");
          }}
        >
          <span className="text-dark   me-2">{label}</span>
          <DropDownNonFillIcon
            label={label}
            isOpen={isOpen}
            className={dropDownIconClassName + " flex my-auto"}
          />
        </div>

        {isOpen == label && (
          <div className="bg-white flex-col absolute top-6 w-32  border-[1px] border-lightGray rounded-lg p-2">
            <div className="flex-col space-y-2">
              {options.map((item, key) => (
                <div
                  className="flex justify-center hover:bg-lightGray rounded-md cursor-pointer"
                  key={key}
                >
                  <span
                    onClick={() => {
                      handleChange(item);
                      setIsOpen(label);
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
