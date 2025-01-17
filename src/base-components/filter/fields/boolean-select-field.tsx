import { DropDownNonFillIcon } from "@/assets/svgs/components/drop-down-icon-non-fill";
import { BooleanOptionsFieldProps } from "@/types/global";
import React, { useEffect, useState } from "react";
import { combineClasses } from "@/utils/utility";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/utils/hooks";
import { useTranslation } from "next-i18next";

export default function BooleanSelectField({
  label,
  value,
  options,
  handleChange,
  dropDownIconClassName,
  containerClassName,
  labelClassName,
  dropdownClassName,
}: BooleanOptionsFieldProps) {
  const containerClasses = combineClasses(
    "relative flex items-center justify-center min-w-[120px] w-fit z-10",
    containerClassName
  );

  const dropdownClasses = combineClasses(
    "bg-white flex-col absolute top-[40px] border-[1px] border-lightGray rounded-lg w-full right-0 p-2 shadow-lg",
    dropdownClassName
  );

  const labelDefualtClasses = combineClasses(
    "text-dark text-sm font-normal w-fit",
    labelClassName
  );

  const [isOpen, setIsOpen] = useState(false);
  const { t: translate } = useTranslation();
  const [selectedLabel, setSelectedLabel] = useState<string>(label || "");

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const hanldeClose = () => {
    setIsOpen(false);
  };

  const ref = useOutsideClick<HTMLDivElement>(hanldeClose);

  const handleItemSelected = (
    label: string,
    selectedValue: boolean | undefined,
    selectedIndex: number
  ) => {
    setSelectedLabel(label);
    handleChange(selectedValue);
  };

  useEffect(() => {
    const newLabel = options.find((item, index) => item?.value === value);
    setSelectedLabel(newLabel?.label || "");
  }, [value]);

  return (
    <div className={containerClasses} ref={ref}>
      <div
        className="flex justify-between items-center cursor-pointer px-[10px] py-2 bg-white rounded-lg border border-[#ccc] min-w-[105px] w-fit"
        onClick={handleToggle}
      >
        <span className={labelDefualtClasses}>{translate(selectedLabel)}</span>
        <DropDownNonFillIcon
          label={label}
          isOpen={isOpen}
          className={dropDownIconClassName + "flex my-auto ml-1"}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={dropdownClasses}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div
              style={{ maxHeight: "150px" }}
              className="mt-2 min-h-fit overflow-x-hidden overflow-y-auto"
              id="dropdownSerchBar"
            >
              <div className="flex-col space-y-2">
                {options?.map(({ label, value }, idx) => {
                  const isSelected = selectedLabel === label;
                  return (
                    <div
                      className={`flex justify-start px-2 py-1 cursor-pointer mr-1 hoverTransetion rounded-md ${
                        isSelected
                          ? "bg-primary text-white hover:bg-buttonHover"
                          : "bg-white hover:bg-[#eaebec]"
                      }`}
                      key={idx}
                      onClick={() => {
                        handleItemSelected(
                          label,
                          value as boolean | undefined,
                          idx
                        );
                        setIsOpen(false);
                      }}
                    >
                      <span>{translate(label)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
