import { DropDownNonFillIcon } from "@/assets/svgs/components/drop-down-icon-non-fill";
import { OptionsFieldProps } from "@/types/global";
import React, { useState } from "react";
import { combineClasses } from "@/utils/utility";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/utils/hooks";
import searchIcon from "@/assets/svgs/search-icon.png";
import Image from "next/image";

export default function SelectField({
  title,
  label,
  options,
  border,
  handleChange,
  value,
  dropDownIconClassName,
  containerClassName,
  isSearch,
}: OptionsFieldProps) {
  const defaultClasses = ` flex items-center`;
  const containerClasses = combineClasses(defaultClasses, containerClassName);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const hanldeClose = () => {
    setIsOpen(false);
  };

  const ref = useOutsideClick<HTMLDivElement>(hanldeClose);
  return (
    <div
      className="relative flex items-center justify-center min-w-[120px] w-fit"
      ref={ref}
    >
      <div
        className="flex justify-between items-center cursor-pointer px-[10px] py-2 bg-white rounded-lg min-w-[105px] w-fit"
        onClick={handleToggle}
      >
        <span className="text-dark text-sm font-normal">{label}</span>
        <DropDownNonFillIcon
          label={label}
          isOpen={isOpen}
          className={dropDownIconClassName + "flex my-auto ml-1"}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-white flex-col absolute top-[36px] border-[1px] border-lightGray rounded-lg w-full right-0 p-2 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {isSearch && (
              <div className="flex items-center border border-lightGray rounded-md w-full bg-[#f6f6f7]">
                <Image
                  src={searchIcon}
                  alt={"Search Icon"}
                  className="ml-1 w-4 h-4 absolute"
                  width={24}
                  height={8}
                />
                <input
                  placeholder="Search..."
                  className="w-full ps-6 focus:outline-primary focus:outline rounded-md p-1 placeholder:text-sm bg-[#f6f6f7] "
                />
              </div>
            )}
            <div
              className="mt-2 h-full max-h-[150px] min-h-fit overflow-x-hidden overflow-y-auto"
              id="dropdownSerchBar"
            >
              <div className="flex-col space-y-2">
                {options.map(({ label, value }, idx) => (
                  <div
                    className="flex justify-start px-2 py-1 hover:bg-[#eaebec] rounded-sm cursor-pointer mr-1 hoverTransetion"
                    key={idx}
                    onClick={() => {
                      handleChange(value);
                      setIsOpen(false);
                    }}
                  >
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
