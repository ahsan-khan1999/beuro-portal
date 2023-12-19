import { DropDownNonFillIcon } from "@/assets/svgs/components/drop-down-icon-non-fill";
import { OptionsFieldProps } from "@/types/global";
import React, { useState } from "react";
import { combineClasses } from "@/utils/utility";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/utils/hooks";

export default function SelectField({
  title,
  label,
  options,
  border,
  handleChange,
  value,
  dropDownIconClassName,
  containerClassName,
}: OptionsFieldProps) {
  const defaultClasses = `border-b-[${border}px] border-slate-gray border-opacity-50 relative flex items-center`;
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
    <div className={containerClasses} ref={ref}>
      <div
        className="flex justify-between items-center cursor-pointer px-[10px] py-[6px] w-full"
        onClick={handleToggle}>
        <span className="text-[#393939] text-sm font-normal">{label}</span>
        <DropDownNonFillIcon
          label={label}
          isOpen={isOpen}
          className={dropDownIconClassName + "flex my-auto"}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-white flex-col absolute top-[36px] border-[1px] border-lightGray rounded-lg p-2 w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
            <div className="flex-col space-y-2">
              {options.map((item, key) => (
                <div
                  className="flex justify-center py-1 hover:bg-lightGray rounded-md cursor-pointer"
                  key={key}>
                  <span
                 
                    onClick={() => {
                      handleChange(item);
                      setIsOpen;
                    }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
