import { DropDownNonFillIcon } from "@/assets/svgs/components/drop-down-icon-non-fill";
import { OptionsFieldProps } from "@/types/global";
import React from "react";
import { combineClasses } from "@/utils/utility";
import { useOutsideClick } from "@/hooks/useOutSideClick";

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
  const defaultClasses = `border-b-[${border}px] border-slate-gray border-opacity-50 relative flex items-center`;
  const containerClasses = combineClasses(defaultClasses, containerClassName);

  // const closeDropDown = () => {
  //   setIsOpen(false);
  // };

  // const ref = useOutsideClick<HTMLDivElement>(closeDropDown);

  return (
    <>
      <div  className={containerClasses}>
        <div
          className="flex justify-between items-center cursor-pointer px-[10px] py-[6px] w-full"
          onClick={setIsOpen}
        >
          <span className="text-[#393939] text-sm font-normal">{label}</span>
          <DropDownNonFillIcon
            label={label}
            isOpen={isOpen}
            className={dropDownIconClassName + "flex my-auto"}
          />
        </div>

        {isOpen && (
          <div className="bg-white flex-col absolute top-[36px] border-[1px] border-lightGray rounded-lg p-2 w-full">
            <div className="flex-col space-y-2">
              {options.map((item, key) => (
                <div
                  className="flex justify-center hover:bg-lightGray rounded-md cursor-pointer"
                  key={key}
                >
                  <span
                    onClick={() => {
                      handleChange(item);
                      setIsOpen;
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
